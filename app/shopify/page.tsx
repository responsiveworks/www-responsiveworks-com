import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Integration | ResponsiveWorks",
  description:
    "Synchronize your Shopify store with NetSuite using the ResponsiveWorks Shopify App. Automate inventory, orders, and customer data seamlessly.",
};

export default function ShopifyPage() {
  const features = [
    {
      title: "Order Synchronization",
      description:
        "Automatically sync Shopify orders to NetSuite in real-time. Sales orders, fulfillments, and refunds are seamlessly transferred to keep your systems in perfect alignment.",
    },
    {
      title: "Inventory Management",
      description:
        "Keep inventory levels accurate across both platforms. Stock updates in NetSuite automatically reflect in your Shopify store, preventing overselling and stockouts.",
    },
    {
      title: "Customer Data Sync",
      description:
        "Customer information flows bidirectionally between Shopify and NetSuite. New customers, updated addresses, and contact details stay synchronized automatically.",
    },
    {
      title: "Product Catalog Integration",
      description:
        "Manage your product catalog in NetSuite and push updates to Shopify. Pricing, descriptions, and product variants sync seamlessly across platforms.",
    },
  ];

  const benefits = [
    "Eliminate manual data entry and reduce errors",
    "Real-time synchronization keeps systems aligned",
    "Scalable solution that grows with your business",
    "Reduce operational costs and save time",
    "Improve customer satisfaction with accurate inventory",
    "Comprehensive audit trail and logging",
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <Link
            href="/"
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
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Shopify
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                NetSuite
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Integration
              </span>
            </div>
            <h1 className="heading-1 mb-6">
              ResponsiveWorks Shopify App for NetSuite
            </h1>
            <p className="body-large max-w-3xl">
              Streamline your e-commerce operations with our powerful integration
              solution. The ResponsiveWorks Shopify App connects your Shopify
              store directly to NetSuite, enabling seamless data synchronization
              and automated workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <h3 className="heading-3 mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <h2 className="heading-2 mb-12 text-center">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Connect Your Accounts</h3>
                  <p className="text-neutral-600">
                    Install the ResponsiveWorks app from the Shopify App Store and
                    connect it to your NetSuite account using secure OAuth
                    authentication.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Configure Your Mappings</h3>
                  <p className="text-neutral-600">
                    Set up field mappings between Shopify and NetSuite to ensure
                    your data syncs correctly. Map products, customers, orders, and
                    inventory locations.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Enable Synchronization</h3>
                  <p className="text-neutral-600">
                    Activate real-time sync or schedule batch synchronizations based
                    on your business needs. Monitor sync status through the
                    intuitive dashboard.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Monitor and Optimize</h3>
                  <p className="text-neutral-600">
                    Track synchronization performance, review logs, and fine-tune
                    your configuration to optimize data flow between platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 mb-8 text-center">
              Why Choose ResponsiveWorks?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5"
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
                  <span className="text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-6">
            Ready to Streamline Your Operations?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn how the ResponsiveWorks Shopify
            App can transform your e-commerce integration.
          </p>
          <Link href="/#contact" className="btn-secondary">
            Contact Us Today
          </Link>
        </div>
      </section>
    </main>
  );
}
