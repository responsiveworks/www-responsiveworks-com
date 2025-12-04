"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const shop = searchParams.get("shop");

  return (
    <main className="pt-20">
      {/* Success Section */}
      <section className="section-padding bg-gradient-to-br from-success-50 to-primary-50 min-h-[60vh] flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="heading-1 mb-4">Installation Successful!</h1>
            <p className="body-large mb-8">
              The ResponsiveWorks app has been successfully installed on{" "}
              {shop ? (
                <span className="font-semibold text-primary-700">{shop}</span>
              ) : (
                "your store"
              )}
              .
            </p>

            {/* Next Steps Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-8 text-left mb-8">
              <h2 className="heading-3 mb-6">Next Steps</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">
                      Configure Your Settings
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Access the app from your Shopify admin to configure
                      synchronization settings and connect your NetSuite
                      account.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">
                      Set Up Field Mappings
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Map your Shopify fields to corresponding NetSuite fields
                      to ensure accurate data synchronization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">
                      Enable Sync
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Once configured, enable real-time or scheduled
                      synchronization to start syncing your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {shop && (
                <a
                  href={`https://${shop}/admin/apps`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Open Shopify Admin
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              <Link href="/shopify" className="btn-secondary">
                Learn More About Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-2 mb-4">Need Assistance?</h2>
            <p className="text-neutral-600 mb-6">
              Our team is ready to help you get the most out of your Shopify and
              NetSuite integration. Reach out if you have any questions.
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

export default function ShopifyInstallSuccessPage() {
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
      <SuccessContent />
    </Suspense>
  );
}
