import Add from "./pages/Add/Add";
import DeleteTask from "./pages/DeleteTask/DeleteTask";
import Footer from "./components/shared/Footer/Footer";
import Header from "./components/shared/Header/Header";
import Home from "./pages/Home/Home";
import View from "./pages/View/View";
import { Routes, Route } from "react-router-dom";

// CSS
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/delete/:id" element={<DeleteTask />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
