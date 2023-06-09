// Variables
const POSTS_URL = "https://gorest.co.in/public/v2/posts";
const COMMENTS_URL = "https://gorest.co.in/public/v2/comments";
const postsContainer = document.querySelector(".posts-container");
const userName = document.querySelector(".current-user-name");
const userCommentsContainer = document.querySelector(`.comments-container`);

async function getSinglePost() {
  try {
    const userId = getUserIdFromUrl();
    const postId = getPostIdFromUrl();
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
    postsList.forEach((post) => {
      const { title, body } = post;
      if (post.user_id === user.id && post.id === +postId) {
        addPost(title, body);
        commentsList.forEach((comment) => {
          const { body, name } = comment;
          if (comment.post_id === +postId) {
            addComments(body, name);
          }
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

function getPostIdFromUrl() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let searchParams = new URLSearchParams(url.search);
  return searchParams.get("post_id");
}

function getUserIdFromUrl() {
  let urlString = window.location.href;
  let url = new URL(urlString);
  let searchParams = new URLSearchParams(url.search);
  return searchParams.get("user_id");
}

async function addPost(title, body) {
  // Create posts header
  const all = document.querySelector(".all-posts");
  all.textContent = "Post";
  // Add header title
  const postTitle = document.createElement("h3");
  postTitle.classList.add("text-xl", "font-bold", "mb-2", "current-title");
  postTitle.textContent = "Post Title";
  // Add post title
  const currentPostTitle = document.createElement("h3");
  currentPostTitle.classList.add(
    "text-gray-700",
    "mb-4",
    "current-user-post-title"
  );
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

function addComments(body, name) {
  // Add comments container
  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add(
    "comments",
    "p-4",
    "my-4",
    "rounded-md",
    "shadow-md",
    "single-comment"
  );
  // Add comments container title
  const commentsTitle = document.createElement("h3");
  commentsTitle.classList.add("text-xl", "font-bold", "mb-2");
  commentsTitle.textContent = "Comments";
  // Add a single comment container
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment", "border-b-2", "pb-2", "mb-2");
  // Add comment username
  const commentName = document.createElement("p");
  commentName.classList.add("text-gray-700");
  commentName.textContent = `User: ${name}`;
  // Add comment text
  const commentText = document.createElement("p");
  commentText.classList.add("text-gray-700");
  commentText.textContent = `${body}`;
  // Add elements to the comments container
  commentContainer.appendChild(commentName);
  commentContainer.appendChild(commentText);
  commentsContainer.appendChild(commentsTitle);
  commentsContainer.appendChild(commentContainer);
  userCommentsContainer.appendChild(commentsContainer);
  // Return comments container
  return commentsContainer;
}

document.addEventListener("DOMContentLoaded", () => {
  getSinglePost()
    .then(() => {
      console.log("Promise returned getSinglePost worked successfully");
    })
    .catch((error) => {
      console.error("Promise did not work successfully", error);
    });
});
