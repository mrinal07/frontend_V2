import { Form, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { HideLoading, showLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";

function AdminLogin() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

  const dispatch = useDispatch();
  const login = async () => {
    try {
      // remove exsiting token of users
      localStorage.removeItem('token');
      

      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/admin-login", user);
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);

        const now = new Date();        
        const data = {
          value: response.data,
          expiry: now.getTime()
        };

        localStorage.setItem("token", JSON.stringify(data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="mt-5 w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col bg-white">
        <h1 className="text-2xl">Admin Login</h1>
        <hr />
        <Form layout="vertical">
          <Form.Item name="username" label="Username">
            <input
              className=""
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input
              type="password"
              className=""
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Item>
          <button
            className="bg-primary text-white px-5 py-2 w-full"
            onClick={login}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
