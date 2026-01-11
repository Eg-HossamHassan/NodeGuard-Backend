const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

/**
 * GET all users (Admin only) with pagination & search
 */
exports.getUsers = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  if (!users.length) {
    return next(new AppError("No users found", 404));
  }

  res.json({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    users,
  });
});

/**
 * GET user by id (Admin)
 */
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json(user);
});

/**
 * UPDATE user (Admin)
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role },
    { new: true }
  ).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({
    message: "User updated",
    user,
  });
});

/**
 * DELETE user (Admin)
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({ message: "User deleted" });
});
