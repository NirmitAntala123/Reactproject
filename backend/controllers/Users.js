let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
  const multer = require('multer');
// User Model
let userSchema = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session");
//Configuration for Multer
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);

//   },
// });
 //Configuration for Multer
 const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    // cb(null, `images/${file.fieldname}-${Date.now()}.${ext}`);
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage: multerStorage });
// CREATE User
const userCreate = (req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// READ Users
const getUser = (req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};


// UPDATE user
// router
//   .route("/update-user/:id")
//   // Get Single User
//   .get(auth, (req, res) => {
//     userSchema.findById(req.params.id, (error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         res.json(data);
//       }
//     });
//   })

// Update User Data
const userEdit = (req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    //and u can use also (req.body._id) this insted of req.params.id both are works
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("User updated successfully !");
      }
    }
  );
};

// Delete user
const deleteUser = (req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

//Register
const register = async (req, res) => {
  var user = req.body;
  const Email = await userSchema.findOne({ email: user.email });
  if (Email) {
    res.json({ message: "Email has already been taken!!" });
  } else {
    user.password = await bcrypt.hash(req.body.password, 10);
    const url = req.protocol + '://' + req.get('host');
    const productFileName = req.file ? req.file.filename : '';
    const dbuser = new userSchema({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      birthDate: user.birthDate,
      profilePhoto: url + '/public/' + productFileName,
      country: user.country,
      state: user.state,
      city: user.city,
      gender: user.gender,
      email: user.email,
      password: user.password,
    });
    // bcrypt.genSalt(10, function (err, salt) {
    // 	bcrypt.hash(req.body.password, salt, function (err, hash) {
    // 		if (err) throw err;
    // 		dbuser.password = hash;
    // 		dbuser.save()
    // 			.then(response => {
    // 				res.status(200).json({
    // 					success: true,
    // 					result: response
    // 				})
    // 			})
    // 			.catch(err => {
    // 				res.status(500).json({
    // 					errors: [{ error: err }]
    // 				});
    // 			});
    // 	});

    // })

    dbuser.save();

    res.json({ message: "Success" });
  }
};

//Login
const login = (req, res) => {
  const user = req.body;
  userSchema.findOne({ email: user.email }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Email Or Password" });
    }
    bcrypt.compare(user.password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {

        const payload = {
          id: dbUser._id,
          email: dbUser.email,
          name: dbUser.name,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) {
              return res.json({ message: err });
            }
            return res.json({ message: "success", token: token });
          }
        );
        req.session.user =payload;
        console.log(req.session.user);
      } else {
        return res.json({ message: "invalid Email Or Password" });
      }
    });
  });
};
//logout User
const logoutUser = (req, res) => {

  req.session.destroy((err) => {
    //delete session data, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("secret"); // clears cookie containing expired sessionID

   return res.status(200).send({ message: "Logged out successfully." });
  });

}
//get Login User
const authCheck = (req, res) => {
  return res.json({ isLoggedIn: true, name: req.user.name });
};
module.exports = {
  upload,
  getUser,
  login,
  register,
  authCheck,
  deleteUser,
  userCreate,
  userEdit,
  logoutUser
};
