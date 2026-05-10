const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-[#0f172a] border-b border-cyan-500/20 px-2 py-2 flex items-center justify-between rounded-2xl mb-8">
      <h1 className="text-2xl font-bold text-cyan-400">
        HR Panel
      </h1>

      <button
        onClick={logout}
        className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl text-black font-bold"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;