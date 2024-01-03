import { createSignal, createEffect } from "solid-js";

function Finance(props) {
  const [fdata, setFdata] = createSignal(null);
  const [spendings, setSpendings] = createSignal(null);
  const [income, setIncome] = createSignal(null);
  const [token, setToken] = createSignal("");

  createEffect(() => {
    setToken(props.token);
  });

  const fetchFinance = async () => {
    function financefunc(fjs) {
      setFdata(JSON.stringify(fjs.financejson));
      setSpendings(JSON.stringify(fjs.financejson.spendings));
      setIncome(JSON.stringify(fjs.financejson.income));
    }

    const response = await fetch("http://oliborozynski.ddns.net/api/finance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token() }),
    });

    if (response.ok) {
      const responseData = await response.json();
      financefunc(responseData);
    }
  };

  const handlefetch = () => {
    fetchFinance();
  };
  return (
    <>
      <p>
        <strong>Finance api : </strong>
      </p>
      <button onClick={handlefetch}>handle fetch</button>
      <p>whole api response: {fdata()}</p>
      <p>spendings : {spendings()}</p>
      <p>income : {income()}</p>
    </>
  );
}

export default Finance;
