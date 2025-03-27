import { Link } from "react-router-dom";
import App from "./App";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <App />
    </div>
  );
}
