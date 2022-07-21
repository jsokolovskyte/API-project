import {firstLetterUpperCase} from './function.js';
import headerView from './header.js';

headerView()

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');

let albumWrapper = document.querySelector("#album-wrapper")

fetch("https://jsonplaceholder.typicode.com/albums?")
.then(res => res.json())
.then(albums =>{
    albums.map(album => {
        let albumItem = document.createElement("div")
        albumItem.classList.add("album-item")
        
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(users => {
            users.map(user =>{

                if (album.userId == user.id){
                    fetch("https://jsonplaceholder.typicode.com/photos?_limit=48&_start=9")
                    .then(res => res.json())
                    .then(photos => {
                        photos.map(photo => {

                            if(photo.id == album.id){

                                let albumImage = document.createElement("img")
                                albumImage.src = `https://picsum.photos/id/${photo.id}/200/300`
                                                
                                let albumAuthor = document.createElement("span")
                                albumAuthor.classList.add("album-author")
                                albumAuthor.innerHTML = `<br><a href="/Users/oneuser.html?user_id=${user.id}">Album was created by ${user.name}</a>`
            
                                let albumTitle = document.createElement("h2")

                                let updatedTitle = firstLetterUpperCase(album.title)

                                albumTitle.classList.add("album-title")
                                albumTitle.innerHTML = `<a href="/Albums/onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${updatedTitle}</a>`
        
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
