import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Environment variables required:
// SHOPIFY_API_KEY - Your app's API key from Partner Dashboard
// SHOPIFY_API_SECRET - Your app's API secret from Partner Dashboard
// SHOPIFY_SCOPES - Comma-separated list of scopes (e.g., "read_products,write_orders")
// SHOPIFY_APP_URL - Your app's base URL (e.g., "https://yourapp.com")

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shop = searchParams.get("shop");

  // Validate shop parameter
  if (!shop) {
    return NextResponse.json(
      { error: "Missing shop parameter" },
      { status: 400 }
    );
  }

  // Validate shop domain format
  const shopifyDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/;
  if (!shopifyDomainRegex.test(shop)) {
    return NextResponse.json(
      { error: "Invalid shop domain format" },
      { status: 400 }
    );
  }

  // Get environment variables
  const apiKey = process.env.SHOPIFY_API_KEY;
  const scopes = process.env.SHOPIFY_SCOPES || "read_products,read_orders,read_customers,read_inventory";
  const appUrl = process.env.SHOPIFY_APP_URL || process.env.NEXT_PUBLIC_APP_URL;

  if (!apiKey) {
    console.error("SHOPIFY_API_KEY is not configured");
    return NextResponse.json(
      { error: "App configuration error" },
      { status: 500 }
    );
  }

  if (!appUrl) {
    console.error("SHOPIFY_APP_URL is not configured");
    return NextResponse.json(
      { error: "App configuration error" },
      { status: 500 }
    );
  }

  // Generate a random nonce for state parameter (CSRF protection)
  const nonce = crypto.randomBytes(16).toString("hex");

  // Build the redirect URI
  const redirectUri = `${appUrl}/api/shopify/callback`;

  // Build the authorization URL
  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", apiKey);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", nonce);

  // Create response with redirect
  const response = NextResponse.redirect(authUrl.toString());

  // Store the nonce in a cookie for verification in the callback
  response.cookies.set("shopify_oauth_state", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  // Store the shop domain for the callback
  response.cookies.set("shopify_oauth_shop", shop, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return response;
}
