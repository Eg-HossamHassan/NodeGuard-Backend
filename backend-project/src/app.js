const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  const AppError = require("./utils/AppError");
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});


// Global error handler (last middleware)
app.use(globalErrorHandler);

module.exports = app;
