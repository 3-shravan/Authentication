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
      <motion.div
        className="sphere"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 5, ease: "linear" }}
      >
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 4.5 }}
          className="letters"
        >
          The
        </motion.span>
        <motion.span
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 4 }}
          className="letters"
        >
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6 }}
            className="letters"
          >
            S
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6.1 }}
            className="letters"
          >
            p
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6.2 }}
            className="letters"
          >
            h
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6.3 }}
            className="letters"
          >
            e
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6.4 }}
            className="letters"
          >
            r
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 6.5 }}
            className="letters"
          >
            e
          </motion.span>
          <motion.span
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 5.5 }}
            className="dot letters"
          >
            .
          </motion.span>
        </motion.span>
        {/* <motion.span
          initial={{ y: -180 }}
          animate={{ y: 0 }}
          transition={{ delay: 5.5 }}
          className="dot letters"
        >
          .
        </motion.span> */}
      </motion.div>

      <div className="nav">
        {window.location.pathname === "/" && (
          <span onClick={() => navigate("/login", { replace: true })} className="loginButton">
            Login
            <span className="loginIcon">
              <CiHeart />
            </span>
          </span>
        )}
        <span className="menu">
          <TbMenu />
        </span>
      </div>
    </div>
  );
};

export default Header;
