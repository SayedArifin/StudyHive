import Head from 'next/head';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "../../components/Toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StudyHive",
  description: "StudyHive is a dynamic and user-friendly Udemy clone project that aims to revolutionize online learning...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <script
          type="text/javascript"
          src={"https://chat4site.ai/embedWidget.js?t=" + Math.floor(Date.now())}
          charSet="UTF-8"
          async
        ></script>
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
