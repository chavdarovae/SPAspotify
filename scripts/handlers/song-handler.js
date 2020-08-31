handlers.getAllSongs = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');
  let currCreator = sessionStorage.getItem('creator');

  try {
    ctx.songs = await songService.getAllSongs();
    ctx.songs.forEach(song => {
      song.isCreatedByCurrUser = currCreator === song._acl.creator;
    });
    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      songCard: '../templates/songCard.hbs',
    }).then(function () {
      this.partial('../../templates/allSongs.hbs');
    }).catch(function (err) {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.getCreateSong = function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  ctx.loadPartials({
    header: '../templates/common/header.hbs',
    footer: '../templates/common/footer.hbs'
  }).then(function () {
    this.partial('../../templates/createSong.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.getMySongs = async function (ctx) {
  ctx.isAuth = userService.isAuth();
  ctx.username = sessionStorage.getItem('username');

  try {
    ctx.songs = await songService.getMySongs();
    ctx.songs.forEach(song => {
      song.isCreatedByCurrUser = true;
    });

    ctx.loadPartials({
      header: '../templates/common/header.hbs',
      footer: '../templates/common/footer.hbs',
      songCard: '../templates/songCard.hbs',
    }).then(function () {
      this.partial('../../templates/mySongs.hbs');
    }).catch(function (err) {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
}

handlers.createSong = function (ctx) {
  let title = ctx.params.title;
  if (title.length < 6) {
    notifications.showError('The title should be at least 6 characters long');
    return;
  }
  let artist = ctx.params.artist;
  if (artist.length < 3) {
    notifications.showError('The artist should be at least 3 characters long');
    return;
  }
  let imageURL = ctx.params.imageURL;
  if (!(imageURL.startsWith('http://') || imageURL.startsWith('https://'))) {
    notifications.showError('The image should start with "http://" or "https://"');
    return;
  }

  songService.createSong(title, artist, imageURL).then((res) => {
    notifications.showInfo('Song created successfully.');
    ctx.redirect('#/allSongs')
    $('#title').val('');
    $('#artist').val('');
    $('#imageURL').val('');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
}

handlers.removeSong = async function (ctx) {
  try {
    await songService.removeSong(ctx.params.id);
    notifications.showInfo('Song removed successfully!');
    ctx.redirect('#/allSongs')
  } catch (error) {
    console.log(error);
  }
}

handlers.likeSong = async function (ctx) {
  try {
    let currSong = await songService.getCurrSong(ctx.params.id);
    currSong.likes = Number(currSong.likes) + 1;

    await songService.updateSong(ctx.params.id, currSong);
    notifications.showInfo('Liked!');
    ctx.redirect('#/allSongs');
  } catch (error) {
    console.log(error);
  }
}

handlers.listenSong = async function (ctx, event) {
  try {
    let currSong = await songService.getCurrSong(ctx.params.id);
    currSong.listened = Number(currSong.listened) + 1;

    await songService.updateSong(ctx.params.id, currSong);
    notifications.showInfo(`You just listened ${currSong.title}`);

    let $currSection = $(`a[href="#/listen/${ctx.params.id}"]`).parent().parent().parent().parent();
    let hbsToReload = $currSection.attr('id');
    ctx.redirect(`#/${hbsToReload}`);
  } catch (error) {
    console.log(error);
  }
}