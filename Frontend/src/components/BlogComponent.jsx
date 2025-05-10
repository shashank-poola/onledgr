import { MdOutlineExpandMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-toastify";

const BlogComponent = ({ id, title, description,name }) => {
  const Navigate = useNavigate();

  const {blogsData,setBlogsData} = useContext(BlogContext)
  const handleOnClick = () => {
    Navigate(`/blog/${id}`);
  };

  const handleRemove = async()=>{
    try {
      const token = localStorage.getItem('token')
      const response  = await axios.delete(`http://localhost:8000/api/blog/delete/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message);
      setBlogsData(blogsData.filter((blog)=>blog._id !== id))
    } catch (error) {
      console.log(error,"Error Deleting Blog!")
      toast.error(error.message)
    }
  }

  return (
    <div className="mt-3 shadow-lg p-8 flex justify-between relative">
      <div className="w-[90%]">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="text-sm mt-2">Author, <span className="uppercase">{name}</span></p>
      </div>
      <div className="flex gap-2 justify-center items-center w-[10%]">
        <button className="text-sm" onClick={handleOnClick}>
          See More
        </button>
        <MdOutlineExpandMore />
      </div>
      <div className="w-5 h-5 absolute top-4 right-4 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300"
      onClick={handleRemove}>
        &times;
      </div>
    </div>
  );
};

export default BlogComponent;
