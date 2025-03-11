import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useLogout from "../../hooks/useLogout";
import { Loader, Loader2 } from "../../components/UI/Loader"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsArrowDownRightCircleFill } from "react-icons/bs";



const Feed = () => {
  const { theme, toggleTheme } = useTheme()
  const { auth } = useAuth();
  const { logout, loading } = useLogout()
  return loading ? <Loader2 /> :
    <div className=" h-screen font-extrabold bg-[var(--bg)] text-[var(--dark-300)] flex flex-col justify-center items-center text-m font-[Futura-Bold]">
      <h1 className="text-xl">Welcome</h1>
      <h1 className=" text-3xl  border-l-2 text-zinc-800  px-1 ml-2 border-[var(--font)]  font-[Gilroy-Medium]">
        {auth?.profile?.name}.
      </h1>

      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          className=" rounded-full  text-[2rem] bg-[var(--dark-100)] text-[var(--crimson)] hover:bg-[var(--dark-100)] hover:text-[var(--dark-300)]   "
          onClick={() => logout()}
        >
          <BsArrowDownRightCircleFill />
        </button>

        <button
          className=" rounded-full px-2 py-2 bg-[var(--font)] text-[var(--bg)]  hover:bg-[var(--font)] hover:text-[var(--dark-300)]   "

          onClick={() => toggleTheme()}
        >
          {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </div>

};

export default Feed;
