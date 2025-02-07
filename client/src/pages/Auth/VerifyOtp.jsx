import react from "react";
import { useState } from "react";
import axios from "axios";
const VerifyOtp = () => {
  const [formData, setFormData] = useState({
    email: "iamanonymousperson1111@gmail.com",
    phone: "",
    otp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/verifyotp",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <div className=" w-3/4 h-3/4 flex border-2 border-gray-500 rounded items-center flex-col">
        <h1 className="text-5xl text-red-600 w-full  text-center ">
          Verify OTP
        </h1>

        <form
          action=""
          className=" flex-col  m-2 p-8 flex "
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h2 className="font-semibold text-xl  ">OTP</h2>
          <input
            type="number"
            placeholder="Enter Your OTP"
            name="otp"
            value={formData.otp}
            onChange={(e) => {
              handleChange(e);
            }}
            className="border rounded p-2 bg-zinc-800 border-zinc-500  "
          />

          <button className="rounded mt-3 border bg-emerald-800 h-10 border-zinc-500 ">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
