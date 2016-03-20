document.addEventListener("DOMContentLoaded", function(event) { 
	console.log( "DOMContentLoaded" );
	//var bgv = new BackgroundVideo();
});

var BackgroundVideo = function (container) {
	this.container = container;
	console.log( "BackgroundVideo constructor" );
};

BackgroundVideo.prototype.addVideo = function(name, formats) {
	if( name === undefined || formats === undefined ) {
		return;
	}

	video = document.createElement("video");
	video.className = "flexible";
	video.autoplay = true;
	video.loop = true;
	video.setAttribute('poster', name + ".jpg");
	
	for(i = 0; i < formats.length; i++) {
		var source = document.createElement('source');
		source.src = name + "." + formats[i];
		source.type = "video/" + formats[i];
		video.appendChild(source);
	}
	
	if(this.container === undefined) {
		document.body.appendChild(video);
	} else {
		var parent = document.getElementById(this.container);
		if( parent.firstChild == null ) {
			parent.appendChild(video);
		} else {
			parent.insertBefore(video, parent.firstChild);
		}
	}
}

var bgv = new BackgroundVideo("video");
bgv.addVideo( "video/Hello-World", [ "mp4", "webm", "ogv" ] );
