export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
