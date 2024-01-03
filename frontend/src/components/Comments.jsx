import { createSignal, createEffect } from "solid-js";

function Comments(props) {
  const [comment, setComment] = createSignal("");
  const [cresponse, setCresponse] = createSignal("");
  const [token, setToken] = createSignal("");

  // Use createEffect to handle side effects
  createEffect(() => {
    setToken(props.token);
  });

  const handlePostComment = async () => {
    const response = await fetch(
      "https://oliborozynski.ddns.net/api/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment(), token: token() }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const cres = await JSON.stringify(responseData.comments);
      setCresponse(cres);
      setComment("");
    }
  };

  const handleCheck = () => {
    console.log(token());
  };

  return (
    <>
      <div>
        <input
          value={comment()}
          onInput={(e) => setComment(e.target.value)}
          onSubmit={handlePostComment}
        />
        <button onClick={handlePostComment}>Post Comment</button>
      </div>
      <p>{cresponse()}</p>
      <button onClick={handleCheck}>Check Props</button>
    </>
  );
}

export default Comments;
