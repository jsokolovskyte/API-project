function headerView(){

    let navigationItems = [
        {
          title: 'Home',
          path: 'Home/index.html',
        },
        {
          title: 'Users',
          path: 'Users/user.html',
        },
        {
          title: 'Albums',
          path: 'Albums/album.html',
        },
        {
          title: 'Posts',
          path: 'Posts/posts.html',
        },
        {
          title: 'Create',
          path: 'Posts/createPost.html',
        }
      ];
      
      let pathname = document.location.pathname;
      
      let header = document.createElement('header');
      let nav = document.createElement('nav');
    
      let headerName = document.createElement("p")
      headerName.textContent = "JSONPlaceholder"
      
      
      let navList = document.createElement('ul');
      
      navigationItems.map(navItem => {
        let navItemElement = document.createElement('li');
        let navItemLink = document.createElement('a');
        navItemLink.textContent = navItem.title;
        navItemLink.setAttribute('href', `/${navItem.path}`);
      
        if (pathname.includes(navItem.path)) {
          navItemLink.classList.add('active');
        }
      
        navItemElement.append(navItemLink);
        navList.append(navItemElement);
        navList.prepend(headerName)
      })
      
      nav.append(navList);
      
      header.append(nav);
      
      if (!pathname.includes('search.html')) {
        let searchForm = document.createElement('form');
        searchForm.classList.add("search-form")
        searchForm.setAttribute('action', '/search/search.html');
      
        let searchInput = document.createElement('input');
        searchInput.classList.add("search-input")
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('name', 'search-input');
      
        let searchSubmit = document.createElement('input');
        searchSubmit.classList.add("search-submit")
        searchSubmit.setAttribute('type', 'submit');
        searchSubmit.value = 'Search';
      
        searchForm.append(searchInput, searchSubmit);
      
        header.append(searchForm);
      }
      
      document.body.prepend(header);
}
export default headerView