import { getUserById } from "./createPostController.js";

export default async function createPost(createdPost, formElement) {
  let { body, title, id, userId } = createdPost;

  let MainWrap = document.createElement("div")
  MainWrap.classList.add("main-wrap")

  let createdPostWrapper = document.createElement('div');
  createdPostWrapper.classList.add('post-wrapper');

  let postTitleElement = document.createElement('h2');
  postTitleElement.classList.add("created-post-title")
  postTitleElement.innerHTML = `${title} <span>(id: ${id})</span>`;

  let postAuthor = await getUserById(userId);

  let postAuthorElement = document.createElement('span');
  postAuthorElement.classList.add("created-post-author")
  postAuthorElement.innerHTML = `<strong>Post author:</strong> <a href="../Users/oneuser.html?user_id=${userId}">${postAuthor.name}</a>`

  let postContentElement = document.createElement('p');
  postContentElement.classList.add("created-post-body")
  postContentElement.textContent = body;

  MainWrap.append(createdPostWrapper)
  createdPostWrapper.append(postTitleElement, postAuthorElement, postContentElement);

  formElement.after(MainWrap);
}
