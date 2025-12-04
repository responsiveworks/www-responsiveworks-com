import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Environment variables required:
// SHOPIFY_API_KEY - Your app's API key from Partner Dashboard
// SHOPIFY_API_SECRET - Your app's API secret from Partner Dashboard
// SHOPIFY_APP_URL - Your app's base URL (e.g., "https://yourapp.com")

interface ShopifyAccessTokenResponse {
  access_token: string;
  scope: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const shop = searchParams.get("shop");
  const state = searchParams.get("state");
  const hmac = searchParams.get("hmac");

  // Get stored values from cookies
  const storedState = request.cookies.get("shopify_oauth_state")?.value;
  const storedShop = request.cookies.get("shopify_oauth_shop")?.value;

  // Validate required parameters
  if (!code || !shop || !state) {
    return NextResponse.redirect(
      new URL("/shopify/install?error=missing_params", request.url)
    );
  }

  // Validate state parameter (CSRF protection)
  if (state !== storedState) {
    return NextResponse.redirect(
      new URL("/shopify/install?error=invalid_state", request.url)
    );
  }

  // Validate shop matches
  if (shop !== storedShop) {
    return NextResponse.redirect(
      new URL("/shopify/install?error=shop_mismatch", request.url)
    );
  }

  // Validate shop domain format
  const shopifyDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/;
  if (!shopifyDomainRegex.test(shop)) {
    return NextResponse.redirect(
      new URL("/shopify/install?error=invalid_shop", request.url)
    );
  }

  // Verify HMAC signature
  const apiSecret = process.env.SHOPIFY_API_SECRET;
  if (!apiSecret) {
    console.error("SHOPIFY_API_SECRET is not configured");
    return NextResponse.redirect(
      new URL("/shopify/install?error=config_error", request.url)
    );
  }

  if (hmac) {
    // Create a copy of searchParams without hmac for verification
    const params = new URLSearchParams(searchParams);
    params.delete("hmac");
    params.sort();

    const message = params.toString();
    const generatedHmac = crypto
      .createHmac("sha256", apiSecret)
      .update(message)
      .digest("hex");

    if (hmac !== generatedHmac) {
      return NextResponse.redirect(
        new URL("/shopify/install?error=invalid_hmac", request.url)
      );
    }
  }

  // Exchange authorization code for access token
  const apiKey = process.env.SHOPIFY_API_KEY;
  if (!apiKey) {
    console.error("SHOPIFY_API_KEY is not configured");
    return NextResponse.redirect(
      new URL("/shopify/install?error=config_error", request.url)
    );
  }

  try {
    const tokenResponse = await fetch(
      `https://${shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: apiKey,
          client_secret: apiSecret,
          code: code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      return NextResponse.redirect(
        new URL("/shopify/install?error=token_exchange_failed", request.url)
      );
    }

    const tokenData: ShopifyAccessTokenResponse = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const scope = tokenData.scope;

    // TODO: Store the access token securely in your database
    // This is where you would save the shop domain and access token
    // for later use when making API calls to this store.
    //
    // Example:
    // await db.shops.upsert({
    //   where: { shop },
    //   update: { accessToken, scope },
    //   create: { shop, accessToken, scope }
    // });

    console.log(`Successfully installed app for shop: ${shop}`);
    console.log(`Granted scopes: ${scope}`);

    // Clear OAuth cookies
    const response = NextResponse.redirect(
      new URL(`/shopify/install/success?shop=${encodeURIComponent(shop)}`, request.url)
    );
    response.cookies.delete("shopify_oauth_state");
    response.cookies.delete("shopify_oauth_shop");

    return response;
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.redirect(
      new URL("/shopify/install?error=server_error", request.url)
    );
  }
}
