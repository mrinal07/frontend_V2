import React from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  HideLoading,
  showLoading,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminIntro() {
  
  const { portfolioData } = useSelector((state) => state.root);
  const initialValues = portfolioData.intro[0];

  const dispatch = useDispatch();
  const BASE_URL = `${process.env.REACT_APP_BASE_URL2}`;

  const onFinish = async (values) => {
    
    console.log("Received values of form:", values);
    try {
      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro[0]._id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Internal Server Error",error);
    }
  };

  // AdminIntro Page is rendering before portfolioData is loaded from API

  

  // console.log(portfolioData);
  // console.log(intro);

  return (
    <div>
      <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
        <Form.Item name="welcomeText" label="Welcome Text">
          <Input placeholder="Welcome Text" />
        </Form.Item>

        <Form.Item name="firstName" label="First Name">
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item name="caption" label="Caption">
          <Input placeholder="Caption" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            SAVE
          </button>
        </div>

      </Form>
    </div>
  );
}

export default AdminIntro;
