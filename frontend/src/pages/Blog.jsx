import Title from "../components/Title";
import pic from "../assets/oli.jpg";

function Blog() {
  return (
    <>
      <Title dir="Blog" />
      <img className="pic" src={pic} alt="oli picture" />
      <p>
        blog is going to be api and saved into a file blog.json in the backend +
        admin page is going to be able to make new blog entries
      </p>
    </>
  );
}

export default Blog;
