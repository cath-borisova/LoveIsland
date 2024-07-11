window.addEventListener("load", () => {
	let episodes = document.getElementsByClassName("episode");
	for(let i = 0; i < episodes.length; i++){
		let episode = episodes[i];
		episode.addEventListener("click", async () => {
			console.log("clicked on", episode.id);
			let locked = false;
			for(let j = 0; j < episodes.length; j++){
				let currEpisode = episodes[j];
				if (currEpisode.id == episode.id) {
					currEpisode.classList.remove("locked", "unlocked");
					currEpisode.classList.add("selected")
					locked = true;
				} else if (!locked) {
					currEpisode.classList.remove("locked", "selected");
					currEpisode.classList.add("unlocked");
				} else {
					currEpisode.classList.remove("locked", "selected");
					currEpisode.classList.add("locked");
				}
			}
		});
	}

});