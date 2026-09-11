import "./globals.css";

export const metadata = {
  title: "SHOP.CO — Admin Dashboard",
  description: "Modern E-Commerce Admin Management Dashboard for SHOP.CO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F8F9FA] text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
