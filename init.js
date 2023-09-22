const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allChats = [
    {
        from: "Steve",
        to: "Ironman",
        msg: "Bring the Avengers",
        created_at: new Date(),
    },
    {
        from: "Ironman",
        to: "Steve",
        msg: "I'm on it!",
        created_at: new Date(),
    },
    {
        from: "Hulk",
        to: "Ironman",
        msg: "Smash!",
        created_at: new Date(),
    },
    {
        from: "Thor",
        to: "Steve",
        msg: "I shall join too!",
        created_at: new Date(),
    },
    {
        from: "Black Widow",
        to: "Ironman",
        msg: "Count me in!",
        created_at: new Date(),
    },
    {
        from: "Hawkeye",
        to: "Steve",
        msg: "I've got my bow ready!",
        created_at: new Date(),
    },
];
  
Chat.insertMany(allChats);


  