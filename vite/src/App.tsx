import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
// import Rank from "./pages/Rank";
import My from "./pages/My";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          {/* <Route path="/rank" element={<Rank />} /> */}
          <Route path="/my" element={<My />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
