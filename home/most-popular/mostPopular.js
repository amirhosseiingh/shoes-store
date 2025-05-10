const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const mostPopularList = document.getElementById("mostPopular-list");
const accessToken = localStorage.getItem("token");
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
    renderProductsList(data);
  } catch (err) {
    console.error(err);
  }
}
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

function renderProductsList(products) {
  mostPopularList.innerHTML = "";
  console.log(products);
  
  products.records.forEach((item) => {
    const list = document.createElement("div");
    list.innerHTML = `
        <div class="flex flex-col w-44 h-56  mt-4   ">
                <div class="bg-[#F3F3F3] rounded-[24px] w-44 h-44 justify-center items-center flex p-2 ">
                    <img class="w-36 h-36" src="${item.imageURL[0]}" alt="image">
                </div>
                <div class="mt-2">
                    <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-[150px]">${item.name}</p>
                    <p class="font-semibold text-base ">$ ${item.price}</p>
                </div>
            </div>
        `;
        mostPopularList.appendChild(list)
  });
}

function handleFilterBrand(btnId, brandName) {
  btnElement = document.getElementById(btnId);
  btnElement.addEventListener("click", () => {
    filterBrand(brandName);
  });
}

getProducts();
