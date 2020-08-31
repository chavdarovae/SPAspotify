const songService = (() => {

  function createSong(title, artist, imageURL) {
    return kinvey.post('appdata', 'songs', 'kinvey', {
      title,
      artist,
      imageURL,
      likes: 0,
      listened: 0
    })
  }

  function getAllSongs() {
    return kinvey.get('appdata', 'songs?query={}&sort={"likes":-1}', 'kinvey');
  }

  function getMySongs() {
    return kinvey.get('appdata', `songs?query={"_acl.creator":"${sessionStorage.getItem('creator')}"}`, 'kinvey');
  }

  function removeSong(id) {
    return kinvey.remove('appdata', `songs/${id}`, 'kinvey');
  }

  function getCurrSong(id) {
    return kinvey.get('appdata', `songs/${id}`, 'kinvey');
  }

  function updateSong(id, data) {
    return kinvey.update('appdata', `songs/${id}`, 'kinvey', data);
  }

  return {
    createSong,
    getAllSongs,
    getMySongs,
    removeSong,
    getCurrSong,
    updateSong
  }
})()