import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, message } from "antd";
import axios from "axios";
import { HideLoading, showLoading } from "../../redux/rootSlice";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  const [contactUs, setContactUs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

  const submit = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/contact-us", contactUs);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success("Thanks for getting in touch!");
        form.resetFields(); // Reset the form after successful submission
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="mt-20" id="Contact">
      <SectionTitle title="Let's Connect" />

      <div className="flex sm:flex-col items-center justify-between ">
        <div className="w-[450px] flex  p-5 shadow  flex-col sm:w-[390px]">
          <Form layout="vertical" form={form}>
            <Form.Item
              name="name"
              label={<label style={{ color: "white" }}>Name</label>}
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <input
                className=""
                placeholder="name"
                onChange={(e) =>
                  setContactUs({ ...contactUs, name: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<label style={{ color: "white" }}>Email</label>}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <input
                type="email"
                className=""
                placeholder="Email"
                onChange={(e) =>
                  setContactUs({ ...contactUs, email: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              name="message"
              label={<label style={{ color: "white" }}>Message</label>}
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <textarea
                type="password"
                className=""
                placeholder="Message"
                onChange={(e) =>
                  setContactUs({ ...contactUs, message: e.target.value })
                }
              />
            </Form.Item>

            <button
              className="bg-primary border border-tertiary text-white  py-2 w-full"
              onClick={submit}
            >
              Submit
            </button>
          </Form>       
             
        </div>
        {/* <div className="flex flex-col gap-1">           */}
        {/* <p className="text-white">{"{"}</p>

          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p>
                  <span className="text-tertiary"> {key} : </span>
                  <span className="text-tertiary"> {contact[key]} : </span>
                </p>
              )
          )}

          <p className="text-white">{"}"}</p> */}
        {/* </div> */}

        <div className="h-[400px] mr-[40px] sm:mr-0 ">
          <dotlottie-player
            src="https://lottie.host/41e2ecdc-ae1a-4d2c-8dee-423c81d3f28f/CcsTwyXxQ2.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
