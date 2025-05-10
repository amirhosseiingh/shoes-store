const userName = document.getElementById("user-name");
const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const homeList = document.getElementById("home-list");

const nikeButton = document.getElementById("nike-button")
const accessToken = localStorage.getItem('token');
//services
// get username
async function getUserName() {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key":
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Username didn't find");
    }
    const data = await response.json();
    // console.log(data);
    userName.textContent = data.name;
  } catch (error) {
    console.error(error);
    userName.textContent = "Error";
  }
}
// get product
async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/records/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key":
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in the find products");
    }
    const data = await response.json();
    console.log(data);
    // const products = data;
    // console.log(products);
    renderProductsList(data);
  } catch (err) {
    console.error(err);
  }
}
// get filter brand name
async function filterBrand(brandName) {
  try {
    const response = await fetch(`${BASE_URL}/records/products?filterKey=brand&filterValue=${brandName}`,{
      method : "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key":
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in the brand filter");
    }
    const data =await response.json();
    renderProductsList(data)
  } catch (error) {
    console.log(error);
  }
}
// functionality
function renderProductsList(products) {
  homeList.innerHTML = "";
  products.records.forEach((item) => {
    const newProducts = document.createElement("div");
    newProducts.innerHTML = `
            <div class="flex flex-col w-44 h-56  gap-2 my-4 ">
                <a href="../single-page/single-page.html?id=${item.id}">
                  <button class="bg-[#f6f6f6] rounded rounded-3xl w-44 h-44 justify-center items-center flex ">
                     <img class="p-4" src="${item.imageURL[0]}" alt="${item.name} alt="">
                   </button>
                </a>
                <div class="">
                    <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-[150px]">${item.name}</p>
                    <p class="font-semibold text-base ">$ ${item.price}</p>
                </div>
            </div>
    `;
    homeList.appendChild(newProducts);
  });
}

// handle filter button
function handleFilterBrand(btnId,brandName) {
  btnElement = document.getElementById(btnId);
  btnElement.addEventListener("click", ()=>{
    filterBrand(brandName)
  });
}

getUserName();
getProducts();
