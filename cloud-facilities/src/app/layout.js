import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Cloud Facilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
