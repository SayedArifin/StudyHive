import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "../../components/Toastify";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StudyHive",
  description:
    "StudyHive is a dynamic and user-friendly Udemy clone project that aims to revolutionize online learning. With StudyHive, users can explore a vast collection of courses taught by expert instructors, covering diverse subjects ranging from programming and business to art and personal development. The platform offers a seamless learning experience, allowing students to enroll in courses, track their progress, and interact with instructors and fellow learners through an integrated discussion forum. StudyHive also includes features like personalized recommendations, course ratings and reviews, and a comprehensive dashboard for both students and instructors. With its intuitive interface and robust features, StudyHive empowers individuals to expand their knowledge and skills in a convenient and engaging manner.",
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
          src="https://chat4site.ai/embedWidget.js?t=" + Math.floor(Date.now())
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

