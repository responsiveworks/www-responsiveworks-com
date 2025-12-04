import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install Shopify App | ResponsiveWorks",
  description:
    "Install the ResponsiveWorks Shopify App to connect your store with NetSuite. Automate inventory, orders, and customer data synchronization.",
};

export default function ShopifyInstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
