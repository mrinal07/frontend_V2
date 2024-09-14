import React from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  HideLoading,
  showLoading,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {

  const { portfolioData } = useSelector((state) => state.root);
  const initialValues = portfolioData.about[0];

  const dispatch = useDispatch();

  const BASE_URL = "https://backend-v2-660423634636.us-central1.run.app/"

  const onFinish = async (values) => {

    // converting string to array
    // Because we are storing skills as array in database and we are getting it as string from Input

    const stringToArr = values.skills.split(",");
    values.skills = stringToArr;
    
    console.log("Received values of form:", values);
    try {
      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about[0]._id,
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



  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={
        {
          ...portfolioData.about[0],
          skills: initialValues.skills.join(","),
        }
        }>
        <Form.Item name="lottieURL" label="Lottie URL">
          <Input placeholder="Lottie URL for image" />
        </Form.Item>

        <Form.Item name="description1" label="Description 1">
          <Input placeholder="Description 1" />
        </Form.Item>

        <Form.Item name="description2" label="Description 2">
          <Input placeholder="Description 2" />
        </Form.Item>

        <Form.Item name="skills" label="Skills">
          <Input placeholder="Skills" />
        </Form.Item>

        <div className="flex justify-end w-full">
          <button className="px-10 py-2 bg-primary text-white" type="submit">
            SAVE
          </button>
        </div>

      </Form>
    </div>
  )
}

export default AdminAbout