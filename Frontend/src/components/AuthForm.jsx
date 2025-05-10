import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:8000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(res);

        toast.success(res.data.message);
        login(res.data.token);

        navigate("/home");
      } else {
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
        console.log(res);
        toast.success("Registration Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.log({ error: error.message });
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (

     <div className="min-h-screen flex flex-col items-center justify-center space-grotesk ">
            <div className="mb-6">
        <img
          src="src/assets/onledgrlogo.png" // make sure this path is correct
          alt="OnLedgr"
          className="w-48 mx-auto mb-4 max-h-32"
        />
      </div>

      <div className="bg-white p-8 shadow-xl w-96 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 ">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleOnSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white  hover:bg-[#047857] transition-all rounded-2xl">
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
