const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const accessToken = localStorage.getItem('token');
const wishlist = document.getElementById("wishlist");

//services
// get wishlist 
async function crateWishList() {
    try {
        const response = await fetch(`${BASE_URL}/records/wishlist`,{
            method : "GET",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`
            },
        })
        if (!response.ok) {
            throw new Error("Error in the send to wishlist");
        }
        const data = await response.json();
        console.log(data);
        renderWishlist(data)
    } catch (error) {
        console.log(error);
    }
}
// handle brand filter
async function filterBrand(brandName) {
    try {
      const response = await fetch(`${BASE_URL}/records/wishlist?filterKey=brand&filterValue=${brandName}`,{
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
      renderWishlist(data)
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
}

// functionality
function renderWishlist(wishlistProduct) {
    wishlist.innerHTML = '';
    wishlistProduct.records.forEach(item => {
        const favProduct = document.createElement("div");
        favProduct.innerHTML = `
            <div class="flex flex-col w-44   mt-4 gap-2 relative ">
                <button class="absolute  left-36 top-4 w-5 h-5 bg-gray-700 rounded-full">
                    <img class="w-3 h-3 mx-auto" src="../../assets/love-1488-svgrepo-com.svg" alt="">
                </button>
                <div class="bg-[#F3F3F3] rounded-[24px] w-44 h-44 justify-center items-center flex ">
                    <img class="w-36 h-36 object-contain p-1" src="${item.images[0]}" alt="image">
                </div>
                <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-[150px]">${item.name}</p>
                <div class="flex flex-row gap-4 items-center ">
                    <img class="w-4 h-4 " src="../../assets/star-half-svgrepo-com (1).svg" alt="">
                    <span class="text-gray-800">4.6</span>
                    <div class="bg-[#f2f2f2] rounded h-6 w-12 flex justify-center ">
                        <span class="">6.625</span>
                    </div>
                </div>

                    <p class="font-bold text-lg ">$ ${item.price}</p>
            </div>
        `
        wishlist.appendChild(favProduct) 
    });
}

// handle filter bar button
function handleFilterBrand(btnId, brandName) {
    btnElement = document.getElementById(btnId);
    btnElement.addEventListener("click", () => {
      filterBrand(brandName);
    });
  }
  
crateWishList()