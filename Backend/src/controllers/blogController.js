import { Blog } from "../schemas/blog.Schema.js";

export const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const newBlog = new Blog({ title, description, user: userId });
    await newBlog.save();

    return res
      .status(201)
      .json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    let search = req.query.search || " "

    const blogs = await Blog.find({
      $or:[
        {title:{$regex:search,$options:"i"}},
        {content:{$regex:search,$options:"i"}}
      ]
    }).populate('user');

    console.log(search);

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res
      .status(200)
      .json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blogToDelete = await Blog.findOneAndDelete({ _id: id, user: userId });

    if (!blogToDelete) {
      return res.status(403).json({ message: "Blog not found or unauthorized to delete" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error Deleting Blog:", error.message);
    return res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

