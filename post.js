let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get('post_id');

let postWrapper = document.querySelector("#post-wrapper")

fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(res => res.json())
  .then(post => {
    
    let img = document.createElement("img")
    img.src = `https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg`

    let updatedTitle = post.title[0].toUpperCase() + post.title.slice(1);
    let updatedBody = post.body[0].toUpperCase() + post.body.slice(1);

    let postItem = document.createElement("div")
    postItem.classList.add("post-item")

    postItem.innerHTML = `<div class=textWrap><h2><strong>${updatedTitle}</strong></h2> <p>${updatedBody}.</p></div>`

    postWrapper.append(postItem)
    postItem.prepend(img)

  })