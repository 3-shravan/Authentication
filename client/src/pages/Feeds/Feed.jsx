import { useAuth } from "../../context/AuthContext";
import styles from "./Feed.module.css";
const Feed = () => {
  const { auth } = useAuth();
  return (
    <div className=" h-screen bg-black  font-extrabold   text-zinc-700 flex justify-center items-center text-m font-[Futura-Bold]">
      Welcome
      <h1 className="font-extrabold text-m  border-l-2 text-emerald-900  px-2 ml-1 border-red-300  font-[Gilroy-Medium]">
        {auth?.profile?.name}
      </h1>
    </div>
  );
};

export default Feed;
