var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     var clickHandler = function() {
     // clickHandler logic
     };
     
     var onHover = function(event) {
     // Placeholder for function logic
     };
     var offHover = function(event) {
         // Placeholder for function logic
     };
     
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
     
 };

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var setCurrentAlbum = function(album) {
     currentAlbum = album;
    
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');


     // assign values to each part of the album (text, images )
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // Clear contents of album song list container
    $albumSongList.empty();
 
     // build list of songs from album js object
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var clickHandler = function(targetElement) {
     var songItem = getSongItem(targetElement);
     
      if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
     
 };


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
});
     
     var albums = [albumPicasso, albumMarconi, albumMusk];
     var index = 1;
     albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(album[index]);
        index++;
        if (index == albums.length) {
            index = 0;
            }
        });
 };



//whole section missing from lesson 32 can't find location of code in previous lessons
var updatePlayerBarSong = function() {
    //more code spose to be here? WTF
     $('.main-controls .play-pause').html(playerBarPauseButton);
 };

//whole section missing from lesson 32 can't find location of code in previous lessons WTF!!!
         if (currentlyPlayingSongNumber !== songNumber) {
             $(this).html(pauseButtonTemplate);
             currentlyPlayingSongNumber = songNumber;
             currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
             updatePlayerBarSong();
         } else if (currentlyPlayingSongNumber === songNumber) {
             $(this).html(playButtonTemplate);
             $('.main-controls .play-pause').html(playerBarPlayButton);
             currentlyPlayingSongNumber = null;
             currentSongFromAlbum = null;
         }

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        
        if (currentParent) {
            while (currentParent.className && currentParent.className != targetClass) {
                currentParent = currentParent.parentElement;
            }
        if (currentParent.className === targetClass) {
            return currentParent;
        } else {
            alert("No parent with class name found");
        } else {
            alert("No parent found");
        }
    };
      

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};