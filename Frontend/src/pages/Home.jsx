import { useContext } from "react";
import BlogComponent from "../components/BlogComponent";
import Searchbar from "../components/Searchbar";
import { BlogContext } from "../context/BlogContext";

const Home = () => {
  const { blogsData } = useContext(BlogContext);

  // console.log("blogs data in home", blogsData);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Searchbar />

        {blogsData.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available...</p>
        ) : (
          <div>
            {blogsData.map((elm) => (
              <BlogComponent
                key={elm._id}
                id={elm._id}
                title={elm.title}
                description={elm.description}
                name={elm.user.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
