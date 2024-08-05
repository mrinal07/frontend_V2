import React, { useState } from "react";
import axios from "axios";
import { Form, Input, message } from "antd";

function Index() {
  const [url, setUrl] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");

  const handleChange = (event) => {
    setUrl(event.target.value); // Update the state when the input value changes
  };
  const copyTheUrl = (event) => {
    setCopiedUrl(event.target.value);
  };

  const onclick = async () => {
    let res;
    try {
       // debugger;
      let val = url;

      res = await axios.post("http://localhost:5000/add-url", {
        val,
      });
    //   console.log(res);

      if (res.data) {
        console.log(res.data.data);
        setCopiedUrl(res.data.data);
      }
    } catch (error) {
      console.log(error);
      //   message.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="flex justify-center mt-10 ">Tiny URL</h1>

      <div class="flex justify-center mt-10 ">
        <div>
          <Form layout="vertical" className="w-96">
            <Form.Item name="url" label="URL please">
              <Input placeholder="Enter your long URL" onChange={handleChange}/>
            </Form.Item>

            <div className="flex justify-end w-full">
              <button
                className="px-8 py-2 bg-primary text-white"
                type="submit"
                onClick={onclick}
              >
                CREATE
              </button>
            </div>

            <Form.Item name="caption" label="Copy from here">
              <Input  value={copiedUrl} onChange={copyTheUrl} disabled/>
              <input hidden/>
            </Form.Item>

            <div className="flex justify-end w-full">              
              <button
                className="px-10 py-2 bg-primary text-white"
                type="submit"
                onClick={() => navigator.clipboard.writeText(copiedUrl)}
              >
                COPY
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Index;
