import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../assets/styles/header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="header">
      {/* Logo */}
      <motion.div
        className="logo"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          className="the"
        >
          its
        </motion.span>
        <motion.span className="letters">
          {["L", "O", "G", "O"].map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{
                delay: 1.5 + (index * 0.1),
                duration: 0.3
              }}
              className="letter"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.div>

      {/* Navigation */}
      <nav className="nav">
        {/* Dropdown Section */}
        <div className="dropdown">
          {/* Dropdown content goes here */}
        </div>

        {/* Menu Bar */}
        <div className="menuBar">
          {currentPath === "/" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="menuButton"
              onClick={() => navigate("/login", { replace: true })}
            >
              Login
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="menuButton"
          >
            Menu
          </motion.span>
        </div>
      </nav>
    </div>
  );
};

export default Header;