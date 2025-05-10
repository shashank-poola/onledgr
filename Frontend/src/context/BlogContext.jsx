/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const BlogContext = createContext(null);

export const BlogContextProvider = ({children})=>{
    const [blogsData,setBlogsData] = useState([])
    const token = localStorage.getItem('token')
    // console.log(token)

    async function fetchBlogs(search){

        // const token = localStorage.getItem('token')
        if(!token){
            console.log("Your not logged in Login to see blogs");
            return;
        }

        if(search == undefined){
            search = " "
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/blog/all?search=${search}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setBlogsData(response.data.blogs);
        } catch (error) {
            console.log("Error Fetching blogs",error)
        }
    }

    // console.log(blogsData)

    const addBlogs = async (formData,setOpen) =>{
        try {
            const token = localStorage.getItem("token");
            // console.log(token)
            const response = await axios.post(
              "http://localhost:8000/api/blog/create",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            // console.log(response);
            toast.success(response.data.message);
            setOpen(false);
            fetchBlogs();

          } catch (error) {
            console.error(error, "Error Creating Blog");
          }
    }

    useEffect(()=>{
         fetchBlogs();
    },[])

return (
    <BlogContext.Provider value={{blogsData, setBlogsData,addBlogs,fetchBlogs}}>
        {children}
    </BlogContext.Provider>
)

}