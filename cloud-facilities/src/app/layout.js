import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Provider from "./components/Provider";
import "./globals.css";

export const metadata = {
  title: "Cloud Facilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
