//   3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
//   3.1. Pilnas vardas.
//   3.2. Vartotojo vardas / nick'as.
//   3.3. El. paštas.
//   3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
//   3.5. Telefono numeris.
//   3.6. Internetinio puslapio adresas.
//   3.7. Įmonės, kurioje dirba, pavadinimas. 

let userWrapper = document.querySelector('#user-wrapper')

fetch('https://jsonplaceholder.typicode.com/users')
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

// 4. Šiame puslapyje turės būti atvaizduojama:
// 4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
// 4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
// 4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.


        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            posts.map(post => {
                let hiddenData = true
                let userDiv = document.createElement("div")
                userPostButton.addEventListener("click", () =>{

                    if (user.id == post.userId && hiddenData){

                        let userPost = document.createElement("p")
                        userPost.classList.add("user-post")
                        userPost.innerHTML = `<strong>${post.title}</strong>`

                        let readMore = document.createElement("span")
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

                    userAlbumtButton.addEventListener("click", () =>{
                        if (user.id == album.userId && hiddenData){

                            let userAlbum = document.createElement("ul")
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
            // let hiddenData = true
            // let albumItem = document.createElement('li');
    
            // albumsButton.addEventListener("click", () =>{
    
            //     if (hiddenData){
    
            //                     albumItem.classList.add('album-item');
                          
            //                     albumItem.innerHTML = `<a href="./onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;
                          
            //                     albumsList.prepend(albumItem);
            //                     albumsList.style.display = "block"
                                
            //     } else{
            //         albumsList.style.display = "none"
            //     } hiddenData = !hiddenData
        })
    })
})