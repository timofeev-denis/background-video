function BackgroundVideo(container) {
    if(container === undefined) {
        this.container = document.body;
    } else {
        this.container = document.getElementById(container);
    }
    this.currentItem = -1;
    this.videoCounter = 0;
    // All videos
    this.videos = new Array();
};

BackgroundVideo.prototype = {
    
    // Implement the `EventListener` interface   
    handleEvent: function(event) {
        switch (event.type) {
            case "ended": 
                return this.playNextItem();
                break;
            case "canplaythrough": 
                if(this.videos[this.currentItem].readyState != 4) {
                    return true;
                }
                var i = this.currentItem;
                do {
                    i++;
                } while(i < this.videos.length && this.videos[i].readyState == 4);
                if( i < this.videos.length && this.videos[i].readyState != 4) {
                    this.videos[i].load();
                }
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
        if(this.videoCounter > 1) {
            e.style.display = "none";
        }
	
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
        newVideo.addEventListener("canplaythrough", this);
        this.addToDOM(newVideo);
        this.videos.push(newVideo);
        if(this.videos.length == 1) {
            // First video added - play it
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
        var prevItem = this.currentItem;
        this.currentItem++;
        if( this.currentItem >= this.videos.length ) {
            this.currentItem = 0;
        }
        var item = this.videos[this.currentItem];
        if(item.readyState == 4) { // 4 - HAVE_ENOUGH_DATA
            item.play();
        } else {
            this.currentItem = 0;
            this.videos[0].play();
        }
        if(prevItem != undefined && this.videos[prevItem] != undefined && prevItem != this.currentItem) {
            document.getElementById(this.videos[prevItem].id).style.display = "none";
            document.getElementById(this.videos[this.currentItem].id).style.display = "";
        }
    }
    
}

/**
Usage:

// Create main object
var bgv = new BackgroundVideo("myId");
        
// Add video (file name without extension, formats)
bgv.addVideo( "video/Hello-World", [ "mp4", "ogv" ] );
bgv.addVideo( "video/SampleVideo_1280x720_1mb", [ "mp4"] );
bgv.addVideo( "video/OneBigCircle-HD.mp4", [ "mp4" ] );

 */