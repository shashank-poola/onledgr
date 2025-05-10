import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const Blog = () => {
  const {id} = useParams();
  console.log("Id in blog single: ",id)

  const {blogsData} = useContext(BlogContext);
  // console.log(blogsData)

  const blog = blogsData.find((b)=>b._id === id);

  // console.log(blog)

  if(!blog){
    return <p className="text-red-500 text-center">Blog Not Found!</p>
  }

  return (
    <div className="">
      <div className="w-full shadow-lg p-10 mt-20">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <hr className="mt-2 mb-5"/>
        <p className="text-sm text-justify">
          {blog.description}
        </p>
        <Link to="/"><button className="mt-3 text-sm bg-[#074D51] px-5 py-2 text-white">Home</button></Link>
      </div>
    </div>
  );
};

export default Blog;
