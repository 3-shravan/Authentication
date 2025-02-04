import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    verificationMethod: "",
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
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/register",
      formData
    );
    if (response.status === 200) {
      navigate("/verifyotp");
    }
  };

  return (
    <>
      <div className=" register w-full h-screen flex justify-center items-center bg-gray-700 ">
        <div className=" w-[77rem] h-[34.5rem] flex  rounded-4xl bg-zinc-950 items-center flex-col">
          <h1 className="text-5xl text-red-600 w-full  text-center ">
            Create New Account.
          </h1>

          <form
            action=""
            className=" flex-col w-full  m-2 p-8 flex "
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h2 className="font-semibold text-xl  ">Name</h2>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
              }}
              className=" rounded-3xl w-1/2 p-2 bg-yellow-100 text-[0.8rem]  border-0 placeholder:text-zinc-700 font-semibold    "
            />
            <h2 className="font-semibold text-xl  ">Email</h2>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
              }}
              className="rounded-3xl w-1/2 p-2 bg-yellow-100 text-[0.8rem]  border-0 placeholder:text-zinc-700 font-semibold    "
            />

            <h2 className="font-semibold text-xl">Phone</h2>
            <input
              type="number"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              className="rounded-3xl w-1/2 p-2 bg-yellow-100 text-[0.8rem]  border-0 placeholder:text-zinc-700 font-semibold    "
            />

            <h2 className="font-semibold text-xl">Password</h2>
            <input
              type="password"
              placeholder="Enter Your Phone password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
              className="rounded-3xl w-1/2 p-2 bg-yellow-100 text-[0.8rem]  border-0 placeholder:text-zinc-700 font-semibold    "
            />
            <h3>Send verification code on</h3>

            <label>
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="verificationMethod"
                value="phone"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              Phone
            </label>
            <button className="rounded mt-3 border bg-emerald-800 h-10 w-1/6 border-zinc-500 ">
              Sign Up
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};
export default Register;
