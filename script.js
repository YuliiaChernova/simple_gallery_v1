const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const ALBUM_CLASS = 'album-title';


const albumsContainer = document.getElementById('albums');
const photosContainer = document.getElementById('photos');

const albumTemplate = document.getElementById('album-template').innerHTML;
const photoTemplate = document.getElementById('photo-template').innerHTML;

let albumsList = [];
let photosList = [];

albumsContainer.addEventListener('click', onAlbumsClick);

init();

function init() {
    getData()
}

/*Work with data*/

function getData() {
    getAlbums()
        .then(() => renderAlbums(albumsList))
        .then(() => getPhotos(getAlbumId(albumsList[0])))
        .then((photosList) => renderPhotos(photosList))
}

function getAlbums() {
    return fetch(ALBUMS_URL)
        .then(resp => resp.json())
        .then(data => albumsList = data)
}

function getPhotos(albumId) {
    return fetch(PHOTOS_URL + albumId)
        .then(resp => resp.json())
        .then(data => photosList = data)
}

function getAlbumId(album) {
    return album.id;
}

/*Render*/

function renderAlbums(list) {
    albumsContainer.innerHTML = list.map(
        (album) => albumTemplate.replace('{{id}}', album.id).replace('{{title}}', album.title)).join('')
}

function renderPhotos(list) {
    photosContainer.innerHTML = list.map(
        (photo) => photoTemplate.replace('{{id}}', photo.id).replace('{{url}}', photo.thumbnailUrl)).join('')
}

/*Handle event*/

function onAlbumsClick(e) {
    if(e.target.classList.contains(ALBUM_CLASS)) {
        const albumId = e.target.dataset.albumId;
        getPhotos(albumId)
            .then((photosList) => renderPhotos(photosList))
    }

   
}