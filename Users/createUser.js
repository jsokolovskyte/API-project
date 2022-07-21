import headerView from '../header.js';

async function init() {
  headerView();

  let res = await fetch('https://jsonplaceholder.typicode.com/users');
  let data = await res.json();


  let selectElement = document.querySelector('#post-title');

  data.map(item => {
    let optionElement = document.createElement('option');
    optionElement.textContent = item.name;
    optionElement.value = item.id;

    selectElement.append(optionElement);
  })

  let createPostForm = document.querySelector('#create-user-form');

  createPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target.elements.name.value;
    let username = event.target.elements.username.value;
    let email = event.target.elements.email.value;
    let street = event.target.elements.street.value;
    let suite = event.target.elements.suite.value;
    let city = event.target.elements.city.value;
    let zipcode = event.target.elements.zipcode.value;
    let phone = event.target.elements.phone.value;
    let website = event.target.elements.website.value;
    let company = event.target.elements.company.value;
    let latitude = event.target.elements.latitude.value;
    let longitude = event.target.elements.longitude.value;


    let newPost = {
      name,
      username,
      email,
      street,
      suite,
      city,
      zipcode,
      latitude,
      longitude,
      phone,
      website,
      company
    };

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(createdPost => {
        let { name, username, email, street, suite, city, zipcode, latitude, longitude, phone, website, company, id} = createdPost;
        console.log(createdPost);

        let createdPostWrapper = document.createElement('div');
        createdPostWrapper.classList.add('post-wrapper');

        let Username = document.createElement('h2');
        Username.innerHTML = `<a href="../Users/oneuser.html">${name} <span>(${username})(${id})</span></a>`;

        let userEmail = document.createElement('span');
        userEmail.innerHTML = `<strong>Email:</strong> <a href="mailto:">${email}</a>`

        let userAddress = document.createElement('p');
        userAddress.innerHTML = `<strong>Address:</strong> <a href = "https://maps.google.com/maps?q=${latitude} + ${longitude}"> ${street}, ${suite}, ${city}, ${zipcode}`;

        let userPhone = document.createElement('p');
        userPhone.innerHTML = `<strong>Phone:</strong> <a href="tel:">${phone}</a>`

        let userWebsite = document.createElement('p');
        userWebsite.innerHTML = `<strong>Website:</strong> <a href="#">${website}</a>`

        let userCompany = document.createElement('p');
        userCompany.innerHTML = `<strong>Company:</strong> ${company}`

        createdPostWrapper.append(Username, userEmail, userAddress, userPhone, userWebsite, userCompany);

        event.target.after(createdPostWrapper);
      });

    event.target.reset();
  })
}

init(); 