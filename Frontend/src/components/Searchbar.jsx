import React, { useContext, useState } from "react";
import Modal from "./ui/Modal";
import BlogForm from "./BlogForm";
import { BlogContext } from "../context/BlogContext";

const Searchbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm , setSearchTerm] = useState('')
  const {fetchBlogs} = useContext(BlogContext)

  console.log(searchTerm);

  const handleOnClick = ()=>{
    fetchBlogs(searchTerm);
  }
  
  return (
    <div className="flex justify-between items-center mt-20">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search blogs..."
          className="bg-transparent border py-2 w-[400px] pl-2"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <button className="bg-[#074D51] text-white px-4" onClick={handleOnClick}>Search</button>
      </div>
      <div>
        <button
          className="bg-[#074D51] text-white px-4 py-2"
          onClick={() => setModalOpen(true)}
        >
          Add Blog
        </button>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <BlogForm setOpen={setModalOpen}/>
      </Modal>
    </div>
  );
};

export default Searchbar;
