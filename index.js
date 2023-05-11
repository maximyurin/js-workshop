// Variables
const API_URL = "https://gorest.co.in/public/v2/users";
const usersContainer = document.querySelector(".users-container");

function createUsers(user) {
  // Create Card
  const card = document.createElement("div");
  card.classList.add("card", "rounded-md", "shadow-md");
  // Create Header
  const header = document.createElement("div");
  header.classList.add("header", "rounded-t-md");
  // Create username
  const userName = document.createElement("a");
  userName.classList.add(
    "text-l",
    "font-bold",
    "user-name",
    "header",
    "rounded-t-md"
  );
  userName.href = `user-posts.html?id=${user.id}`;
  userName.textContent = `${user.name}`;
  // Append all elements
  card.appendChild(header);
  header.appendChild(userName);
  // Return card
  return card;
}

async function getUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Users not found");
    }
    const users = await response.json();
    users.forEach((user) => {
      const card = createUsers(user);
      if (usersContainer) {
        usersContainer.appendChild(card);
      }
    });
  } catch (error) {
    throw new Error("Error fetching users");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getUsers()
    .then(() => {
      console.log("Promise returned getUsers worked successfully");
    })
    .catch((error) => {
      console.error("Promise did not work successfully", error);
    });
});
