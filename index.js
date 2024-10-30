let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
require('dotenv').config();


const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
});

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

let User = mongoose.model('user', userSchema);
let Exercise = mongoose.model('exercise', exerciseSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/api/users", async (req, res) => {
    try {
        const userList = await User.find({});
        res.json(userList);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    const newUser = new User({ username:req.body.username });
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params._id }).exec();
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const newExercise = new Exercise({ 
            _id: req.params._id,
            description: req.body.description,
            duration: parseInt(req.body.duration),
            date: new Date(req.body.date)
        });
        const savedExercise = await newExercise.save();
        res.json(savedExercise);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
