import {renderAllUsers} from '../function.js';

import headerView from '../header.js';

headerView()

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

let userWrapper = document.querySelector('#user-wrapper')

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
  
    renderAllUsers(user, userWrapper)
  })