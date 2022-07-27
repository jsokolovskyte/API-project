import {firstLetterUpperCase} from '../function.js';
import headerView from '../header.js';

headerView()

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');

let albumWrapper = document.querySelector("#album-wrapper")

function init(){

let urlParams = document.location.search;
let searchParams = new URLSearchParams(urlParams);
let limit = searchParams.get('limit') ? searchParams.get('limit') : 12;
let page = searchParams.get('page') ? searchParams.get('page') : 1;

fetch(`https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`)
.then(res => res.json())
.then(albums =>{
    renderPaginationLinks({limit, page});


    albums.map(album => {
        let albumItem = document.createElement("div")
        albumItem.classList.add("album-item")
        
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(users => {
            users.map(user =>{

                if (album.userId == user.id){
                    fetch("https://jsonplaceholder.typicode.com/photos")
                    .then(res => res.json())
                    .then(photos => {
                        photos.map(photo => {

                            if(photo.id == album.id){

                                let albumImage = document.createElement("img")
                                albumImage.src = `https://picsum.photos/id/${photo.id}/200/300`
                                                
                                let albumAuthor = document.createElement("span")
                                albumAuthor.classList.add("album-author")
                                albumAuthor.innerHTML = `<br><a href="../Users/oneuser.html?user_id=${user.id}">Album was created by ${user.name}</a>`
            
                                let albumTitle = document.createElement("h2")

                                let updatedTitle = firstLetterUpperCase(album.title)

                                albumTitle.classList.add("album-title")
                                albumTitle.innerHTML = `<a href="../Albums/onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${updatedTitle}</a>`
        
                                albumWrapper.append(albumItem)
                                albumItem.append(albumTitle,albumImage, albumAuthor)
                                
                            }
                        })
                    })
                }
            })
        })
    })
})
}
function renderPaginationLinks(data) {
    let total = 100;
    let limit = data.limit;
    let pages = Math.ceil(total / limit);
    let currentPage = Number(data.page);
  
    let paginationWrapper = document.createElement('div');
    paginationWrapper.classList.add('pagination-wrapper');

    if (currentPage !== 1) {
        let firstPaginationPageItem = document.createElement('a');
        firstPaginationPageItem.classList.add("text-pagination")
        firstPaginationPageItem.href = `./album.html?page=1&limit=${limit}`;
        firstPaginationPageItem.textContent = 'First';

        let previousPaginationPageItem = document.createElement('a');
        previousPaginationPageItem.classList.add("text-pagination")
        previousPaginationPageItem.href = `./album.html?page=${currentPage - 1}&limit=${limit}`;
        previousPaginationPageItem.textContent = 'Prev';
        
        paginationWrapper.append(firstPaginationPageItem, previousPaginationPageItem);
      }
  
    for (let i = 1; i <= pages; i++) {
      let paginationLink = document.createElement('a');
      paginationLink.classList.add("pagination-link")
      paginationLink.href = `./album.html?page=${i}&limit=${limit}`;
      paginationLink.textContent = i;
      paginationWrapper.append(paginationLink);
    }

    if (currentPage !== pages) {
        let lastPaginationPageItem = document.createElement('a');
        lastPaginationPageItem.classList.add("text-pagination")
        lastPaginationPageItem.href = `./album.html?page=${pages}&limit=${limit}`;
        lastPaginationPageItem.textContent = 'Last';

        let nextPaginationPageItem = document.createElement('a');
        nextPaginationPageItem.classList.add("text-pagination")
        nextPaginationPageItem.href = `./album.html?page=${currentPage + 1}&limit=${limit}`;
        nextPaginationPageItem.textContent = 'Next';
        
        paginationWrapper.append(nextPaginationPageItem, lastPaginationPageItem);
      }
  
    albumWrapper.after(paginationWrapper);
  }
init()
