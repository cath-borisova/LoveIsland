const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCySLU1Ml_uvvfg9N-1JKXYn7D9fS8mUyU",
  authDomain: "love-island-205dc.firebaseapp.com",
  projectId: "love-island-205dc",
  storageBucket: "love-island-205dc.appspot.com",
  messagingSenderId: "1090400274743",
  appId: "1:1090400274743:web:905a7ddb945462560872b2",
  measurementId: "G-6YYKT5EJHD"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);

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

app.get('/allposts', async (req, res) => {
	try {
		const querySnapshot = await getDocs(collection(db, 'posts'));
		const data = [];
		querySnapshot.forEach((doc) => {
		  data.push(doc.data());
		});
		res.json(data);
	  } catch (error) {
		res.status(500).send('Error getting data from Firestore: ' + error.message);
	  }
});

app.listen(3000, ()=>{
	console.log("Started");
});