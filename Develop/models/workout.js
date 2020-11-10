const opts = { toJSON: { virtuals: true } };
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day:{
        type: Date,
        default: Date.now()
    },
    exercises:[{
        type: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        duration: {
            type: Number,
            default: 0
        },
        weight: {
            type: Number,
            default: 0
        },
        reps: {
            type: Number,
            default: 0
        },
        sets: {
            type: Number,
            default: 0
        },
        distance: {
            type: Number,
            default: 0
        }
    }] 
}, opts);

workoutSchema.virtual('totalDuration').get(function() {
    return this.exercises.length > 0 ? this.exercises
        .map((exercise) => exercise.duration)
            .filter(obj => obj)
            .reduce((a,b) => {
                return a + b;
            }) : 0;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;