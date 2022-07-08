let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

console.log(userId);

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
    let userInfo = document.querySelector('#user-info');

    let userGeoAddress = [`${user.address.geo.lat} + ${user.address.geo.lng}`]
    
    userInfo.innerHTML = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU">
    <h2>${user.name} (${user.username})</h2>
                          <ul>
                            <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
                            <li><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></li>
                            <li><strong>Address:</strong> <a href = "https://maps.google.com/maps?q=${userGeoAddress}">${user.address.street} ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                            <li><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></li>
                            <li><strong>Work:</strong> ${user.company.name}</li>
                          </ul>`

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  .then(res => res.json())
  .then(posts => {
    let postsWrapper = document.querySelector('#posts-wrapper');

    let postsButton = document.createElement('button');
    postsButton.classList.add('posts-button');
    postsButton.textContent = `User's posts:`;

    postsWrapper.append(postsButton)

    posts.map(post => {
        let hiddenData = true
        let postItem = document.createElement('div');

        postsButton.addEventListener("click", () =>{
            if (hiddenData){

                postItem.classList.add('post-item');
          
                postItem.innerHTML = `<h4>${post.title}</h4>
                                      <a href="./post.html?post_id=${post.id}">Read More</a>`;
          
                postsWrapper.append(postItem);
                postItem.style.display = "block"
            } else{
                postItem.style.display = "none"
            } hiddenData = !hiddenData
        })
    })
  })

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  .then(res => res.json())
  .then(albums => {
    let userAlbums = document.querySelector('#user-albums');

    let albumsButton = document.createElement('button');
    albumsButton.classList.add('posts-button');
    albumsButton.textContent = `User's albums:`;

    let albumsList = document.createElement('ul');
    albumsList.classList.add('albums-list');

    userAlbums.append(albumsButton, albumsList);

    albums.map(album => {
        let hiddenData = true
        let albumItem = document.createElement('li');

        albumsButton.addEventListener("click", () =>{

            if (hiddenData){

                            albumItem.classList.add('album-item');
                      
                            albumItem.innerHTML = `<a href="./onealbum.html?album_id=${album.id}&album_title=${album.title}&user_id=${album.userId}&user_name=${user.name}">${album.title}</a>`;
                      
                            albumsList.prepend(albumItem);
                            albumsList.style.display = "block"
                            
            } else{
                albumsList.style.display = "none"
            } hiddenData = !hiddenData
        })
    })
  })
})