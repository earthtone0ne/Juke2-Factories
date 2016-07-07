juke.controller('AllAlbumsCtrl', function ($scope, $http, $rootScope, $log, AlbumFactory) {
    AlbumFactory.fetchAll()
    .then(function (albums) {
      $scope.albums = albums;
      return AlbumFactory.fetchById(albums);
    })
    .then(function (album) {
      $scope.songs = album.songs;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
});
