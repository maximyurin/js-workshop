const API_URL = "https://gorest.co.in/public/v2/users";
const documentBody = document.body;

function createUsers(user) {
  // Create container
  const container = document.createElement("div");
  container.classList.add("container", "mx-auto", "p-4");

  // Create Title
  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "Blog Users";

  // Create Users Container
  const usersContainer = document.createElement("div");
  usersContainer.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-5",
    "gap-4",
    "users-container"
  );

  // Create Card
  const card = document.createElement("div");
  card.classList.add("card", "rounded-md", "shadow-md");

  // Create Header
  const header = document.createElement("div");
  header.classList.add("header", "p-4", "rounded-t-md");

  // Create User Name
  const userName = document.createElement("a");
  userName.classList.add("text-xl", "font-bold", "user-name");
  userName.href = "#";
  userName.textContent = "Chatura Nair";

  // Create Body
  const body = document.createElement("div");
  body.classList.add("body", "p-4");

  // Create User Email
  const userEmail = document.createElement("a");
  userEmail.classList.add("text-xl", "font-bold", "user-email");
  userEmail.href = "#";
  userEmail.textContent = "Email";

  // Append all elements
  container.appendChild(title);
  container.appendChild(usersContainer);
  usersContainer.appendChild(card);
  card.appendChild(header);
  card.appendChild(body);
  header.appendChild(userName);
  body.appendChild(userEmail);
  documentBody.appendChild(container);

  return container;
}

createUsers();
