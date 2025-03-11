import React from "react";
import { motion } from "framer-motion";

const textVariants = {
   initial: { opacity: 1 },
   hover: {
      transition: {
         staggerChildren: 0.05,
      },
   },
};

const letterVariants = {
   initial: { y: 0 },
   hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
};

const AnimatedText = ({ text }) => {
   return (
      <motion.span variants={textVariants} initial="initial" whileHover="hover" className="hover:text-emerald-900 cursor-pointer">
         {text.split("").map((letter, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block ">
               {letter}
            </motion.span>
         ))}
      </motion.span>
   );
};

const Menu = () => {
   return (
      <motion.div
         initial={{ y: -800, opacity: 1 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: -800, opacity: 0 }}
         transition={{
            delay: 0.1,
            duration: 1,
            ease: "easeInOut",
         }}
         className="text-3xl pt-28 flex flex-col bg-yellow-200 h-screen items-end pr-[3%] gap-5  font-[Gilroy Medium] text-black cursor-default overflow-hidden z-100"
      >
         <AnimatedText text="Contact Us." />
         <AnimatedText text="About Us." />
         <AnimatedText text="Privacy Policy." />
         <AnimatedText text="Login." />
         <AnimatedText text="Sign Up." />

         <span className="absolute bottom-1 text-sm text-black/60 font-[Gilroy-Medium]">
            Copyright @ 2025
         </span>
      </motion.div>
   );
};

export default Menu;
