var http = new XMLHttpRequest();

function json(method, url, handler) {
  if(!http) return;
  http.open(method, url, true);
  http.onreadystatechange = function() {
    if (http.readyState != 4 /* complete */) return; 
    if (http.status != 200) return;
    console.log(http.responseText);
    handler(JSON.parse(http.responseText));
  }
  http.send();
}

function flickrAlbum(album, eachPhoto) {
  json('GET', 'https://api.flickr.com/services/rest/?'+
              '&method=flickr.photosets.getList' +
              '&api_key=0ee6f677d121f15e6430ef1495fa7a41' +
              '&user_id=125036351@N02' +
              '&format=json' +
              '&nojsoncallback=1', function(response) {
    for (var i = response.photosets.photoset.length; i-->0;) {
      var photoset = response.photosets.photoset[i];
      if(photoset.title._content != album) continue;
      console.log(album + ' was found');
      if(photoset.photos == 0) return;
      var id = photoset.id;
      var primary = photoset.primary;
      var secret= photoset.secret;
      var server = photoset.server;
      var farm = photoset.farm;
      json('GET', 'https://api.flickr.com/services/rest/?'+
              '&method=flickr.photosets.getPhotos' +
              '&api_key=0ee6f677d121f15e6430ef1495fa7a41' +
              '&photoset_id=' + photoset.id +
              '&format=json' +
              '&nojsoncallback=1', function(response) {
        for(var i = response.photoset.photo.length; i-->0;)
          if(!eachPhoto(response.photoset.photo[i])) return;
      });
    }
  });  
}

function flickrCover(album, handler) {
  flickrAlbum(album, function(photo) {
    if(photo.isprimary == 0) return true;
    handler(photo);
    return false;
  });
}

function flickrThumbCover(album) {
  flickrCover(album, function(photo) {
    var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
              + '/' + photo.id + '_' + photo.secret + '_n.jpg';
    var img = document.getElementById(album);
    if(!img) return;
    img.src = url;
  });
}

window.onload = function() {
}
