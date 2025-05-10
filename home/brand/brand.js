const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const accessToken = localStorage.getItem("token");
const filterList = document.getElementById("filter-list");
const params = new URLSearchParams(document.location.search)
const brand = params.get("brand")
const brandName = document.getElementById("brand-name");
brandName.innerText = brand;


async function filterBrand(brandName) {
  try {
    const response = await fetch(
      `${BASE_URL}/records/products?filterKey=brand&filterValue=${brandName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key":
            "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error in the brand filter");
    }
    const data = await response.json();
    renderProductsList(data);
  } catch (error) {
    console.log(error);
  }
}

function renderProductsList(products) {
  console.log(products);
  filterList.innerHTML = "";
  products.records.forEach((item) => {
    const newProducts = document.createElement("div");
    newProducts.innerHTML = `
         <div class="flex flex-col w-44 h-56  gap-2 my-4 ">
                <div class="bg-[#f6f6f6] rounded rounded-3xl w-44 h-44 justify-center items-center flex ">
                    <img class="p-4" src="${item.imageURL[1]}" alt="${item.name} alt="">
                </div>
                <div class="">
                    <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer ">${item.name}</p>
                    <p class="font-semibold text-base ">$ ${item.price}</p>
                </div>
            </div>   
      `;
      filterList.appendChild(newProducts);
  });
}
function handleFilterBrand(btnId,brandName) {
    btnElement = document.getElementById(btnId);
    btnElement.addEventListener("click", ()=>{
      filterBrand(brandName)
    });
  }
  filterBrand(brand)