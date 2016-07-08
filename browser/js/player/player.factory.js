'use strict';

juke.factory('PlayerFactory', function ($http) {
    var playerObj= {
        audio: document.createElement('audio'),
        playing: false,
        currentSong: null,
        currSongList: null,
        start: function(song, songList){
            this.audio.addEventListener('ended', function () {
                this.next();
            });
            this.pause();
            this.playing = true;
            // resume current song
            if (song === this.currentSong) return this.audio.play();
            // enable loading new song
            this.currentSong = song;
            this.currSongList = songList;
            this.audio.src = song.audioUrl;
            this.audio.load();
            this.audio.play();

        },
        play: function (event, song){
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
        },
        pause: function () {
            this.audio.pause();
            this.playing = false;
        },
        resume: function () {},
        isPlaying: function () {},
        getCurrentSong: function () {},
        next: function () {
          skip(1);
        },
        prev: function () {
          skip(-1);
        },
        getProgress: function (){}
    };
    // a "true" modulo that wraps negative to the top of the range
    function mod (num, m) {
      return ((num % m) + m) % m;
    }
    // jump `interval` spots in album (negative to go back, default +1)
    function skip (interval) {
        // if (!playerObj.currentSong) return;
        // return $http.get('/api/albums/' + playerObj.currentSong.albumId)
        // .then(function (currentAlbum) {
        var index = playerObj.currentSong.albumIndex;
        index = mod((index + (interval || 1)), playerObj.currSongList.length );
        playerObj.currentSong = playerObj.currSongList;
        if (playerObj.playing) {
            playerObj.start(playerObj.currentSong,playerObj.currSongList);
        }
          // $rootScope.$broadcast('play', $scope.currentSong);
        // })
        // .catch(console.error.bind(console));
    }
    return playerObj;

});
