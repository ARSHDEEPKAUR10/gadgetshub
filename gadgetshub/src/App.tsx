import Navbar from "./components/Navbar/Navbar";
import "./styles/utilities.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <h2>Welcome to GadgetsHub</h2>
        <p>Explore gadgets like smartphones, laptops, and headphones.</p>

        <h3>Categories</h3>
        <ul>
          <li>Smartphones</li>
          <li>Laptops</li>
          <li>Headphones</li>
          <li>Accessories</li>
        </ul>
      </main>
    </>
  );
}

export default App;