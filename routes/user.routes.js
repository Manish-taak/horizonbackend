import express from 'express';
import { createUser, getUsers, deleteUser, updatePassword, loginUser } from '../controllers/user.controller.js'
import { authenticateJWT } from '../middleware/jwt.js';

const router = express.Router();

// Routes
router.post('/create', createUser); // register user
router.post('/loginuser', loginUser)  // login user
router.get('/getusers', getUsers); // find all users
router.delete('/deleteuser/:id', deleteUser)  //delete user
router.put('/updateuser', updatePassword)  // update password
export default router;





// user create
// api : http://localhost:3000/api/users/create
// data
// {
//     "name" : "manish",
//     "email": " manishTaak@mgail.com",
//     "password" : "Man!123h"
// }
// res
// {
//     "user": {
//         "id": 16,
//         "name": "manish",
//         "email": " manishTaak@mgail.com",
//         "password": "$2b$10$8fs5rhB/BBAs7T3OSdAwV.a.y5Cfc3E4.VeO68idhv5.yABe4yBHu",
//         "updatedAt": "2024-10-21T15:53:57.502Z",
//         "createdAt": "2024-10-21T15:53:57.502Z"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiIG1hbmlzaFRhYWtAbWdhaWwuY29tIiwiaWF0IjoxNzI5NTI2MDM3LCJleHAiOjE3Mjk1Mjk2Mzd9.hGdpaK1kH0AsCg8lEsT4RckWsNWwffjF-1o8lQkxd9g"
// }




// user login
// api : http://localhost:3000/api/users/loginuser
// data
// {
//     "email": " manishTaak@mgail.com",
//     "password": "Man!123h"
// }
// res
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoiIG1hbmlzaFRhYWtAbWdhaWwuY29tIiwiaWF0IjoxNzI5NTI2MjIzLCJleHAiOjE3Mjk1Mjk4MjN9.fpEZCL0G-MWAIjXn9ptxk4nNlOYFQn_GscUCLbJeyMc",
//     "message": "login successfull"
// }



// user update
// api :http://localhost:3000/api/users/updateuser
// data
// {
//     "email": " manishTaak@mgail.com",
//     "oldpassword" : "Man!123h",
//     "newpassword": "Man!456h"
// }
// res
// {
//     "message": "Password updated successfully!"
// }


// user delete
// api : http://localhost:3000/api/users/deleteuser/13
// res
// {
//     "message": "User deleted",
//     "user": {
//         "id": 13,
//         "name": "manish",
//         "email": "manishtaak@gmail2.com",
//         "password": "$2b$10$pkSjTl6r5TptuTnEaie6DuCXo95q6ynB7fDUFb78.Afg.7NygL8fK",
//         "createdAt": "2024-10-10T08:43:27.000Z",
//         "updatedAt": "2024-10-10T08:43:27.000Z"
//     }
// }



// get all user
// api : http://localhost:3000/api/users/getusers
// res
// all user








// post user data
// with the help of fetch

// import React, { useState } from "react";

// const PostUserData = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");

//   // Handle input changes for all form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value, // Dynamically set the form data based on input name
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("https://api.example.com/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResponseMessage("User created successfully: " + data.id);
//       } else {
//         setResponseMessage("Failed to create user");
//       }
//     } catch (error) {
//       setResponseMessage("Error: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Post User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <p>{responseMessage}</p>
//     </div>
//   );
// };

// export default PostUserData;


// post user data
// axios

// import React, { useState } from "react";
// import axios from "axios";

// const PostUserData = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");

//   // Handle input changes for all form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value, // Dynamically set the form data based on input name
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("https://api.example.com/users", formData);
//       setResponseMessage("User created successfully: " + response.data.id);
//     } catch (error) {
//       setResponseMessage("Error: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Post User Data</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <p>{responseMessage}</p>
//     </div>
//   );
// };

// export default PostUserData;
