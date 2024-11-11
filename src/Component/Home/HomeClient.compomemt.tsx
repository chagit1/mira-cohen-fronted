import { useEffect } from "react";
import { BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import Navigate from "../Nav/Navigate.component";
import { Provider } from "react-redux";
import store from "../../Redux/Store";
import Routing from "./Routing.component";

export const HomeClient = () => {
  
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (!sessionStorage.getItem("userId")) {
    //   }
    // }, [navigate]);
  
    return (
      <>
          <Provider store={store}>
            <Navigate></Navigate>
            <Outlet></Outlet>
            <Routing></Routing>
        </Provider>
    
      </>
    );
  };