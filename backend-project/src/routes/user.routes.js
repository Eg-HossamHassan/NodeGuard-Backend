const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { auth, authorize } = require("../middlewares/auth.middleware");

// ⚠️ لازم /me قبل /:id
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

// Admin only
router.get("/", auth, authorize("admin"), userController.getUsers);
router.get("/:id", auth, authorize("admin"), userController.getUserById);
router.put("/:id", auth, authorize("admin"), userController.updateUser);
router.delete("/:id", auth, authorize("admin"), userController.deleteUser);

module.exports = router;
