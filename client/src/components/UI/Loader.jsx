import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

import "../../assets/styles/LoadingStyle.css";

export function Loader() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const containerWidth = document.querySelector(".container").offsetWidth;
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: "100%" }],
          [scope.current, { x: containerWidth, width: "0%" }, { delay: 0.6 }]
        ],
        {
          duration: 3,
          repeat: Infinity,
          repeatDelay: 0
        }
      );
    };
    animateLoader();
  }, []);

  return (
    <div className="container">
      <motion.div ref={scope} className="loader" />
      <h1 className="text">
        <i>Wait a Sec...</i>
      </h1>
    </div>
  );
}


export const Spinner = ({ text, radius, fontSize, letterSpacing }) => {
  const characters = text.split("");

  return (
    <motion.div className="circle" style={{ width: radius * 2 }}>
      <p aria-label={text} />
      <p aria-hidden="true" className="text">
        {characters.map((ch, i) => (
          <motion.span
            key={i}
            className={`letterLoading letter-${i}`}
            style={{
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * letterSpacing}deg)`,
              fontSize
            }}
          >
            {ch}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );

}


export function Loader2() {

  return (
    <div className="container2">

      <motion.div
        className="spinner spinner-1"
        initial={{ rotate: 45 }}
        animate={{ rotate: -315 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING  LOADING"
          radius={800}
          fontSize="180px"
          letterSpacing={8}
        />
      </motion.div>
      <motion.div
        className="spinner spinner-2"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING  LOADING  LOADING  LOADING"
          radius={650}
          fontSize="180px"
          letterSpacing={10}
        />
      </motion.div>
      <motion.div
        className="spinner spinner-3"
        initial={{ rotate: -5 }}
        animate={{ rotate: -365 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Spinner
          text="LOADING LOADING LOADING"
          radius={480}
          fontSize="180px"
          letterSpacing={15}
        />
      </motion.div>
    </div>
  );

}
