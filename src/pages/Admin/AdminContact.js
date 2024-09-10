import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

function AdminContact() {
  const { portfolioData } = useSelector((state) => state.root);
  const initialValues = portfolioData.contact[0];

//   const { id, setId } = useState("#");

  const dispatch = useDispatch();

  const BASE_URL = `${process.env.REACT_APP_BASE_URL2}`;

  const onFinish = async (values) => {
    // setId(values._id);
    console.log("Received values of form:", values);
    // console.log("id:", id);
    try {
      debugger;
      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Internal Server Error", error);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={portfolioData.contact}
      >

        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
          <Input placeholder="Gender" />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile">
          <Input placeholder="Mobile" />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input placeholder="Age" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <TextArea placeholder="Address" />
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

export default AdminContact;
