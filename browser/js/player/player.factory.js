'use strict';
//refactor to remove 'this.' properties and set as variables
//only the functions here need to access that data
//so data doesn't need to be in exported object

juke.factory('PlayerFactory', function ($http, $rootScope) {
    var audio = document.createElement('audio');
    var playerObj= {
        progress: 0,
        playing: false,
        currentSong: null,
        currSongList: [],
        start: function (song, songList){
            // audio.addEventListener('ended', function () {
            //     this.next();
            // });
            this.pause();
            this.playing = true;
            if (songList) {
              this.currSongList = songList;
            }
            // resume current song
            if (song === this.currentSong) return audio.play();
            // enable loading new song
            this.currentSong = song;
            audio.src = song.audioUrl;
            audio.load();
            audio.play();

        },

        pause: function () {
            audio.pause();
            this.playing = false;
        },
        resume: function () {
            audio.play();
            this.playing = true;
        },
        isPlaying: function () {
            return this.playing;
        },
        getCurrentSong: function () {
            return this.currentSong;
        },
        next: function () {
          skip(1);
        },
        previous: function () {
          skip(-1);
        },
        getProgress: function (){
            return playerObj.progress ;
        }
    };
    // a "true" modulo that wraps negative to the top of the range
    function mod (num, m) {
      return ((num % m) + m) % m;
    }
    // jump `interval` spots in album (negative to go back, default +1)
    function skip (interval) {
        if (!playerObj.currentSong) return;
        // return $http.get('/api/albums/' + playerObj.currentSong.albumId)
        // .then(function (currentAlbum) {
        var index;
        playerObj.currSongList.forEach(function (song, i) {
          if (song.audioUrl === playerObj.currentSong.audioUrl) {
            index = i;
          }
        });
        index = mod((index + (interval || 1)), playerObj.currSongList.length );
        playerObj.currentSong = playerObj.currSongList[index];
        if (playerObj.playing) {
            playerObj.start(playerObj.currentSong, playerObj.currSongList);
        }
          // $rootScope.$broadcast('play', $scope.currentSong);
        // })
        // .catch(console.error.bind(console));
    }
    audio.addEventListener('ended', function () {
        playerObj.next();
        $rootScope.$evalAsync();
    });

    audio.addEventListener('timeupdate', function () {
        playerObj.progress = audio.currentTime / audio.duration;
        $rootScope.$evalAsync();
    });
    return playerObj;

});

// play: function (event, song){
        //     // stop existing audio (e.g. other song) in any case
        //     this.pause();
        //     this.playing = true;
        //     // resume current song
        //     if (song === this.currentSong) return audio.play();
        //     // enable loading new song
        //     this.currentSong = song;
        //     audio.src = song.audioUrl;
        //     audio.load();
        //     audio.play();
        // },
