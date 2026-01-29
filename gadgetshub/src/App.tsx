import "./styles/utilities.css";
import { containerStyle } from "./styles/Utilities";

function App() {
  return (
    <main style={containerStyle}>
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
  );
}

export default App;
