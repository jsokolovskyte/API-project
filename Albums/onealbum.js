import {firstLetterUpperCase} from '../function.js';
import headerView from '../header.js';

headerView()

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');
let albumTitle = urlParams.get('album_title');
let userId = urlParams.get('user_id');
let userName = urlParams.get('user_name');

let updatedTitle = firstLetterUpperCase(albumTitle)

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then(res => res.json())
  .then(photos => {
    let albumWrapper = document.querySelector('#album-wrapper');

    if (photos.length > 0) {
      let albumTitleElement = document.createElement('h2');
      albumTitleElement.classList.add('album-title');
      albumTitleElement.textContent = `${updatedTitle}`;

      let albumAuthorElement = document.createElement('span');
      albumAuthorElement.classList.add('album-author');
      albumAuthorElement.innerHTML = `<strong>Album author:</strong> <a href="/Users/oneuser.html?user_id=${userId}">${userName}</a>`;

      let albumPhotos = document.createElement('div');
      albumPhotos.classList.add('album-photos');

      albumWrapper.append(albumTitleElement, albumAuthorElement, albumPhotos);

      photos.map(photo => {
        let imageElement = document.createElement('img');
        imageElement.src = `https://api.lorem.space/image?w=150&h=180&${photo.id}`
        imageElement.classList.add('album-image');
        imageElement.setAttribute('alt', photo.title);

        albumPhotos.prepend(imageElement);
      })
    } else {
      albumWrapper.innerHTML = `<h1>No albums :(</h1>
                                <p>Try <a href="./album.html">here</a></p>`;
    }
  })