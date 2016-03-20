/*
document.addEventListener("DOMContentLoaded", function(event) { 
	console.log( "DOMContentLoaded" );
});
*/

var Item = function(name, formats, poster) {
	if( name === undefined || formats === undefined ) {
		return;
	}
	if( poster !== undefined ) {
		this.poster = poster;
	}
	this.sources = new Array();
	for(i = 0; i < formats.length; i++) {
		this.sources[i] = {
			src: name + "." + formats[i],
			type: "video/" + formats[i]
		};
		//this.video.appendChild(source);
	}
}

function BackgroundVideo(container) {
	this.video = document.createElement("video");
	this.video.setAttribute("id", "BackgroundVideoContainer");
	this.video.className = "flexible";
	this.video.autoplay = true;
	this.video.loop = false;
	//this.video.setAttribute('poster', name + ".jpg");
	this.playlist = new Array();
	this.currentItem = -1;
	this.addToDOM(container);
	console.log( "BackgroundVideo constructor" );
	this.video.addEventListener("ended", this);
};

BackgroundVideo.prototype = {
    
	// Implement the `EventListener` interface   
    handleEvent: function(event) {
        switch (event.type) {
            case "ended": return this.playNextItem();
        }
    },
	
	addToDOM: function(container) {
		if(container === undefined) {
			document.body.appendChild(this.video);
		} else {
			var parent = document.getElementById(container);
			if( parent.firstChild == null ) {
				parent.appendChild(this.video);
			} else {
				parent.insertBefore(this.video, parent.firstChild);
			}
		}
	},
	
	playNextItem: function() {
		this.currentItem++;
		if( this.currentItem >= this.playlist.length ) {
			this.currentItem = 0;
		}
		
		console.log("playNextItem, this.currentItem is " + this.currentItem);
		
		var item = this.playlist[this.currentItem];
		console.log(this.video);
		// Clean video tag
		while (this.video.firstChild) {
			this.video.removeChild(this.video.firstChild);
		}
		// Add source tags
		for(i = 0; i < item.sources.length; i++) {
			var source = document.createElement('source');
			source.src = item.sources[i].src;
			source.type = item.sources[i].type;
			this.video.appendChild(source);
		}
		
		this.video.load();
	},

	addVideo: function(name, formats, poster) {
		if( name === undefined || formats === undefined ) {
			return;
		}
		//console.log( "this.playlist.length: " + this.playlist.length );
		this.playlist[this.playlist.length] = new Item(name, formats, poster);
		
		if(this.playlist.length == 1) {
			// First video added - play it
			this.playNextItem();
		}
	}
	
}

var bgv = new BackgroundVideo("myId");

bgv.addVideo( "video/SampleVideo_1280x720_1mb", [ "mp4"] );
bgv.addVideo( "video/Hello-World", [ "webm", "mp4", "ogv" ] );
bgv.addVideo( "video/OneBigCircle-HD.mp4", [ "mp4" ] );
