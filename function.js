export function renderListElement(data) {
  let itemElement = document.createElement('li');

  if (data.class) {
    itemElement.classList.add(data.class);
  }
  
  itemElement.innerHTML = `<a href="${data.href}">${firstLetterUpperCase(data.content)}</a>`;
  data.parentElement.append(itemElement);
}

export function renderOptionElement(data) {
  let optionElement = document.createElement('option');
  optionElement.textContent = data.content;
  optionElement.value = data.value;

  data.parentElement.append(optionElement);
}

export function renderAllUsers(user, userWrapper){
  let img = document.createElement("img")
        img.src = `https://api.lorem.space/image/face?w=150&h=150&${user.id}`

        let userItem = document.createElement("div")
        userItem.classList.add("user-item")
        let userName = document.createElement("p")
        userName.classList.add("user-name")
        userName.innerHTML = `<a href="../Users/oneuser.html?user_id=${user.id}"><h2> ${user.name} - ${user.username}<h2></a>`

        let userEmail = document.createElement("p")
        userEmail.innerHTML = `<strong>Email</strong>: <a href="mailto:${user.email}">${user.email}</a>`

        let userGeoAddress = [`${user.address.geo.lat} + ${user.address.geo.lng}`]

        let userAddress = document.createElement("div")
        userAddress.classList.add("user-address")
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
                        readMore.innerHTML = `<a href="../Posts/post.html?post_id=${post.id}">Read More</a>`
    
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
                            userAlbum.innerHTML = `<li><a href="../Albums/onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a></li>`
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
    }
  
  export function firstLetterUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
  }