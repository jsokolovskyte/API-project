import {firstLetterUpperCase} from './function.js';
import headerView from './header.js';

headerView()

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let postId = urlParams.get('post_id');

let postWrapper = document.querySelector("#post-wrapper")

fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
  .then(res => res.json())
  .then(post => {
    
    let img = document.createElement("img")
    img.src = `https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg`

    let updatedTitle = firstLetterUpperCase(post.title)
    let updatedBody = firstLetterUpperCase(post.body)

    let postItem = document.createElement("div")
    postItem.classList.add("post-item")

    postItem.innerHTML = `<div class=textWrap><h2><strong>${updatedTitle}</strong></h2> <p>${updatedBody}.</p></div>`

    postWrapper.append(postItem)
    postItem.prepend(img)

  })