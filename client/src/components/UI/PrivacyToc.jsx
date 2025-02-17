import React from "react";
import { Link } from "react-router-dom";

const PrivacyTermsAndConditions = () => {
  return (
    <div className="fixed bottom-1 w-full flex items-center leading-3 justify-center px-4 sm:px-6 md:px-8 lg:px-10 text-[0.5rem] sm:text-[0.7rem] md:text-[0.6rem] font-[Gilroy-Medium] text-[#4e4e4e] cursor-default">
      <div className="w-full max-w-[70%] sm:max-w-[70%] md:max-w-[45%] lg:max-w-[38%] text-center leading-2.5 sm:leading-3">
        <span>
          By continuing to use this website, you acknowledge that you have read,
          understood, and agreed to our{" "}
          <Link
            to="/privacy-policy"
            className="cursor-pointer text-[#179f74] hover:underline ease-in-out"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms-conditions"
            className="cursor-pointer text-[#179f74] hover:underline ease-in-out"
          >
            Terms & Conditions
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default PrivacyTermsAndConditions;
