let mongoose = require("mongoose"),
	express = require("express"),
	router = express.Router();

// User Model
let userSchema = require("../models/Usermodel");
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth");
// CREATE User
router.post("/create-user", auth, (req, res, next) => {
	userSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

// READ Users
router.get("/",auth, (req, res) => {
	userSchema.find((error, data) => {
		console.log(req);
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// UPDATE user
router
	.route("/update-user/:id")
	// Get Single User
	.get(auth, (req, res) => {
		userSchema.findById(
			req.params.id, (error, data) => {
				if (error) {
					return next(error);
				} else {
					res.json(data);
				}
			});
	})

	// Update User Data
	.put(auth, (req, res, next) => {
		userSchema.findByIdAndUpdate(
			req.params.id,
			//and u can use also (req.body._id) this insted of req.params.id both are works
			{
				$set: req.body,
			},
			(error, data) => {
				// console.log(req);
				if (error) {
					// console.log(error,'sfd');
					return next(error);
				} else {
					res.json(data);
					console.log("User updated successfully !");
				}
			}
		);
	});

// Delete user
router.delete("/delete-user/:id", auth,
	(req, res, next) => {
		userSchema.findByIdAndRemove(
			req.params.id, (error, data) => {
				if (error) {
					return next(error);
				} else {
					res.status(200).json({
						msg: data,
					});
				}
			});
	});

//Register
router.post("/register", async (req, res) => {
	var user = req.body;
	// console.log(user);
	const Email = await userSchema.findOne({ email: user.email });
	// console.log(Email);
	if (Email) {
		res.json({ message: 'Email has already been taken!!' });
	} else {
		user.password = await bcrypt.hash(req.body.password, 10);
		// console.log('dfgdf');
		// console.log(user.password);
		const dbuser = new userSchema({
			name: user.name,
			email: user.email,
			password: user.password
		})
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
		// console.log(dbuser);
		dbuser.save();

		res.json({ message: 'Success' })
	}

});

//Login
router.post("/login", (req, res) => {
	const user = req.body;
	userSchema.findOne({ email: user.email }).then(
		dbUser => {
			if (!dbUser) {
				return res.json({ message: 'Invalid Email Or Password' })
			}
			bcrypt.compare(user.password, dbUser.password).then(
				isCorrect => {
					if (isCorrect) {
						console.log(dbUser);
						const payload = {
							id: dbUser._id,
							email: dbUser.email,
							name: dbUser.name,
						}
						jwt.sign(
							payload,
							process.env.JWT_SECRET,
							{ expiresIn: 86400 },
							(err, token) => {
								// console.log(token);
								if (err) {
									return res.json({ message: err })
								}
								return res.json({ message: 'success', token: token })
							})
					} else {
						return res.json({ message: 'invalid Email Or Password' })
					}
				})
		})
});
//get Login User

router.get("/isUserAuth", auth, (req, res) => {
	return res.json({ isLoggedIn: true, name: req.user.name })
})
module.exports = router;
