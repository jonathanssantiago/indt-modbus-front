import { Inter } from 'next/font/google';
import { config } from '../config';
import ClientWrapper from '@/components/ClientWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: config.app.name,
  description: 'Monitor de Dispositivos IoT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
