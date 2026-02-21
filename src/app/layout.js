import { Toaster } from 'react-hot-toast';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AuthProvider from "@/components/AuthProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jewels for Joy',
  description: 'Handcrafted luxury jewellery for your most precious moments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.className} overflow-x-hidden`}>
      <body className="antialiased flex flex-col min-h-screen overflow-x-hidden">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                marginTop: '20px',
                marginRight: '20px',
                borderRadius: '0px',
                border: '1px solid #d6d3d1',
                fontFamily: 'var(--font-playfair)',
                // ADD THESE TWO LINES:
                maxWidth: 'calc(100vw - 40px)',
                wordBreak: 'break-word',
              },
            }}
          />
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </AuthProvider>
      </body>
    </html>
  );
}