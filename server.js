const express = require('express');
const app = express();
app.set("views", "templates");
app.set("view-engine", "pug");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", express.static("resources"));

const posts = [[1, 10, "leah is annoying", ["no way! leah is my fav"], 4, "cathborisova"], 
	[2, 25, "kaylor needs to break up with aaron already", ["yes omg he is so annoying", "he is such a manipulator"], 5, "cathy"],
	[3, 1, "what is love island?", [], 0, "anonymous"]]; // [id, episode, text, [comments], likes, username]
app.get("/", async(req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200);
	res.render("index.pug", {episodes: 28, posts: posts});
});

app.use((req, res) => {
	res.set("Content-Type", "text/html");
	res.status(404);
	res.send("Error");
});

app.listen(3000, ()=>{
	console.log("Started");
});