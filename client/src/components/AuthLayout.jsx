export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        {children}
        {footer && <div className="mt-4 text-sm text-center">{footer}</div>}
      </div>
    </div>
  );
}
