import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProject() {
  // Reset the form fields
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    debugger;

    console.log(values);

    try {
      const stringToArr = values.technologies.split(",");
      values.technologies = stringToArr;

      dispatch(showLoading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", {
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
      const response = await axios.post("/api/portfolio/delete-project", {
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
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div className="shadow border p-5 border-gray-400 flex-col gap-5">
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <h1 className="mt-5">
              <span className="font-bold">Image:</span>
              <div className="h-60 w-80 border border-gray-200 rounded">
                <dotlottie-player
                  src={project.image}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Title:</span> {project.title}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Link:</span> {project.link}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Description:</span>{" "}
              {project.description}
            </h1>
            <h1 className="mt-5">
              <span className="font-bold">Technologies:</span>{" "}
              {project.technologies.join(",")}
            </h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(project._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(project);
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
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
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
                ...selectedItemForEdit,
                // If technologies is present then convert it into an commaa separated string
                technologies: selectedItemForEdit?.technologies?.join(","),
              } || {}
            }
          >
            <Form.Item name="title" label="Title">
              <input className="" placeholder="Title" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input className="" placeholder="Link" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <input className="" placeholder="Technologies" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <input className="" placeholder="Image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea className="" placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2 "
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
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

export default AdminProject;
