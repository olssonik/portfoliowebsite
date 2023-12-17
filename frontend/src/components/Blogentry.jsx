import { createSignal, createEffect } from "solid-js";

function Blogentry(props) {
  const [token, setToken] = createSignal("");

  createEffect(() => {
    setToken(props.token);
  });

  const handlePostBlog = async () => {
    const response = await fetch("http://localhost:3333/api/blogpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "01/01/2023",
        title: "TEST",
        content: "content",
        token: token(),
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    }
  };

  return (
    <>
      <input />
      <button onClick={handlePostBlog}>post a blog</button>
    </>
  );
}

export default Blogentry;
