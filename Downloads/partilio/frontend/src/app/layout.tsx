import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '../providers/AppProvider'; // ← MUDANÇA
import '../styles/globals.css'; // ← MUDANÇA

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Partilio - Gestão de Despesas Familiares',
  description: 'Sistema completo para gestão de despesas compartilhadas entre familiares',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}