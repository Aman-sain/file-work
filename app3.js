const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema for program data
const userSchema = new mongoose.Schema({
  code: String,
  name: String,
  duration: String,
  courseDirector: String,
  noOfParticipants: String,
  venue: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.static(path.join(__dirname))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'table.html'));
});

// Route to fetch programs data
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Error fetching programs');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

async function fetchPrograms() {
  try {
    const response = await fetch('/students/users'); // Fetch data from server
    const programs = await response.json(); // Parse JSON response
    const tableBody = document.getElementById('programs-table-body');
    tableBody.innerHTML = ''; // Clear previous content

    programs.forEach((program, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${program.code}</td>
          <td>${program.name}</td>
          <td>${program.duration}</td>
          <td>${program.courseDirector}</td>
          <td>${program.noOfParticipants}</td>
          <td>${program.venue}</td>
        </tr>
      `;
      tableBody.innerHTML += row; // Append row to table body
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
  }
}

// // Call fetchPrograms when the window loads
// window.onload = fetchPrograms;

