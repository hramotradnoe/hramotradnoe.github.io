var flickrPhotosets = null;
var flickrPhotos = new Array();

function flickrRequestPhotosets(photosetsHandler) {
  console.log('requesting photosets');  
  if(flickrPhotosets != null) {
    console.log('photosets was cached');  
    photosetsHandler(flickrPhotosets);
  } else {
    console.log('sending GET request for photosets');
    json('GET', 'https://api.flickr.com/services/rest/?'+
              '&method=flickr.photosets.getList' +
              '&api_key=0ee6f677d121f15e6430ef1495fa7a41' +
              '&user_id=125036351@N02' +
              '&format=json' +
              '&nojsoncallback=1', function(response) {
      console.log('photosets was received');
      flickrPhotosets = response.photosets.photoset;
      photosetsHandler(flickrPhotosets);
    });
  }
}

function flickrFindPhotoset(photosets, name) {
  console.log('finding ' + name);
  for (var i = photosets.length; i-->0;) {
    var photoset = photosets[i];
    if(photoset.title._content != name) continue;
    console.log(name + ' was found');
    if(photoset.photos == 0) return null;
    return photoset;
  }
  return null;
}

function flickrRequestPhotos(photoset, photosHandler) {
  var photosetId = photoset.id;
  console.log(photoset.title._content + ' - id ' + photoset.id);
  var cachedPhotos = flickrPhotos[photosetId];
  if(cachedPhotos != null) {
    console.log('found cached photos for ' + photoset.title._content + ' - ' + cachedPhotos.length);
    photosHandler(cachedPhotos);    
  } else {
    console.log('getting photos from ' + photoset.title._content);
    json('GET', 'https://api.flickr.com/services/rest/?'+
            '&method=flickr.photosets.getPhotos' +
            '&api_key=0ee6f677d121f15e6430ef1495fa7a41' +
            '&photoset_id=' + photoset.id +
            '&format=json' +
            '&nojsoncallback=1', function(response) {
      var photos = response.photoset.photo;
      flickrPhotos[photosetId] = photos;
      photosHandler(photos);
    });
  }
}

function flickrHandlePhotoset(name, handler) {
  flickrRequestPhotosets(function(photosets) {
    var photoset = flickrFindPhotoset(photosets, name);
    if(photoset == null) return;
    console.log('requesting photos from ' + name);
    flickrRequestPhotos(photoset, handler);
  });
}

var FlickrSize = {
  THUMBNAIL : '_n',
  FULLSIZE  : '_b'
};

function flickrPhotoUrl(photo, size) {
  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
              + '/' + photo.id + '_' + photo.secret + size + '.jpg'
}

function flickrPlacePhoto(id, photo, size) {
  var img = document.getElementById(id);
  if(!img) return;
  console.log('image ' + id + ' was found');
  img.src = flickrPhotoUrl(photo, size);
}


function flickrThumbCover(name) {
  console.log('generating thumb cover for ' + name);
  flickrHandlePhotoset(name, function(photos) {
    for (var i = photos.length; i-->0;) {
      var photo = photos[i];
      if(photo.isprimary == 0) continue;
      flickrPlacePhoto(name, photo, FlickrSize.THUMBNAIL);
    }
  });
}

function flickrGallery(name) {
  var thumbnails = document.getElementById('thumbnails');
  if(!thumbnails) return;
  var images = document.getElementById('images');
  if(!images) return;
  flickrHandlePhotoset(name, function(photos) {
    var n = photos.length;
    for(var i = 0; i != n; ++i) {
      var photo = photos[i];
      
      var thumbnail = new Image();
      var imageLink = document.createElement('a');
      imageLink.appendChild(thumbnail);
      imageLink.title = photo.title;
      imageLink.href = "#" + photo.title;
      thumbnails.appendChild(imageLink);
      thumbnail.src = flickrPhotoUrl(photo, FlickrSize.THUMBNAIL);
      
      var image = new Image();
      var nextOrCloseLink = document.createElement('a');
      nextOrCloseLink.appendChild(image);
      nextOrCloseLink.title = photo.title;
      nextOrCloseLink.href = "#_";
      nextOrCloseLink.id = photo.title;
      images.appendChild(nextOrCloseLink);
      image.src = flickrPhotoUrl(photo, FlickrSize.FULLSIZE);    
    }
  });
}
