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
	} else {
		this.poster = name + ".jpg";
	}
	this.sources = new Array();
	for(i = 0; i < formats.length; i++) {
		this.sources[i] = {
			src: name + "." + formats[i],
			type: "video/" + formats[i]
		};
	}
}

function BackgroundVideo(container) {
    if(container === undefined) {
        this.container = document.body;
    } else {
        this.container = document.getElementById(container);
    }
    /*
    this.video = document.createElement("video");
    this.video.setAttribute("id", "BackgroundVideoContainer");
    this.video.className = "flexible";
    this.video.autoplay = true;
    this.video.loop = false;
    this.video.muted = true;
    this.playlist = new Array();
    this.currentItem = -1;
    this.videoCounter = 0;
    //this.addToDOM();
    console.log( "BackgroundVideo constructor" );
    this.video.addEventListener("ended", this);
    */
    this.currentItem = -1;
    this.videoCounter = 0;
    // All videos
    this.videos = new Array();
    // Loaded videos
    this.playlist = new Array();
};

BackgroundVideo.prototype = {
    
    // Implement the `EventListener` interface   
    handleEvent: function(event) {
        console.log("EVENT: " + event.type + " " + event.target.id);
        switch (event.type) {
            case "ended": 
                return this.playNextItem();
                break;
            case "canplaythrough": 
                for(i = 0; i < this.videos.length; i++) {
                    if(this.videos[i].id == event.target.id) {
                        console.log( " skip " + event.target.id );
                        return false;
                    }
                }
                //this.playlist.push(event.target);
                console.log( " loaded " + event.target.id );
                //console.log( this.playlist );
                break;
        }
    },

    initVideoTag: function(e, name, formats, poster) {
	if( poster !== undefined ) {
            e.poster = poster;
	} else {
            e.poster = name + ".jpg";
	}
        e.setAttribute("id", "BackgroundVideo-" + this.videoCounter++);
        e.className = "flexible";
        e.preload = "none";
        e.loop = false;
        e.muted = true;
	
	for(i = 0; i < formats.length; i++) {
            var source = document.createElement('source');
            source.src = name + "." + formats[i];
            source.type = "video/" + formats[i];
            e.appendChild(source);
	}
    },
    
    addVideo: function(name, formats, poster) {
        if( name === undefined || formats === undefined ) {
            return;
        }
        var newVideo = document.createElement("video");
        this.initVideoTag(newVideo, name, formats, poster);
        newVideo.addEventListener("ended", this);
        //newVideo.addEventListener("canplaythrough", this);
        this.addToDOM(newVideo);
        this.videos.push(newVideo);
        if(this.videos.length == 1) {
            // First video added - play it and put to playlist
            //this.videos[0].play();
            this.playNextItem();
        }
    },

    addToDOM: function(e) {
        if( this.container.firstChild == null ) {
            this.container.appendChild(e);
        } else {
            this.container.insertBefore(e, this.container.firstChild);
        }
    },

    playNextItem: function() {
        this.currentItem++;
        if( this.currentItem >= this.videos.length ) {
            this.currentItem = 0;
        }
        console.log( "Trying to play item #" + this.currentItem );
        var item = this.videos[this.currentItem];
        if(item.readyState == 4) { // 4 - HAVE_ENOUGH_DATA
            item.play();
        } else {
            console.log( " loading item #" + this.currentItem );
            item.load();
            this.currentItem = 0;
            this.videos[0].play();
        }
    }
    
}



var bgv = new BackgroundVideo("myId");

bgv.addVideo( "video/SampleVideo_1280x720_1mb", [ "mp4"] );
bgv.addVideo( "video/Hello-World", [ "webm", "mp4", "ogv" ] );
bgv.addVideo( "video/OneBigCircle-HD.mp4", [ "mp4" ] );
