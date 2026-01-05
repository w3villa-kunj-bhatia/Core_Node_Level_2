const express = require("express");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the User Management API" });
});

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
