const BASE_URL_LOG_IN = "http://api.alikooshesh.ir:3000/api";
const backToOnboard = document.getElementById("backToOnboard");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const signIn = document.getElementById("sign-in");
// let dataAccessToken = "";
function validateInput(email, password) {
  if (!email || !password) {
    errorMessage.textContent = "Oh email or password cannot be empty";
    errorMessage.style.display = "block";
    return false;
  } else {
    errorMessage.style.display = "none";
    return true;
  }
}
// get user
async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL_LOG_IN}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key":
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Oh this Email address or Password looks wrong");
    }
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    
    // dataAccessToken = data.accessToken;
    window.location.href = "../home/main-home/home.html";
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}

// export const accessToken = dataAccessToken;
signIn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (validateInput(email, password)) {
    login(email, password);
    // console.log(dataAccessToken);
  }
});

