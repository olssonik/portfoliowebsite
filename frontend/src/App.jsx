// packages
import "./index.css";

import { Router, Route } from "@solidjs/router";

//PAGES
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/blog" component={Blog} />
        <Route path="/portfolio" component={Portfolio} />
      </Router>
    </>
  );
}

export default App;
