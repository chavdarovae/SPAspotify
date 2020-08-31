const songService = (() => {

  function createSong(title, artist, imageURL) {
    return backendless.post('data', 'songs', 'backendless', {
      title,
      artist,
      imageURL,
      likes: 0,
      listened: 0
    })
  }

  function getAllSongs() {
    return backendless.get('data', 'songs', 'backendless');
  }

  function getMySongs() {
    return backendless.get('data', `songs?query={"_acl.creator":"${sessionStorage.getItem('creator')}"}`, 'backendless');
  }

  function removeSong(id) {
    return backendless.remove('data', `songs/${id}`, 'backendless');
  }

  function getCurrSong(id) {
    return backendless.get('data', `songs/${id}`, 'backendless');
  }

  function updateSong(id, data) {
    return backendless.update('data', `songs/${id}`, 'backendless', data);
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