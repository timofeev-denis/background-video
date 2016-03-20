/*
document.addEventListener("DOMContentLoaded", function(event) { 
	console.log( "DOMContentLoaded" );
});
*/

var Video = function(name, formats, poster) {
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

var BackgroundVideo = function (container) {
	this.video = document.createElement("video");
	this.video.setAttribute("id", "BackgroundVideoContainer");
	this.video.className = "flexible";
	this.video.autoplay = false;
	this.video.loop = false;
	//this.video.setAttribute('poster', name + ".jpg");
	this.playlist = new Array();
	this.currentItem = -1;
	this.addToDOM(container);
	console.log( "BackgroundVideo constructor" );
};

BackgroundVideo.prototype.addToDOM = function(container) {
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
}

BackgroundVideo.prototype.playNextItem = function() {
	var video = this.playlist[0];
	console.log( video );
}

BackgroundVideo.prototype.addVideo = function(name, formats, poster) {
	if( name === undefined || formats === undefined ) {
		return;
	}

	this.playlist[this.playlist.length] = new Video(name, formats, poster);
	
	console.log( this.playlist.length );
	
	/*
	for(i = 0; i < formats.length; i++) {
		var source = document.createElement('source');
		source.src = name + "." + formats[i];
		source.type = "video/" + formats[i];
		this.video.appendChild(source);
	}
	*/
	//this.playlist[this.playlist.length] = video;
	if(this.playlist.length == 1) {
		this.playNextItem();
	}
}

var bgv = new BackgroundVideo("myId");
//document.getElementById("BackgroundVideoContainer").addEventListener('ended', bgv.playNextItem, false);

bgv.addVideo( "video/Hello-World", [ "webm", "mp4", "ogv" ] );
//bgv.addVideo( "video/OneBigCircle-HD.mp4", [ "mp4" ] );
