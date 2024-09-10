import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminExperience() {
  // Reset the form fields
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { experiences } = portfolioData;
  
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const BASE_URL = "https://backend-v2-660423634636.us-central1.run.app/"

  const onFinish = async (values) => {
    debugger;

    // console.log(values);

    try {
      dispatch(showLoading());
      let response;

      // console.log(values.description);      
      // values.description = values.description.split("\n");
      // values.description.pop();

      // console.log(values.description);

      const stringToArr = values.skills.split(",");
      values.skills = stringToArr;

      if (selectedItemForEdit) {
        response = await axios.post(BASE_URL+"api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post(BASE_URL+"api/portfolio/add-experience", {
          ...values,
        });
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Internal Server Error", error);
    }
  };

  const onDelete = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(BASE_URL+"api/portfolio/delete-experience", {
        _id: id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
      <div className="flex justify-end mt-5 mb-5">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
            setType("add");
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experiences.map((experience) => (
          <div className="shadow border p-5 border-gray-400 flex-col">
            <h1 className="text-primary text-xl font-bold">
              {experience.period}
            </h1>
            <hr />
            <h1 className="mt-5">
              <span className="font-bold">Company:</span> {experience.company}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Role:</span> {experience.title}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Skills:</span> {experience.skills.join(",")}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Description:</span>{" "}
              {experience.description}
            </h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(experience._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
              selectedItemForEdit,
              skills: selectedItemForEdit?.skills?.join(","),
              }
            }
          >
            <Form.Item name="period" label="Period">
              <input className="" placeholder="Period" />
            </Form.Item>
            <Form.Item name="company" label="Company">
              <input className="" placeholder="Company" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <input className="" placeholder="Title" />
            </Form.Item>
            <Form.Item name="skills" label="Skills (Add comma after each skill)">              
              <input className="" placeholder="Skills" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea className="" placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2 "
                onClick={() => {
                  setShowAddEditModal(false)
                  setSelectedItemForEdit(null)
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2 ">
                {selectedItemForEdit ? "Edit" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
        
      )}
    </div>
  );
}

export default AdminExperience;
