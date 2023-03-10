/** @format */

import "./App.css";

import Footer from "./components/footer/Footer";
import Allroute from "./components/main_routes/Allroute";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Allroute />
        </BrowserRouter>
      </div>

      <Footer />
    </>
  );
}

export default App;
