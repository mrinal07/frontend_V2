import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index";
import Loader from "./components/Loader";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { HideLoading, setPortfolioData,showLoading,ReloadData ,setNextPortfolioData} from "./redux/rootSlice";
import Admin from "./pages/Admin/Index";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  // const [showLoading, setShowLoading] = useState(false);

  const { loading, portfolioData , reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`
  // const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
 
  const getPortfolioData = async () => {
    try {
      dispatch(showLoading(true));

      console.log("App.js 1=>"+BASE_URL+"api/portfolio/get-portfolio-data");
      const response = await axios.get(BASE_URL+"api/portfolio/get-portfolio-data");

      
      const response2 = await axios.get(BASE_URL + "api/portfolio/get-next-portfolio-data");
      
      // console.log("App.js 1=>"+JSON.stringify(response.data));
      // console.log("App.js 2=>"+JSON.stringify(response2.data));
      
      dispatch(setPortfolioData(response.data));
      dispatch(HideLoading());
      
      dispatch(setNextPortfolioData(response2.data));

      dispatch(ReloadData(false));
      
      
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


  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/admin" element={ <Admin/> }></Route>
        <Route path="/admin-login" element={ <AdminLogin/> }></Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
