"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const errorMessages: Record<string, string> = {
  missing_params: "Authorization failed. Missing required parameters from Shopify.",
  invalid_state: "Security validation failed. Please try installing again.",
  shop_mismatch: "Shop verification failed. Please try installing again.",
  invalid_shop: "Invalid shop domain. Please check and try again.",
  invalid_hmac: "Security signature verification failed. Please try installing again.",
  config_error: "App configuration error. Please contact support.",
  token_exchange_failed: "Failed to complete authorization with Shopify. Please try again.",
  server_error: "An unexpected error occurred. Please try again later.",
  access_denied: "Access was denied. You may have cancelled the installation.",
};

function InstallForm() {
  const searchParams = useSearchParams();
  const [shopDomain, setShopDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const errorCode = searchParams.get("error");
    if (errorCode && errorMessages[errorCode]) {
      setError(errorMessages[errorCode]);
    } else if (errorCode) {
      setError("An error occurred during installation. Please try again.");
    }
  }, [searchParams]);

  const handleInstall = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Clean the shop domain input
    let shop = shopDomain.trim().toLowerCase();

    // Remove https:// or http:// if present
    shop = shop.replace(/^https?:\/\//, "");

    // Remove trailing slashes
    shop = shop.replace(/\/+$/, "");

    // Remove /admin or other paths
    shop = shop.split("/")[0];

    // Add .myshopify.com if not present
    if (!shop.includes(".myshopify.com")) {
      // Remove any other domain suffix if present
      shop = shop.split(".")[0];
      shop = `${shop}.myshopify.com`;
    }

    // Validate shop domain format
    const shopifyDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/;
    if (!shopifyDomainRegex.test(shop)) {
      setError("Please enter a valid Shopify store domain (e.g., your-store or your-store.myshopify.com)");
      setIsLoading(false);
      return;
    }

    // Redirect to the OAuth initialization endpoint
    window.location.href = `/api/shopify/auth?shop=${encodeURIComponent(shop)}`;
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <Link
            href="/shopify"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Shopify Integration
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Shopify
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Installation
              </span>
            </div>
            <h1 className="heading-1 mb-6">Install ResponsiveWorks App</h1>
            <p className="body-large max-w-3xl">
              Connect your Shopify store to get started with the ResponsiveWorks
              integration. Enter your store domain below to begin the
              installation process.
            </p>
          </div>
        </div>
      </section>

      {/* Install Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-sm">
              <h2 className="heading-3 mb-6 text-center">
                Enter Your Shopify Store
              </h2>

              <form onSubmit={handleInstall} className="space-y-6">
                <div>
                  <label
                    htmlFor="shop"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Store Domain
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="shop"
                      name="shop"
                      value={shopDomain}
                      onChange={(e) => setShopDomain(e.target.value)}
                      placeholder="your-store"
                      className="w-full px-4 py-3 pr-36 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                      .myshopify.com
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Enter your store name or full myshopify.com domain
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg">
                    <p className="text-danger-700 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !shopDomain.trim()}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Install App
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="mt-8 grid gap-4">
              <div className="flex gap-4 p-4 bg-info-50 rounded-lg border border-info-200">
                <svg
                  className="w-6 h-6 text-info-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium text-info-800 mb-1">
                    Secure Installation
                  </h3>
                  <p className="text-sm text-info-700">
                    You will be redirected to Shopify to authorize the app. We
                    use OAuth 2.0 for secure authentication.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <svg
                  className="w-6 h-6 text-neutral-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium text-neutral-800 mb-1">
                    Required Permissions
                  </h3>
                  <p className="text-sm text-neutral-600">
                    The app will request access to orders, products, customers,
                    and inventory data to enable synchronization with NetSuite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-2 mb-4">Need Help?</h2>
            <p className="text-neutral-600 mb-6">
              If you encounter any issues during installation or have questions
              about the integration, our team is here to help.
            </p>
            <Link href="/#contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ShopifyInstallPage() {
  return (
    <Suspense
      fallback={
        <main className="pt-20">
          <section className="section-padding min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600">Loading...</p>
            </div>
          </section>
        </main>
      }
    >
      <InstallForm />
    </Suspense>
  );
}
