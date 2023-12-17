import { createSignal, createEffect } from "solid-js";

function Api(props) {
  const [data, setData] = createSignal(null);
  const [fetchTime, setFetchTime] = createSignal(null);
  const [token, setToken] = createSignal("");

  createEffect(() => {
    setToken(props.token);
  });

  const fetchData = async () => {
    const startTime = performance.now();

    try {
      // Fetch data from JSONPlaceholder todos endpoint
      const response = await fetch("http://localhost:3333/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token() }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      const endTime = performance.now();
      const duration = `fetch time  ${endTime - startTime}  ms`;
      setFetchTime(duration);
    }
  };

  return (
    <>
      <p>
        <strong>Expected result : </strong>
      </p>
      <p>"number from 1 to 10"</p>
      <p>
        <strong>api response:</strong>{" "}
        <button onClick={fetchData}>run a test</button>
      </p>
      <p>{data()}</p>
      <p>{fetchTime()}</p>
    </>
  );
}

export default Api;
