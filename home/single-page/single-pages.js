const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const singlePage = document.getElementById("single-product");
const accessToken = localStorage.getItem('token');

const swiperWrapper = document.getElementById("swiper-wrapper");
const nameProduct = document.getElementById("name-product");
const sizeProduct = document.getElementById("size-product");
const sizeBox = document.getElementById("size-box");
const colorBox = document.getElementById("color-box");
const priceProduct = document.getElementById("item-price");
const addToCartButton = document.getElementById("addTo-cart");
const quantityInput = document.getElementById("quantityInput");
const quantityNegative = document.getElementById("quantityNegative");
const quantityPlus = document.getElementById("quantityPlus");
const wishlistButton = document.getElementById("wishlist-button");
let selectedSize = null;
let selectedColor = null;
let images = [];
let productBrand = '';
let price = 0;
// Get id from URL 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
//services

// Request for get single product
async function singleProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/records/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Error in the find singleProduct");
        }
        const data = await response.json();
        productBrand = data.brand
        renderProductsList(data);
    } catch (error) {
        console.log(error);
    }
}
// request to send product details to the server
async function sentToCart(productDetails) {
    try {
        const response = await fetch(`${BASE_URL}/records/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(productDetails)
        });
        if (!response.ok) {
            throw new Error("Error in the send product details to cart");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
// create wishlist
async function crateWishList(productDetails) {
    try {
        const response = await fetch(`${BASE_URL}/records/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(productDetails)
        })
        if (!response.ok) {
            throw new Error("Error in the send to wishlist");
        }
        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}
//functionality
// Update final price
function updateFinalPrice() {
    const quantity = parseInt(quantityInput.value);
    const finalPrice = price * quantity;
    priceProduct.innerHTML = `$ ${finalPrice}`;
}

// Rendering product
function renderProductsList(product) {
    // console.log(product);
    images = product.imageURL;

    product.imageURL.map((image) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<div>
                              <img src="${image}" alt="swiper1-shoe" class="mix-blend-darken"/>
                           </div>`;
        swiperWrapper.appendChild(slide);
    });

    nameProduct.innerHTML = product.name;
    price = product.price;
    
    product.sizes.map((size) => {
        const sizeButton = document.createElement("div");
        sizeButton.innerHTML = `<button class="w-10 h-10 border border-black bg-white flex justify-center items-center rounded-full hover:bg-black size-button" data-size="${size}">
                                  <span class="text-black hover:text-white">${size}</span>
                                </button>`;
        sizeBox.appendChild(sizeButton);
    });

    product.colors.map((color) => {
        const colorOption = document.createElement("div");

        colorOption.innerHTML = `<div class="relative w-10 h-10 border border-black flex justify-center items-center rounded-full cursor-pointer" style="background-color: ${color}">
            <svg class="absolute w-8 h-8 text-white hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 14.293a1 1 0 011.414 0l4-4a1 1 0 00-1.414-1.414L11 12.586 8.707 10.293a1 1 0 10-1.414 1.414l3 3z" clip-rule="evenodd"/>
            </svg>
                </div>`;

        const circleElement = colorOption.querySelector("div");
        const tickIcon = circleElement.querySelector("svg");

        circleElement.addEventListener("click", () => {
            if (selectedColor) {
                selectedColor.querySelector("svg").classList.add("hidden");
            }

            if (selectedColor !== circleElement) {
                tickIcon.classList.remove("hidden");
                selectedColor = circleElement;
            } else {
                selectedColor = null;
            }
        });
        colorBox.appendChild(colorOption);
    });

    updateFinalPrice();

    // Handling size selection
    const sizeButtons = document.querySelectorAll(".size-button");
    sizeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            sizeButtons.forEach(item => {
                item.classList.remove("bg-black", "text-white");
                item.classList.add("bg-white", "text-black");
            });
            e.currentTarget.classList.add("bg-black", "text-white");
            selectedSize = e.currentTarget;
        });
    });
}

// Handling increase and decrease buttons

quantityInput.value = 1;

// Handling increase and decrease buttons
quantityNegative.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
    updateFinalPrice();
});

quantityPlus.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updateFinalPrice();
});

// Update final price
function updateFinalPrice() {
    const quantity = parseInt(quantityInput.value);
    const finalPrice = price * quantity;
    priceProduct.innerHTML = `$ ${finalPrice}`;
}



// get product data
function cartInfo() {
    const selectedSizeButton = document.querySelector("#size-box .bg-black");
    const selectSize = selectedSizeButton ? selectedSizeButton.getAttribute("data-size") : null;
    const selectedColor = document.querySelector("#color-box .relative svg:not(.hidden)").parentElement.style.backgroundColor;
    const quantity = document.getElementById("quantityInput").value;
  
    // if (!selectSize && !selectedColor) {
    //     alert("Please select a size");
    //     return;
    // }
  
    const productDetails = {
        id: productId,
        size: selectSize,
        color: selectedColor,
        quantity: quantity,
        name: nameProduct.innerHTML,
        price: price * quantity,
        images: images,
        brand: productBrand
    };
  
    localStorage.setItem("cart", JSON.stringify(productDetails));
    alert("Product added to cart");
    console.log(productDetails);
    sentToCart(productDetails);
  }
  
  // Add information product to cart
  addToCartButton.addEventListener("click", cartInfo);
  
  // Add information product to wishlist
  wishlistButton.addEventListener("click", () => {
  
      const quantity = document.getElementById("quantityInput").value;
      const productDetails = {
          id: productId,
          name: nameProduct.innerHTML,
          price: price * quantity,
          images: images,
          brand: productBrand
      };
      alert("Product added to Wishlist")
      crateWishList(productDetails);
  });
  
  singleProduct(productId);
  