import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs"; 
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";



const inter = Inter({subsets: ["latin"] });
export const metadata = {
  title: "Sensai - AI Career Coach",
  description: "Career Coach is an AI-powered web app that offers personalized career guidance, resume tips, skill development plans, and mock interview support to help users navigate their career journey with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_dGVzdC1jbGVyay1rZXktOTkuY2xlcmsuYWNjb3VudHMuZGV2JA"}
      appearance={{
        baseTheme:dark
      }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.className}`}>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/*header*/}
            <Header />
            <main className="min-h-screen">{children}</main>

            <Toaster richColors />

            {/*footer*/}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
<p>made with ❤️ by Navye Jindal</p>
              </div>
            </footer>

          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
