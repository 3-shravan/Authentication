import { useAuth } from "../../context/AuthContext";
import styles from "./Feed.module.css";
const Feed = () => {
  const { auth } = useAuth();
  console.log(auth)
  return <div className={styles.home}>Welcome ^_^ {auth?.profile?.name}</div>;
};

export default Feed;
