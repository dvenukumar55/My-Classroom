
const roleSelect = document.getElementById("roleSelect");
const loginForm = document.getElementById("loginForm");
const identifier = document.getElementById("identifier");
const passwordField = document.getElementById("password");

roleSelect.addEventListener("change", () => {

  if (roleSelect.value === "student") {

    loginForm.style.display = "block";
    identifier.placeholder = "Enter Roll Number";

    passwordField.style.display = "none";
    passwordField.removeAttribute("required");   // ⭐ FIX

  } 
  else if (roleSelect.value === "faculty") {

    loginForm.style.display = "block";
    identifier.placeholder = "Enter Email";

    passwordField.style.display = "block";
    passwordField.setAttribute("required", "true");  // ⭐ FIX

  } 
  else {

    loginForm.style.display = "none";

  }

});
// Login Submit
loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  let body;

  if (roleSelect.value === "student") {

    body = {
      rollNo: identifier.value.trim().toUpperCase()
    };

  } 
  else {

    const password = document.getElementById("password").value;

    body = {
      email: identifier.value.trim(),
      password: password
    };

  }

  const res = await fetch("https://my-classroom-backend.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (data.token) {

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    window.location.href = "index.html";

  } else {

    alert(data.msg);

  }

});

