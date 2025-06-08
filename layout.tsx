export const metadata = {
  title: 'RAG Chatbot',
  description: 'Chatbot with RAG and LLaMA on Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
