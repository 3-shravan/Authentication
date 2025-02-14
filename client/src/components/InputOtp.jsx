import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/inputOtp.css";

const length = 5;
const InputOtp = ({ handleOtpSubmit, loading }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [handleOtpSubmit]);

  const handleOtp = (code) => {
    handleOtpSubmit(code);
    setOtp(new Array(length).fill(""));
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const code = newOtp.join("");

    if (code.length === length) {
      handleOtp(code);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1].focus()
    ) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return loading ? (
    <span className="loader">Verifying otp...</span>
  ) : (<>
    <div className="otpContainer">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            className="inputOtp"
            value={value}
            ref={(val) => (inputRefs.current[index] = val)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
    <button type="button" className="resendOtp">Resend OTP</button>
    </>
  );
};

export default InputOtp;
