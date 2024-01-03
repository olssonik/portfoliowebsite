import Api from "../components/Api";
import Finance from "../components/Finance";
import Title from "../components/Title";
import { createSignal } from "solid-js";
import Comments from "../components/Comments";
import Blogentry from "../components/Blogentry";

function Admin() {
  const [allowed, setAllowed] = createSignal(false);
  const [jwt, setJwt] = createSignal("");

  const handleAuth = async (pass) => {
    try {
      const response = await fetch("https://oliborozynski.ddns.net/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pass: pass }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setAllowed(true);
        setJwt(responseData.jwt);
      } else {
        console.error("Failed to get a token:", response.statusText);
        setAllowed(false);
      }
    } catch (error) {
      console.error("Error getting a token:", error.message);
    }
  };

  function startup() {
    let userlogin;
    userlogin = prompt("Enter credentials: ");
    handleAuth(userlogin);
  }

  startup();
  return (
    <>
      <Title dir="Admin" />
      {allowed() && "Hello Oli"}
      {allowed() && <Api token={jwt()} />}
      {allowed() && <Finance token={jwt()} />}
      {allowed() && <Comments token={jwt()} />}
      {allowed() && <Blogentry token={jwt()} />}
    </>
  );
}

export default Admin;
