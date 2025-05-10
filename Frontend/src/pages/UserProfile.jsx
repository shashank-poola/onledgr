/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircleUser } from "react-icons/fa6";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  console.log(user);
  const fecthUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fecthUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center shadow-lg mt-20 p-10">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-2xl">
          <FaRegCircleUser  className="cursor-pointer" />
          <h1 className="uppercase font-bold">{user.name}</h1>
        </div>
          <p className="text-sm">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
