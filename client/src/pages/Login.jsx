export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="w-full p-2 border rounded mb-3" placeholder="Email" />
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          type="password"
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
}
