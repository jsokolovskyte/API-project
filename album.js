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
                    fetch("https://jsonplaceholder.typicode.com/photos")
                    .then(res => res.json())
                    .then(photos => {
                        photos.map(photo => {

                            if(photo.id == album.id){

                                let albumImage = document.createElement("img")
                                albumImage.src = photo.thumbnailUrl
                                                
                                albumAuthor = document.createElement("span")
                                albumAuthor.classList.add("album-author")
                                albumAuthor.innerHTML = `<br><a href="./oneuser.html?user_id=${user.id}">album was created by ${user.name}</a>`
            
                                let albumTitle = document.createElement("h2")
                                albumTitle.classList.add("album-title")
                                albumTitle.innerHTML = `<a href="./onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`
        
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
