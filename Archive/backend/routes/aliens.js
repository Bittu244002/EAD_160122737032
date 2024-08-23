const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");

router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    res.json(alien);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const alien = new Alien({
    stu_name: req.body.stu_name,
    rollno: req.body.rollno,
    sub: req.body.sub,
    email: req.body.email,
    address: req.body.address,
  });

  try {
    const a1 = await alien.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    alien.stu_name = req.body.stu_name;
    alien.rollno = req.body.rollno;
    alien.email = req.body.email;
    const a1 = await alien.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
