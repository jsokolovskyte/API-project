let postsWrapper = document.querySelector('#posts-wrapper');
let albumWrapper = document.querySelector('#album-wrapper')

fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  .then(res => res.json())
  .then(posts => {
    posts.map(post => {

        let img = document.createElement("img")
        img.src = `https://c.tenor.com/UITUVRmPExYAAAAC/new-post-black-yallow.gif`

      fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
        .then(res => res.json())
        .then(user => { 

        let postAuthor = document.createElement('span'); //cia turi buti a
        postAuthor.classList.add('post-author');
        postAuthor.innerHTML = `<strong>Author:</strong> <a href="./oneuser.html?user_id=${user.id}">${user.name}</a><br>`
        // postAuthor.textContent = `Author: ${user.name}`
        // postAuthor.href = ''
        // postItem.append(postAuthor)
        //cia reikia uzdaryti fetcha

 
        let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);

        let postItem = document.createElement('div');
        postItem.classList.add('post-item');

        let postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.innerHTML = `${updatedTitle}`;

    //   let postAuthor = document.createElement('span');
    //   postAuthor.classList.add('post-author');
    //   postAuthor.innerHTML = `Author: <a href="#">${post.userId}</a>`;

      let postBody = document.createElement('p');
      postBody.classList.add('post-content');
      postBody.innerHTML = `${post.body}`;

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

        let img = document.createElement("img")
        img.src = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU`

        let userItem = document.createElement("div")
        userItem.classList.add("user-item")
        userItem.style.border = "1px solid black"
        userItem.style.padding = "10px"
        userItem.style.marginBottom = "10px"
        // console.log(user)
        let userName = document.createElement("p")
        userName.classList.add("user-name")
        userName.innerHTML = `<a href="./oneuser.html?user_id=${user.id}"><h1> ${user.name} - ${user.username}<h1></a>`

        let userEmail = document.createElement("p")
        userEmail.innerHTML = `<strong>Email</strong>: <a href="mailto:${user.email}">${user.email}</a>`

        let userGeoAddress = [`${user.address.geo.lat} + ${user.address.geo.lng}`]

        let userAddress = document.createElement("div")
        userAddress.innerHTML = `<strong>Adress:</strong> <a href = "https://maps.google.com/maps?q=${userGeoAddress}"> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode} </a>`
    
        let userPhone = document.createElement("p")
        userPhone.innerHTML = `<strong>Phone</strong>: <a href="tel:${user.phone}">${user.phone}</a>`

        let userWebsite = document.createElement("p")
        userWebsite.innerHTML = `<strong>Website</strong>: <a href="${user.website}" target="_blank">${user.website}</a>`

        let userCompany = document.createElement("p")
        userCompany.innerHTML = `<strong>Company name</strong>: ${user.company.name}`


        let userPostButton = document.createElement("button")
        userPostButton.classList.add("user-post-button")
        userPostButton.innerHTML = `${user.name} created posts:`


        let userAlbumtButton = document.createElement("button")
        userAlbumtButton.classList.add("user-album-button")
        userAlbumtButton.innerHTML = `See ${user.name} created albums:`

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            posts.map(post => {
                let hiddenData = true
                let userDiv = document.createElement("div")
                let userPost = document.createElement("p")
                let readMore = document.createElement("span")

                userPostButton.addEventListener("click", () =>{

                    if (user.id == post.userId && hiddenData){

                        userPost.classList.add("user-post")
                        userPost.innerHTML = `<strong>${post.title}</strong>`

                        readMore.classList.add("read-more")
                        readMore.innerHTML = `<a href="./post.html?post_id=${post.id}">Read More</a>`
    
                        userDiv.append(userPost, readMore)
                        userItem.append(userDiv)
                        userDiv.style.display = "block"

                    } else {
                        userDiv.style.display = "none"
                    } 
                    hiddenData = !hiddenData
                })
            })
            fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(albums =>{
                albums.map(album => {
                    let hiddenData = true
                    let albumDiv = document.createElement("div")
                    let userAlbum = document.createElement("ul")

                    userAlbumtButton.addEventListener("click", () =>{
                        if (user.id == album.userId && hiddenData){

                            userAlbum.classList.add("user-album")
                            userAlbum.innerHTML = `<li><a href="./onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a></li>`
                            albumDiv.append(userAlbum)
                            userItem.append(albumDiv)
                            albumDiv.style.display = "block"
                        } else{
                            albumDiv.style.display = "none"
                        } hiddenData = !hiddenData
                    })
                })
                userWrapper.append(userItem)
                userItem.append(img, userName, userEmail, userPhone,userWebsite, userCompany, userAddress, userPostButton, userAlbumtButton)
            })
        })
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
