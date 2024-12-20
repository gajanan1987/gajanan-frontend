import { Route, Routes } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Home } from "./components/Home";
import { Userlisting } from "./components/Userlisting";


function App() {
  return (
    <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/userlist" element={<Userlisting />}></Route>
    </Routes>
    </div>
  );
}

export default App;
