import { motion } from "framer-motion";
import { replace, useNavigate } from "react-router-dom";
import { MarqueeItems } from "../../utils/MarqueeArray";
import styles from "./LandingPage.module.css";
import Header from "../../components/UI/Header";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.page}>
        <Header />

        <div className={styles.hero}>


          {/***********  
             * @line1
          *  *********** / */}

          <motion.div
            className={styles.line1}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            Lets
          </motion.div>

          {/***********  
               * @line2
            *  *********** / */}

          <motion.div
            className={styles.line2}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            get Started.
          </motion.div>


          {/***********  
         * @SignUp_button
          *  *********** / */}



          <motion.button
            className={styles.getStartedButton}
            onClick={() => {

              navigate("/signup", { replace: true });
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            Sign Up{" "}
            {<span className={styles.icon}>
              {/***********  
                 * @icon
              *  *********** / */}

            </span>}
          </motion.button>
        </div>


        {/*********** 
         * @MARQUEEE_EFFECT 
         *  *********** / */}

        <motion.div
          className={styles.marqueeContainer}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            delay: 2,
            duration: 2,
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
                delay: 3,
                ease: "anticipate",
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
