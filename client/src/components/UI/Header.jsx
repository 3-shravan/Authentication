import React from "react";
import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { TbMenu } from "react-icons/tb";
import "../../assets/styles/header.css";
import { replace, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">

      {/***********  
           * @LOGO
        *  *********** / */}


      <motion.div
        className="logo"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, ease: "linear" }}
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5 }}
          className="the"
        >
          its
        </motion.span>
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="letters"
        >
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.5 }}
            className="letter"
          >
            L
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.6 }}
            className="letter"
          >
            O
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.7 }}
            className="letter"
          >
            G
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.8 }}
            className="letter"
          >
            O
          </motion.span>
        </motion.span>
      </motion.div>




      {/***********  
           * @navBar
        *  *********** / */}



      <nav className="nav">

        {/***********  
           * @dropdown 
        *  *********** / */}

        <div className="dropdown">
          {/* DropDown | DropDown */}
        </div>


        {/***********  
             * @MenuBar
          *  *********** / */}


        <div className="menuBar">
          {/* {window.location.pathname === "/" && ( */}
            <span onClick={() => navigate("/login", { replace: true })} className="menuButton">
              Login
            </span>
          {/* )} */}
          <span className="menuButton" >
            Menu
          </span>
          <span className="menuButton selected"
            onClick={() => {
              navigate("/", { replace: true })
            }
            }>
            Home
          </span>
        </div>

      </nav>
    </div>
  );
};

export default Header;
