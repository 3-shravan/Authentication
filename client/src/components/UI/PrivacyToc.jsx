import React from "react";
import { Link } from "react-router-dom";

const PrivacyTermsAndConditions = () => {
  return (
    <div className="absolute flex items-center flex-col bottom-3 leading-3 text-[0.6rem] font-[Gilroy-Medium] text-[#4e4e4e] cursor-default">
      <div className="w-[78%]">
        <span>
          By continuing to use this website, you acknowledge that you have read,
          understood, and agreed to our{" "}
          <Link
            to="/privacy-policy"
            className="cursor-pointer text-[#179f74] hover:underline ease-in-out "
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms-conditions"
            className="cursor-pointer text-[#179f74] hover:underline ease-in-out "
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
