'use strict';

juke.factory('PlayerFactory', function(){
    var playerObj= {
        audio: document.createElement('audio'),
        playing: false,
        currentSong: null,
        start: function(){
            this.audio.addEventListener('ended', function () {
                this.next();
            });
        },
        play: function(event, song){
            // stop existing audio (e.g. other song) in any case
            this.pause();
            this.playing = true;
            // resume current song
            if (song === this.currentSong) return this.audio.play();
            // enable loading new song
            this.currentSong = song;
            this.audio.src = song.audioUrl;
            this.audio.load();
            this.audio.play();
            console.log(song);
        },
        pause: function(){
            this.audio.pause();
            this.playing = false;
        },
        resume: function(){},
        isPlaying: function(){},
        getCurrentSong: function(){},
        next: function(){},
        prev: function(){},
        getProgress: function(){}
    };
    function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
    // function skip (interval) {
    //     if (!playerObj.currentSong) return;
    //     var index = playerObj.currentSong.albumIndex;
    //     index = mod( (index + (interval || 1)), playerObj.currentSong.album.songs.length );
    //     playerObj.currentSong = $scope.album.songs[index];
    //     if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
    // }
  return playerObj;

});
