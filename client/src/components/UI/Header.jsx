import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../assets/styles/header.css";
import { useNavigate, useLocation, replace } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useMenu } from "../../context/MenuContext";


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menu, toggleMenu, isMenuDisabled } = useMenu()

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
          Auth
        </motion.span>
        <motion.span className="letters">
          {["A", "P", "P", "."].map((letter, index) => (
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

        {!isMenuDisabled &&
          <div className="menuBar">

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="menuButton menuButtonIcon"
              onClick={() => {
                navigate('/', { replace: true })
              }
              }

            >
              <MdKeyboardDoubleArrowLeft />

            </motion.span>


            {location.pathname === "/" && !menu && (
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
              onClick={toggleMenu}
            >
              {menu ? "Close" : "Menu"}
            </motion.span>

          </div>
        }
      </nav>
    </div>
  );
};

export default Header;