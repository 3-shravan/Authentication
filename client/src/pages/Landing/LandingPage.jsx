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
      <div className={styles.page}>
        <Header />

        <div className={styles.hero}>


          {/***********  
             * @line1
          *  *********** / */}



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
            initial={{ x: -210 }}
            animate={{ x: 0 }}
            transition={{
              delay: 2,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            &
          </motion.div>

          {/***********  
                 * @bg
              *  *********** / */}



          <motion.div
            className={styles.bg}
            initial={{ y: -270, backgroundColor: "#DC143C" }}
            animate={{ y: 0, backgroundColor: "#131313" }}
            transition={{
              delay: 1,
              duration: 0.8,

              ease: "easeOut",
            }}
          >

            {/***********  
             * @Discovery
              *  *********** / */}



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

          {/***********  
         * @SignUp_button
          *  *********** / */}



          <motion.button
            className={styles.getStartedButton}
            onClick={() => {

              navigate("/signup", { replace: true });
            }}
            initial={{ x: -300 }}
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


        {/*********** 
         * @MARQUEEE_EFFECT 
         *  *********** / */}

        <motion.div
          className={styles.marqueeContainer}
          initial={{ y: -470 }}
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
      </div>
    </>
  );
};

export default LandingPage;
