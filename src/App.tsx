import "./App.css";
import "./css/style.css";
import React, { FC, ReactElement, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./StoreSaga";
import { ToDoPage } from "./components/ToDoPage";
import MainPage from "./components/mainPage/MainPage";


const App: FC = (): ReactElement => {

  return (
    <section className="dotoApp">
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/todopage" element={<ToDoPage />} />
          </Routes>
          </Provider>
        </Router>
    </section>
  );
};
export default App;