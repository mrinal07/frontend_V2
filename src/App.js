import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index";
import Loader from "./components/Loader";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { HideLoading, setPortfolioData,showLoading,ReloadData } from "./redux/rootSlice";
import Admin from "./pages/Admin/Index";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  // const [showLoading, setShowLoading] = useState(false);

  const { loading, portfolioData , reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

  const getPortfolioData = async () => {
    try {
      dispatch(showLoading(true));

      const response = await axios.get(BASE_URL+"api/portfolio/get-portfolio-data");

      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
      
      // console.log(22)
      // console.log(response.data.projects[1]);
      // console.log(24)
    } catch (error) {
      dispatch(HideLoading());

    }
  };

  useEffect(() => {
    if(!portfolioData)
      getPortfolioData();

  }, [portfolioData]);

  useEffect(() => {
    if(reloadData)
      getPortfolioData();

  }, [reloadData]);

  // useEffect(() => {
  //   // console.log("mrinal=>"+portfolioData);
  // }, [portfolioData]);

  return (
    <BrowserRouter>
      {/* {loading ? <Loader /> : null} */}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/admin" element={ <Admin/> }></Route>
        <Route path="/admin-login" element={ <AdminLogin/> }></Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
