import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useLogout from "../../hooks/useLogout";

const Feed = () => {
  const { toggleTheme } = useTheme()
  const { auth } = useAuth();
  const logout = useLogout()
  return (
    <div className=" h-screen font-extrabold bg-[var(--bg)]  text-zinc-700 flex flex-col justify-center items-center text-m font-[Futura-Bold]">
      <h1 className="text-2xl">Welcome</h1>
      <h1 className="font-extrabold text-4xl  border-l-4 text-emerald-900  px-1 ml-2.5 border-red-300  font-[Gilroy-Medium]">
        {auth?.profile?.name}
      </h1>

      <button
        className="mt-10 border-l-1 rounded-md px-4 py-2 text-red-300  hover:bg-red-300 hover:text-red-800   "
        onClick={() => logout()}
      >
        Logout
      </button>

      <button
        className="mt-5 border-l-1 rounded-md px-5 py-2 text-purple-300  hover:bg-purple-300 hover:text-purple-800   "

        onClick={() => toggleTheme()}
      >Mode</button>
    </div>
  );
};

export default Feed;
