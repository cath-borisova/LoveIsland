const express = require('express');
const app = express();
app.set("views", "templates");
app.set("view-engine", "pug");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", express.static("resources"));

const posts = [[]]; // [episode, text, [comments], likes, username]
app.get("/", async(req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200);
	res.render("index.pug", {episodes: 28, posts: ["leah is annoying", "kaylor needs to break up with aaron already"]});
});

app.use((req, res) => {
	res.set("Content-Type", "text/html");
	res.status(404);
	res.send("Error");
});

app.listen(3000, ()=>{
	console.log("Started");
});