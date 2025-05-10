import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

const BlogForm = ({ setOpen }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const {addBlogs} = useContext(BlogContext)

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData: ", formData);
    addBlogs(formData,setOpen)
    
  };

  return (
    <div className="max-w-lg mx-auto ">
      <h2 className="text-2xl font-bold mb-4  text-gray-800">
        Create a New Blog
      </h2>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter Title"
          className="w-full p-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChange}
        />

        {/* Description Input */}
        <textarea
          name="description"
          value={formData.description}
          placeholder="Enter Description"
          className="w-full p-3 border border-gray-300  h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#074D51] text-white py-3  font-semibold hover:bg-blue-900 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
