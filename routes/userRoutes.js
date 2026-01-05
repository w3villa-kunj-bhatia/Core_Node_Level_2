const express = require("express");
const users = require("../data/users");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

router.post("/", auth, (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;

    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const newUser = {
      id: Date.now(),
      first_name,
      last_name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { first_name, last_name } = req.body;

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;

  res.status(200).json(user);
});

router.delete("/:id", auth, (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).send();
});

module.exports = router;
