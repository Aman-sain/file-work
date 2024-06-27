const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3000;

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

// Define schema for the user data
const userSchema = new mongoose.Schema({
    code: String,
    name: String,
    duration: String,
    courseDirector: String,
    noOfParticipants: String,
    venue: String
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/post', async (req, res) => {
    const { code, name ,duration, courseDirector,noOfParticipants,venue } = req.body;
    try {
        // Create a new User document
        const user = new User({
            code, name ,duration, courseDirector,noOfParticipants,venue
        });

        // Save the user document to the database
        await user.save();
        console.log('User saved:', user);
        res.send("Form submission successful");
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error submitting form');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
