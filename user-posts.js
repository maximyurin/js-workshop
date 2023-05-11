// Variables
const POSTS_URL = "https://gorest.co.in/public/v2/posts";
const COMMENTS_URL = "https://gorest.co.in/public/v2/comments";
const postsContainer = document.querySelector(".posts-container");
const userName = document.querySelector(".current-user-name");
const userCommentsContainer = document.querySelector(`.comments-container`);

async function getUserPosts() {
  try {
    const userId = getUserIdFromUrl();
    const [usersData, postsData, commentsData] = await Promise.all([
      fetch(`${API_URL}`),
      fetch(`${POSTS_URL}`),
      fetch(`${COMMENTS_URL}`),
    ]);
    const [usersList, postsList, commentsList] = await Promise.all([
      usersData.json(),
      postsData.json(),
      commentsData.json(),
    ]);
    const user = usersList.find((user) => user.id === +userId);
    if (user) {
      userName.textContent = user.name;
    } else {
      console.log("User not found");
    }
    let hasPosts = false;
    postsList.forEach((post) => {
      const { title, body, id } = post;
      if (post.user_id === user.id) {
        addPost(title, body, id);
        hasPosts = true;
      }
    });
    if (!hasPosts) {
      const noPostsMessage = document.createElement("р2");
      noPostsMessage.classList.add(
        "text-center",
        "text-xl",
        "font-bold",
        "no-posts"
      );
      noPostsMessage.textContent = "This user has no posts.";
      postsContainer.appendChild(noPostsMessage);
    }
  } catch (error) {
    throw new Error(error);
  }
}

function getUserIdFromUrl() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let searchParams = new URLSearchParams(url.search);
  return searchParams.get("id");
}

async function addPost(title, body, id) {
  // Create posts header
  const all = document.querySelector(".all-posts");
  all.textContent = "Posts";
  // Add header title
  const postTitle = document.createElement("h3");
  postTitle.classList.add("text-xl", "font-bold", "mb-2", "current-title");
  postTitle.textContent = "Post Title";
  // Add post title
  const currentPostTitle = document.createElement("a");
  currentPostTitle.classList.add(
    "text-gray-700",
    "mb-4",
    "current-user-post-title"
  );
  currentPostTitle.href = `user-single-post.html?user_id=${getUserIdFromUrl()}&post_id=${id}`;
  currentPostTitle.textContent = title;
  // Add post header title
  const postContentTitle = document.createElement("h3");
  postContentTitle.classList.add(
    "text-xl",
    "font-bold",
    "mb-2",
    "current-title"
  );
  postContentTitle.textContent = "Post Content";
  // Create post content
  const postContentParagraph = document.createElement("p");
  postContentParagraph.classList.add(
    "text-gray-700",
    "mb-4",
    "current-user-post-content"
  );
  postContentParagraph.textContent = body;
  // Add elements to the post container
  postsContainer.appendChild(postTitle);
  postsContainer.appendChild(currentPostTitle);
  postsContainer.appendChild(postContentTitle);
  postsContainer.appendChild(postContentParagraph);
  // Return post container
  return postsContainer;
}

document.addEventListener("DOMContentLoaded", () => {
  getUserPosts()
    .then(() => {
      console.log("Promise returned getUserPosts worked successfully");
    })
    .catch((error) => {
      console.error("Promise did not work successfully", error);
    });
});
