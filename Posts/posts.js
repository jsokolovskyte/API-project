import {firstLetterUpperCase} from '../function.js';
import headerView from '../header.js';

headerView()

let postsWrapper = document.querySelector('#posts-wrapper');


function init () { 

let urlParams = document.location.search;
let searchParams = new URLSearchParams(urlParams);
let limit = searchParams.get('limit') ? searchParams.get('limit') : 10;
let page = searchParams.get('page') ? searchParams.get('page') : 1;

fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
  .then(res => res.json())
  .then(posts => {
    renderPaginationLinks({limit, page});

    posts.map(post => {


        let img = document.createElement("img")
        img.src = `https://api.lorem.space/image/book?w=150&h=220&${post.id}`

      fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
        .then(res => res.json())
        .then(user => { 

        let postAuthor = document.createElement('span'); 
        postAuthor.classList.add('post-author');
        postAuthor.innerHTML = `<strong>Author:</strong> <a href="../Users/oneuser.html?user_id=${user.id}">${user.name}</a><br>`
     
        let updatedTitle = firstLetterUpperCase(post.title)
        let updatedBody = firstLetterUpperCase(post.body)

        let postItem = document.createElement('div');
        postItem.classList.add('post-item');

        let postTitle = document.createElement('h2');
        postTitle.classList.add('post-title');
        postTitle.innerHTML = `${updatedTitle}`;


      let postBody = document.createElement('p');
      postBody.classList.add('post-content');
      postBody.innerHTML = `${updatedBody}`;

      let editPost = document.createElement("a")
      editPost.classList.add("edit-post")
      editPost.textContent = `edit post`
      editPost.href = './edit-post.html?post_id='

      let commentButton= document.createElement("button")
      commentButton.classList.add("comment-button")
      commentButton.innerHTML = `<strong>Comments (5)</strong>`

      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(comments =>{
        
        comments.map(comment =>{ 

            let hiddenData = true
            let commentDiv = document.createElement("div")
            let commentValue = document.createElement("ul")

            commentButton.addEventListener("click", () => {
                if(hiddenData){

                    let commentedBy = document.createElement("p")
                    commentValue.classList.add('comment-value')
                    commentedBy.classList.add('commented-by')
                    commentValue.innerHTML = `<div class="comments-wrap"><h3>${comment.name}</h3> <p>${comment.body}</p><br>Commented by: <a href="mailto:${comment.email}">${comment.email}</a> </div>`
    
                    commentDiv.append(commentValue)
                    commentDiv.style.display = "block"
                    postItem.append(commentDiv)
                } else{
                    commentDiv.style.display = "none"
                }
               hiddenData = !hiddenData
              })
            }) 
          })
          postsWrapper.append(postItem);
          postItem.append(img, postTitle, postAuthor, postBody, commentButton, editPost);
        });
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
      firstPaginationPageItem.href = `./posts.html?page=1&limit=${limit}`;
      firstPaginationPageItem.textContent = 'First';

      let previousPaginationPageItem = document.createElement('a');
      previousPaginationPageItem.classList.add("text-pagination")
      previousPaginationPageItem.href = `./posts.html?page=${currentPage - 1}&limit=${limit}`;
      previousPaginationPageItem.textContent = 'Prev';
      
      paginationWrapper.append(firstPaginationPageItem, previousPaginationPageItem);
    }

  for (let i = 1; i <= pages; i++) {
    let paginationLink = document.createElement('a');
    paginationLink.classList.add("pagination-link")
    paginationLink.href = `./posts.html?page=${i}&limit=${limit}`;
    paginationLink.textContent = i;
    paginationWrapper.append(paginationLink);
  }

  if (currentPage !== pages) {
      let lastPaginationPageItem = document.createElement('a');
      lastPaginationPageItem.classList.add("text-pagination")
      lastPaginationPageItem.href = `./posts.html?page=${pages}&limit=${limit}`;
      lastPaginationPageItem.textContent = 'Last';

      let nextPaginationPageItem = document.createElement('a');
      nextPaginationPageItem.classList.add("text-pagination")
      nextPaginationPageItem.href = `./posts.html?page=${currentPage + 1}&limit=${limit}`;
      nextPaginationPageItem.textContent = 'Next';
      
      paginationWrapper.append(nextPaginationPageItem, lastPaginationPageItem);
    }

  postsWrapper.after(paginationWrapper);
}
init();