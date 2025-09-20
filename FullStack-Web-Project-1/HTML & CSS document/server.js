const express = require("express");
const path = require("path");
const app = express();
const port = 5500;

// Getting Started.js
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

main().catch(err => console.log(err));

async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/UniversityDatabase');

}

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

// Define mongoose schema
const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
});

const Contact = mongoose.model('Contact', contactSchema);
const Comment = mongoose.model('Comment', commentSchema);

// EXPRESS SPECIFIC STUFF
app.use('/public', express.static('public')); // For serving public files
app.use(express.urlencoded());

// HTML SPECIFIC STUFF
app.use(express.static(path.join(__dirname, 'public'))); // Set your html in /public

// ENDPOINTS
app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "Index.html"));
});

app.get("/about", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/course", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "course.html"));
});

app.get("/blog", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "Blog.html"));
});

app.get("/contact", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "public", "Contact.html"));
});

// ==========================
// 404 ERROR HANDLER
// ==========================

// This middleware runs only if no other route matches.
// It must be placed at the END of all routes.

app.use((req, res)=>{
  // Set HTTP status code to 404 (Not Found)
  res.status(404);

  // Send a static HTML file (404.html) as the error page.
  // __dirname gives the current directory of this file.
  // path.join() safely builds the full path to the 404.html inside the "public" folder.
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.post('/contact', (req, res)=> {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.sendFile(path.join(__dirname, "public", "contact-success.html"));
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.");
    });
});

app.post('/comment', (req, res)=>{
    var myData = new Comment(req.body);
    myData.save().then(()=> {
        res.sendFile(path.join(__dirname, "public", "comment-success.html"));
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.");
    });
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

