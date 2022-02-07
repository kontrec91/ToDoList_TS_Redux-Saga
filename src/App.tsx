import "./App.css";
import "./css/style.css";
import React, { FC, ReactElement, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./StoreSaga";
// import { useNavigate } from "react-router-dom";
// import history from "./components/history/history";
import { ToDoPage } from "./components/ToDoPage";
import MainPage from "./components/mainPage/MainPage";
// import { Navigate } from "react-router-dom";
// import { NavigationContainer } from '@react-navigation/native';
// const navigate = useNavigate();

// export function navigation() {
//   if(store.getState().userId){
//     navigate('/todopage');
//   }else {
//     navigate('/');
//   }
//   console.log('userid in store',store.getState().userId);
// }


const App: FC = (): ReactElement => {
  // const navigate = useNavigate();


  // useEffect(()=>{
  //   navigation()
  //   console.log('userid in store',store.getState().userId);
  // }, [store.getState().userId])

  return (
    <section className="dotoApp">
      {/* <NavigationContainer> */}
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/todopage" element={<ToDoPage />} />
          </Routes>
          </Provider>
        </Router>
      {/* </NavigationContainer> */}
    </section>
  );
};
export default App;