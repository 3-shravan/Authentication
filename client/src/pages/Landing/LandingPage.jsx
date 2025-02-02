import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarqueeItems } from "../../utils/MarqueeArray";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [hideLine, setHideLine] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.header}>
        <motion.div
          className={styles.name}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 3 }}
        >
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4 }}
          >
            C
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.1 }}
          >
            O
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.2 }}
          >
            N
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.3 }}
          >
            N
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.4 }}
          >
            E
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.5 }}
          >
            C
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.6 }}
          >
            T
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.7 }}
          >
            I
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.8 }}
          >
            F
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 4.9 }}
          >
            Y
          </motion.span>
        </motion.div>
        <div className={styles.buttons}>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
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
            transition={{ delay: 1, duration: 2, ease: "circIn" }}
            onAnimationComplete={() => setHideLine(true)}
          ></motion.div>
        )}

        <motion.div
          className={styles.and}
          initial={{ x: -100 }}
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
          initial={{ y: -259 }}
          animate={{ y: 0 }}
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
              delay: 2.5,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            Discovery.
          </motion.div>
        </motion.div>

        <motion.button
          className={styles.authButton}
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.8, duration: 1.5, ease: "anticipate" }}
        >
          Get Started
        </motion.button>
      </div>
      <motion.div
        className={styles.marqueeContainer}
        initial={{ y: -490 }}
        animate={{ y: 0 }}
        transition={{
          delay: 5,
          duration: 3,
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
              duration: 40,
              delay: 5.2,
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
