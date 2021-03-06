# background-video
### Add video background to your site

* Simple install
* Playlist support
* Transparent background caching
* Play video inside a container or fullscreen
* Pure Javascript. No 3rd party frameworks or libraries required

### Installation
- Download and unzip
- Add js and css files to your page: 
```
<script src="js/background-video.js"></script>   
<link type="text/css" href="css/background-video.css" rel="stylesheet" />
```
- Add script and list video files:
```
<script>
new BackgroundVideo({
     video: [
        {file: "video/myvideo.mp4"},
        {file: "video/party.webm"}
      ]
});
</script>
```
### Additional options
To play video in a container element, add `container` option and specify container id:
```
<script>
new BackgroundVideo({
    container: "myElement",
    video: [
        {file: "video/myvideo.mp4"}
    ]
});
</script>
```

To have same video in few different formats, add `formats` keyword after filename and list additional formats:
```
<script>
new BackgroundVideo({
    video: [
        {
            file: "video/myvideo.mp4",
            formats:  [ "mp4", "webm" ]
        }
    ]
});
</script>
```

To add overlay image, add `overlay` option and specify overlay image URL:
```
<script>
new BackgroundVideo({
    overlay: "img/dots1.png",
    video: [
        {file: "video/myvideo.mp4"}
    ]
});
</script>
```
