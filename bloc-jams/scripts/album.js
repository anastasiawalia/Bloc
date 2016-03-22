var setSong = function (songNumber) {
    currentlyPlayingSong = parseInt(songNumber);
    currentlyPlayingSongNumber = currentAlbum.songs[songNumber - 1];
}

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number=]"' + number + '"]');
}

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
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

var togglePlayFromPlayerBar = function () {
    var $currentlyPlayingSongNumber) = getSongNumberCell(currentlyPlayingSongNumber);
    if (currentSoundFile.isPaused()) {
        $currentlyPlayingCell.html(pauseButtonTemplate);
        $(this).html(playerBarPlayButton);
        currentSoundFile.play();
    } else if (currentSoundFile) {
        $currentlyPlayingCell.html(playButtonTemplate);
        $(this).html(playerBarPlayButton)
        currentSoundFile.pause();
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
//var currentVolume = 80 NOT IN LESSONS IN VIDEO

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause')

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playPauseButton.click(togglePlayFromPlayerBar);
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
    $('.current-playing .song-name').text(currentSongFromAlbum.name);
    $('.current-playing .artist-name').text(currentAlbum.artist);
    $('.current-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
     
    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.lenght));
 };

//whole section missing from lesson 32 can't find location of code in previous lessons WTF!!!
         if (currentlyPlayingSongNumber !== songNumber) {
             $(this).html(pauseButtonTemplate);
             setSong(songNumber);
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

 var setSong = function(songNumber) {
          if (currentSoundFile) {
         currentSoundFile.stop();
     }
     currentlyPlayingSongNumber = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
     // #1
     currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });
     
     setVolume(currentVolume);
 };
       
 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };
        
 
//Lesson 33 - Could not find this instruction in code lessons!!! But it's in the examples to edit!        
 var previousSong = function() {
     //... missing something?
     setSong(currentSongIndex + 1);
     currentSoundFile.play();
     updatePlayerBarSong();
     //... missing something?
 };

 var nextSong = function() {
     //... missing something?
     setSong(currentSongIndex + 1);
     currentSoundFile.play();
     updatePlayerBarSong();
     //... missing something?
 };

var setTotalTimeInPlayerBar = function(totalTime) {
    var $totalTimeElement = $('.seek-control .total-time');
    $totalTimeElement.text(totalTime);
}
     
var filterTimeCode = function(timeInSeconds) {
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);
    var remainingSeconds = wholeSeconds % 60;
    
    var output = minutes + ':';
    
    if (remainingSeconds < 10) {
        output += '0';
    }
    
    output += remainingSeconds;
    
    return output;
};

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         currentSoundFile.bind('timeupdate', function(event) {
             var currentTime = this.getTime();
             var songLength = this.getDuration();
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(filterTimeCode(currentTime));
         });
     }
 };

 var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }
 
 var setCurrentTimeInPlayerBar = function (currentTime) {
     var $currentTimeElement = $('.seek-control .current-time');
     $currentTimeElement.text(currentTime);
 }
        
 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };
        
var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
 
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });
         // #7
     $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };