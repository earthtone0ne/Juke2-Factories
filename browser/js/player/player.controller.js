'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)

  // $scope.$evalAsync();

  // state
  // $scope.currentSong;
  // $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.playing) $rootScope.$broadcast('pause');
    else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Album or toggle)
  $scope.$on('pause', PlayerFactory.pause);
  $scope.$on('play', PlayerFactory.play);

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
