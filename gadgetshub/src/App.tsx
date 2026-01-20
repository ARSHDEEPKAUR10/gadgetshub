import Navbar from "./components/Navbar/Navbar";
import { containerStyle } from "./styles/Utilities";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />

      <Navbar />

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
    </>
  );
}

export default App;
