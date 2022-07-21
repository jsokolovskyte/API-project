import {renderAllUsers, firstLetterUpperCase} from '../function.js';

import headerView from '../header.js';

headerView()
    
    let postsWrapper = document.querySelector('#posts-wrapper');
    let albumWrapper = document.querySelector('#album-wrapper')

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3&_start=16')
    .then(res => res.json())
    .then(posts => {
        posts.map(post => {

            let img = document.createElement("img")
            img.src = `https://source.unsplash.com/collection/928423/480x480&${post.id}`

        fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
            .then(res => res.json())
            .then(user => { 

            let postAuthor = document.createElement('span');
            postAuthor.classList.add('post-author');
            postAuthor.innerHTML = `<strong>Author:</strong> <a href="/Users/oneuser.html?user_id=${user.id}">${user.name}</a><br>`
    
            let updatedTitle = firstLetterUpperCase(post.title);
            let updatedBody = firstLetterUpperCase(post.body)

            let postItem = document.createElement('div');
            postItem.classList.add('post-item');

            let postTitle = document.createElement('h2');
            postTitle.classList.add('post-title');
            postTitle.innerHTML = `${updatedTitle}`;

        let postBody = document.createElement('p');
        postBody.classList.add('post-content');
        postBody.innerHTML = `${updatedBody}`;

        let postHeader = document.createElement("h1")
        postHeader.innerHTML = "Available posts:<br>"
            
                postItem.append(img, postTitle, postAuthor, postBody);
                postsWrapper.append(postItem);
        });
    })
    })

let userWrapper = document.querySelector('#user-wrapper')

fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
.then(res => res.json())
.then(users => {
    
    users.map(user => {

renderAllUsers(user, userWrapper)
    })
})

    let queryParams = document.location.search;
    let urlParams = new URLSearchParams(queryParams);
    let albumId = urlParams.get('album_id');

    fetch("https://jsonplaceholder.typicode.com/albums?_limit=3")
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
                        fetch("https://jsonplaceholder.typicode.com/photos")
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