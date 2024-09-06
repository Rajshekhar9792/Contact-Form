const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;



app.use(cors());
app.use(bodyParser.json());



const connectDB = async() =>  {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connection Established Successfully")
   
    } catch (error) {
        console.log(error)
    }    
};



const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDB();
});
