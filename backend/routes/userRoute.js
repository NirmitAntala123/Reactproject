const auth = require("../middleware/auth");
(express = require("express")), (router = express.Router());
const UserController = require("../controllers/Users");

//Authentication
router.get("/isUserAuth", auth, UserController.authCheck);
router.post("/login", UserController.login);
router.post("/register",UserController.upload.single('profilePhoto'), UserController.register);
router.get("/logout",UserController.logoutUser);

//user routes
router.get("/", auth, UserController.getUser);
router.post("/create-user", auth,  UserController.userCreate);
router.put("/update-user/:id", auth, UserController.userEdit);
router.delete("/delete-user/:id", auth, UserController.deleteUser);

module.exports = router;
