
import React, { useState } from "react";
import InputTitle from "./InputTitle";
import InputArea from "./InputArea";
// import InputField from "./InputField.jsx";
// import TextAreaField from "./TextAreaField.jsx";
// import FileInputField from "./FileInputField.jsx";
import BlogEntry from "../../../server/models/blog-model";
import { useNavigate } from "react-router-dom";
import '../App.css';
import {useAuth} from "../store/Auth";


const CreateBlog = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const currUserID = user._id;
  const currUsername = user.username;
  const [formData, setFormData] = useState({
    userID: currUserID,
    username: currUsername,
    title: "",
    body: "",
    tags: ['Others']
  });

  const changeFunction = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0],
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     setFormData({
//       ...formData,
//       isDonation: e.target.checked,
//     });
//   };

  async function handleSubmit (){

    const postData = formData;
    postData.userID = currUserID;
    postData.username = currUsername;
    console.log(postData);

    try {
      const response = await fetch("http://localhost:5000/api/blog/newBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        // console.log(formData.title, formData.body);
        alert("Post submitted successfully!");
        // navigate("/"); 
      } else {
        console.error("Error:", result);
        alert("Failed to submit the post");
      }
    } catch (error) {
      console.error("Error submitting the post:", error);
      alert("Failed to submit the post due to a network error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-custom">
      <div className="w-full max-w-5xl bg-white outer-shadow p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black font-cambria">
          Create a New Blog
        </h1>
          <InputArea
            text="Title"
            name="title"
            value={formData.title}
            changeFunction={changeFunction}
            placeholder="Enter blog Title"
            rows={2}
            cols={40}
          />
          <InputArea
            text="Content"
            name="body"
            value={formData.body}
            changeFunction={changeFunction}
            placeholder="Enter blog content"
            rows={10}
            cols={40}
          />
          {/* <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            handleChange={handleChange}
            placeholder="Enter post description"
          />
          <FileInputField
            label="Image"
            name="image"
            handleImageChange={handleImageChange}
          /> */}
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="isDonation"
              name="isDonation"
              checked={formData.isDonation}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="isDonation" className="text-lg text-black">
              Is this post for donation?
            </label>
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="customButton w-24"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
      </div>
    </div>
  );
  
};

export default CreateBlog;


