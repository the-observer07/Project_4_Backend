const bcrypt = require("bcrypt");
const router = require("./food");
const Portfolio = require("../models/Portfolio");
// const userflow = require("../controllers/user");
const catchAsync = require("../middleware/errorHandler");
const jwtAuth = require("../middleware/jwtAuth");

router.get("/", jwtAuth, catchAsync(userflow.getuser));
router.post("/signup", catchAsync(userflow.signup));
router.post("/login", catchAsync(userflow.login));
router.get("/logout", catchAsync(userflow.logout));

module.exports = router;
