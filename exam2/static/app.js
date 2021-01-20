(function () {
  const apiURL = 'http://localhost:3000/api';
  const userList = document.getElementById('user-list');
  const userDetail = document.getElementById('user-detail');

  const loadingLi = document.createElement('li');
  loadingLi.innerText = 'Loading...';

  const loadUsers = () => {
    return fetch(`${apiURL}/users`);
  }
  const loadUserPosts = (id) => {
    return fetch(`${apiURL}/posts/${id}`);
  }

  const loadAndRenderUsers = () => {
    userList.innerHTML = '';
    userList.appendChild(loadingLi);

    loadUsers()
      .then(data => data.json())
      .then(data => {
        userList.innerHTML = '';

        data.forEach(user => {
          const userEl = document.createElement('div');
          userEl.innerHTML = user.name;
          userEl.setAttribute("data-id", user.id);
          userEl.addEventListener("click", userListClickHandler);

          userList.appendChild(userEl);
        });
      });
  }


  const loadAndRenderUserDetails = (userId) => {
    userDetail.innerHTML = '';
    userDetail.appendChild(loadingLi);

    loadUserPosts(userId)
      .then(data => data.json())
      .then(data => {
        userDetail.innerHTML = '';

        const postsEl = document.createElement('div');
        postsEl.innerHTML = data.body;

        userDetail.appendChild(postsEl);
      });
  }

  function userListClickHandler(event) {
    console.log(event.target);
    loadAndRenderUserDetails(event.target.getAttribute("data-id"));
  }

  function init() {
    loadAndRenderUsers();
  }

  init();
}());
