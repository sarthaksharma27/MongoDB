const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Database Connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connection successful");
  } catch (err) {
    console.error(err);
  }
}
main();

// Routes

// Index Route for displaying all chats
app.get('/chats', async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// Route for creating a new chat form
app.get('/chats/new', (req, res) => {
  res.render("new.ejs");
});

// Route for handling the creation of a new chat
app.post('/chats', async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  try {
    await newChat.save();
    console.log("Chat was saved");
    res.redirect('/chats');
  } catch (err) {
    console.error(err);
    res.redirect('/chats/new');
  }
});

// Route for editing a chat
app.get('/chats/:id/edit', async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Route for updating a chat
app.put('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let { newMsg } = req.body;

  try {
    await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true });
    res.redirect('/chats');
  } catch (err) {
    console.error(err);
    res.redirect('/chats');
  }
});

// Route for deleting a chat
app.delete('/chats/:id', async (req, res) => {
  let { id } = req.params;

  try {
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
  } catch (err) {
    console.error(err);
    res.redirect('/chats');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
