import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QueryHubb: Streamlined Seminar Management and Engagement",
  description:
    "QueryHubb simplifies seminar management with its intuitive platform designed to enhance attendee engagement. Seamlessly create, manage, and participate in seminars with features like anonymous question submission via QR codes, real-time interaction tools, and comprehensive analytics. Whether you're organizing educational workshops, professional conferences, or interactive sessions, QueryHubb empowers organizers and participants alike with its user-friendly interface and robust functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
