const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts/range", async (req, res) => {
  const result = await Workout.find({}).sort({ day: -1 });
  res.json(result);
});

router.get("/api/workouts",async (req, res) => {
  const result = await Workout.find({}).sort({ day: 1 });
  res.json(result);
});

router.post("/api/workouts",async ({ body }, res) => {
  const result = await Workout.create(body)
  res.json(result);
});

router.put("/api/workouts/:id",async (req, res) => {
  let data = { $push: { exercises: req.body } };
  const workout = await Workout.update({_id: req.params.id}, data)
  const result = await Workout.findOne({_id: req.params.id});
  res.json(result);
});    

router.get("/api/workouts/:id",async (req, res) => {
  const result = await Workout.find({_id: req.params.id}).sort({ day: -1 })
  res.json(result);
});

module.exports = router;