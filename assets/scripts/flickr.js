
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

var FlickrSize = {
  THUMBNAIL : '_m',
  FULLSIZE  : '_b'
};

function flickrUrl(photo, size) {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
              + '/' + photo.id + '_' + photo.secret + size + '.jpg'
}

function flickrThumbCover(album) {
  flickrAlbum(album, function(photo) {
    if(photo.isprimary == 0) return true;
    var img = document.getElementById(album);
    if(!img) return;
    img.src = flickrUrl(photo, FlickrSize.THUMBNAIL);
    return false;
  });
}

function flickrGallery(album) {
  var thumbnails = document.getElementById('thumbnails');
  if(!thumbnails) return;
  var images = document.getElementById('images');
  if(!images) return;
  flickrAlbum(album, function(photo) {
    
    var thumbnail = new Image();
    var imageLink = document.createElement('a');
    imageLink.appendChild(thumbnail);
    imageLink.title = photo.title;
    imageLink.href = "#" + photo.title;
    thumbnails.appendChild(imageLink);
    thumbnail.src = flickrUrl(photo, FlickrSize.THUMBNAIL);
    
    var image = new Image();
    var nextOrCloseLink = document.createElement('a');
    nextOrCloseLink.appendChild(image);
    nextOrCloseLink.title = photo.title;
    nextOrCloseLink.href = "#_";
    nextOrCloseLink.id = photo.title;
    images.appendChild(nextOrCloseLink);
    image.src = flickrUrl(photo, FlickrSize.FULLSIZE);
    
    return true;
  });
}
