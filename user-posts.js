const postsContainer = document.querySelector(".post-container");
const currentUserPosts = document.querySelector(".current-user-post-title");
const userName = document.querySelector(".current-user-name");
const POSTS_URL = "https://gorest.co.in/public/v2/posts";

function getUserPosts() {
  const userId = getUserIdFromUrl();
  return fetch(API_URL)
    .then((response) => response.json())
    .then((userPosts) => {
      fetch(POSTS_URL)
        .then((response) => response.json())
        .then((postList) => {
          postList.forEach((post) => {
            if (post.user_id == userId) {
              currentUserPosts.textContent = post.title;
            }
          });
        });
      const user = userPosts.find((user) => user.id == userId);
      if (user) {
        userName.textContent = user.name;
      } else {
        console.log("User not found");
      }
      return userPosts;
    })
    .catch((error) => {
      console.error("Ошибка при получении записей пользователя", error);
    });
}

function getUserIdFromUrl() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let searchParams = new URLSearchParams(url.search);
  return searchParams.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
  getUserPosts();
});
