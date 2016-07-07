juke.factory('AlbumFactory', function ($http) {
    return {
        fetchAll: function () {
          return $http.get('/api/albums/')
          .then(function (res) { return res.data; })
          .catch(console.error.bind(console));
        },

        fetchById: function (albums) {
             return $http.get('/api/albums/' + albums[0].id)
             .then(function (res) { return res.data; })
             .then(function (album) {
                album.imageUrl = '/api/albums/' + album.id + '/image';
                album.songs.forEach(function (song, i) {
                  song.audioUrl = '/api/songs/' + song.id + '/audio';
                  song.albumIndex = i;
                });
                return album;
            })
            .catch(console.error.bind(console));


        }
    };
});
