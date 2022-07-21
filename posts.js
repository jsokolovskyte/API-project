let postsWrapper = document.querySelector('#posts-wrapper');

fetch('https://jsonplaceholder.typicode.com/posts')
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

      let commentButton= document.createElement("button")
      commentButton.classList.add("comment-button")
      commentButton.innerHTML = `<strong>Comments (5)</strong>`

//   2. Po kiekvienu įrašu (post) gali būti komentarų (sukurti variantus įrašui, kuris neturi komentarų, kuris turi vieną komentarą ir kuris turi daugiau nei vieną komentarą). Kiekvienas komentaras turi:
//   2.1. Komentaro pavadinimą.
//   2.2. Komentaro turinį - pastraipą.
//   2.3. Komentarą parašiusio asmens el. pašto adresą.
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(res => res.json())
      .then(comments =>{
        
        comments.map(comment =>{ 

            let hiddenData = true
            let commentDiv = document.createElement("div")
            commentButton.addEventListener("click", () => {

                if(hiddenData){
                    console.log("hi")

                    let commentValue = document.createElement("ul")
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
    postItem.append(img, postTitle, postAuthor, postBody, commentButton);
    postsWrapper.append(postItem);
    });
  })
})