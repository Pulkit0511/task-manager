export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex gap-4">
        <button className="text-gray-600 hover:text-black">Dashboard</button>
        <button className="text-gray-600 hover:text-black">Logout</button>
      </div>
    </nav>
  );
}
