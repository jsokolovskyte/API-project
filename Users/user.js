import {renderAllUsers} from '../function.js';

import headerView from '../header.js';

headerView()

let userWrapper = document.querySelector('#user-wrapper')

function init(){

fetch(`https://jsonplaceholder.typicode.com/users`)
.then(res => res.json())
.then(users => {
    users.map(user => {

renderAllUsers(user, userWrapper)
    })
})
}
init()