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

app.get("/", async(req, res) => {
	res.set('Content-Type', 'text/html');
		
		try {
			const querySnapshot = await getDocs(collection(db, '/posts'));
			const data = [];
			querySnapshot.forEach((doc) => {
			data.push(doc.data());
			});
			res.render("index.pug", {episodes: 28, posts: data});
			res.status(200);
		} catch (error) {
			res.status(500).send('Error getting data from Firestore: ' + error.message);
		}
});

app.use((req, res) => {
	res.set("Content-Type", "text/html");
	res.status(404);
	res.send("Error");
});


app.listen(3000, ()=>{
	console.log("Started");
});