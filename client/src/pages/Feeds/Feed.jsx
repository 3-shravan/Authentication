import { useAuth } from "../../context/AuthContext";
import styles from "./Feed.module.css";
const Feed = () => {
  const { auth } = useAuth();
  return (
    <div className=" h-screen  font-extrabold text-zinc-700 flex justify-center items-center text-4xl font-[Futura-Bold]">
      Welcome.
      <span className="font-extrabold text-red-700 text-4xl font-[Futura-Bold]">
        {" "}
        {auth?.profile?.name}
      </span>
    </div>
  );
};

export default Feed;
