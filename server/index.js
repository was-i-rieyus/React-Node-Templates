const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/profileDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema and model for storing profile data
const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  experience: String,
  image: {
    data: Buffer,
    contentType: String
  }
});
const Profile = mongoose.model('Profile', profileSchema);

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for handling profile data and image upload
app.post('/add', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const { name, role, experience } = req.body;

  const profile = new Profile({
    name,
    role,
    experience,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });

  try {
    await profile.save();
    res.status(200).json({ message: 'Profile added successfully' });
  } catch (error) {
    console.error('Error adding profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/data', async (req, res) => {
  try {
    const profiles = await Profile.find();

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ error: 'No profiles found' });
    }

    // Convert image buffer data to base64
    const profilesWithBase64 = profiles.map((profile) => ({
      ...profile._doc,
      image: {
        ...profile._doc.image,
        data: profile.image.data.toString('base64'),
      },
    }));

    res.status(200).json(profilesWithBase64);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
















// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});














