import { useEffect } from "react";
import { BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import Navigate from "../Nav/Navigate.component";
import { Provider } from "react-redux";
import { Routing } from "./Routing.component";
import store from "../../Redux/Store";

export const Home = () => {
  
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   if (!sessionStorage.getItem("userId")) {
    //     navigate('/SignIn');
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