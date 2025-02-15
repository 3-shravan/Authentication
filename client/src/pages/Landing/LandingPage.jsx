import { motion } from "framer-motion";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { MarqueeItems } from "../../utils/MarqueeArray";
import styles from "./LandingPage.module.css";
import { BsChatLeftHeartFill } from "react-icons/bs";
import Header from "../../components/UI/Header";

const LandingPage = () => {
  const [hideLine, setHideLine] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Header />

      <div className={styles.authContainer}>
        <motion.h1
          className={styles.line1}
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Your World of Endless Sharing
        </motion.h1>

        {!hideLine && (
          <motion.div
            className={styles.loading}
            initial={{ x: -100 }}
            animate={{ x: 1100 }}
            transition={{ delay: 1.4, duration: 2, ease: "circIn" }}
            onAnimationComplete={() => setHideLine(true)}
          ></motion.div>
        )}

        <motion.div
          className={styles.and}
          initial={{ x: -110 }}
          animate={{ x: 0 }}
          transition={{
            delay: 2,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          &
        </motion.div>
        <motion.div
          className={styles.bg}
          initial={{ y: -254, backgroundColor: "#DC143C" }}
          animate={{ y: 0, backgroundColor: "#131313" }}
          transition={{
            delay: 1,
            duration: 0.8,

            ease: "easeOut",
          }}
        >
          <motion.div
            className={styles.line2}
            initial={{ x: -1200 }}
            animate={{ x: 0 }}
            transition={{
              delay: 3,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            Discovery.
          </motion.div>
        </motion.div>

        <motion.button
          className={styles.getStartedButton}
          onClick={() => {
            navigate("/signup");
          }}
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 2.3, duration: 1.5, ease: "anticipate" }}
        >
          Get Started{" "}
          <span className={styles.icon}>
            {" "}
            <BsChatLeftHeartFill />
          </span>
        </motion.button>
      </div>
      <motion.div
        className={styles.marqueeContainer}
        initial={{ y: -452 }}
        animate={{ y: 0 }}
        transition={{
          delay: 6.7,
          duration: 3.9,
          ease: "anticipate",
        }}
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.marqueeContent}
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 60,
              delay: 7,
              ease: "linear",
            }}
          >
            {MarqueeItems.map((text, index) => (
              <span key={index} className={styles.marqueeItem}>
                {text} •
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default LandingPage;
