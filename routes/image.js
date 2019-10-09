// const express = require('express');
// const router = express.Router();
// const User = require("../models/User");

// const uploader = require("../configs/cloudinary");
// const multer = require('multer');


// //PATCH image

// router.post("/add/image", uploader.single("profilePicture"), (req, res, next) => {
//   if (!req.file) {
//     next(new Error("No file uploaded"));
//     return
//   }

//   res.json({ secure_url: req.file.secure_url })
// })


// router.post("/api/profilePicture/:id", (req, res) => {

//   User.findByIdAndUpdate(req.params.id)
// })

// router.patch('/api/profilepicture/:id', uploader.single('photo'), (req, file, next) => {
//   const id = req.params.id
//   console.log(file)
// if (req.file) {
//   const imgPath = req.file.url;
//   //const imgName = req.file.originalname;
//   console.log("img", imgPath, "id", id)
//   User.findOneAndUpdate({ _id: id }, { profilePicture: imgPath })
//     .then(user => {
//       res.status(200).json({ message: "updated image" });
//     })
//     .catch(error => {
//       console.log(error);
//     })
// } else {
//   console.log("no file")
// }


// });