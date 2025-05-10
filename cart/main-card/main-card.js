const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const accessToken = localStorage.getItem("token");
const cartPage = document.getElementById("cart-page");
const totalPriceContainer = document.getElementById("total-price-all");
const removeBoxModal = document.getElementById("remove-box-modal");
const modalContent = document.getElementById("modal-content");
const footer = document.getElementById("footer");
const cancelButton = document.querySelector(".cancel-button");
const overlay = document.getElementById("overlay");
const confirmRemove = document.getElementById("confirm-remove");
let productDeleteId = null;
let deleteQuantity = 0;
const checkoutButton = document.getElementById("checkOutButton");

//services
// get cart product
async function getCartProduct() {
  try {
    const response = await fetch(`${BASE_URL}/records/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        api_key:
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in getting the product in the cart");
    }
    const data = await response.json();
    console.log(data);
    renderCartPage(data);
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/records/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        api_key:
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error in deleting the product from the cart");
    }
    const data = await response.json();
    console.log(data);
    getCartProduct();
  } catch (error) {
    console.log(error);
    getCartProduct();
  }
}
// doesn't have use
async function sentToCheckout() {
  try {
    const cartItems = setCartItems();
    const response = await fetch(`${BASE_URL}/records/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ items: cartItems }),
    });

    if (!response.ok) {
      throw new Error("Error in sending cart products to checkout");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// put request for change product quantity and price
async function updateProduct(id, quantity , price) {
  try {
    const response = await fetch(`${BASE_URL}/records/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        api_key:
          "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity: quantity,
        price : price
       }),
    });
    if (!response.ok) {
      throw new Error("Error in updating the product in the cart");
    }
    const data = await response.json();
    console.log(data);
    getCartProduct();
  } catch (error) {
    console.log(error);
    getCartProduct();
  }
}


// functionality
// handle color circle
function renderShoeColor(color) {
  return `
    <div class="w-5 h-5 rounded-full inline-block mr-2 border border-black" style="background-color: ${color};"></div>
  `;
}

function renderCartPage(cart) {
  cartPage.innerHTML = "";
  let totalCartPrice = 0;

  cart.records.forEach((item) => {
    const newCart = document.createElement("div");
    newCart.innerHTML = `
      <div class="bg-white m-4 rounded-3xl flex gap-4" data-id="${item.id}">
        <div class="flex flex-col justify-center items-center mx-6 mt-4 max-h-[672px] overflow-y-scroll">
          <div class="flex gap-8 my-4">
            <div class="w-36 h-36 flex items-center bg-gray-100 rounded-2xl">
              <img class="p-4" src="${item.images[0]}" alt="">
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-32">${item.name}</p>
                <button class="delete-product" data-id="${item.id}" data-name="${item.name}" data-image="${item.images[0]}" data-color="${item.color}" data-size="${item.size}" data-price="${item.price}" data-quantity="${item.quantity}">
                  <img class="w-5" src="../../assets/home-icon/bin.svg" alt="remove">
                </button>
              </div>
              <div class="flex justify-between">
                <div class="flex justify-between">
                  <p>${renderShoeColor(item.color)}</p>
                  <p class="text-gray-700">${item.color}</p>
                </div>
                |
                <p class="text-gray-700">size= ${item.size}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="total-price font-bold text-xl">$ ${item.price * item.quantity}</span>
                <div class="flex items-center gap-4 my-2">
                  <div class="flex items-center gap-3">
                    <div class="flex bg-[#ececed] justify-between w-[90px] rounded-[30px]">
                      <button class="quantityNegative rounded-[30px] font-medium text-[17px] py-1 pl-4" data-id="${item.id}">-</button>
                      <input type="number" class="quantityInput bg-black w-full bg-opacity-0 text-center outline-none text-[17px]" value="${item.quantity}">
                      <button class="quantityPlus rounded-[30px] font-medium text-[17px] py-1 pr-4" data-id="${item.id}">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    cartPage.appendChild(newCart);

    const unitPrice = item.price;
    const itemTotalPrice = unitPrice * item.quantity;
    totalCartPrice += itemTotalPrice;

    const quantityInput = newCart.querySelector(".quantityInput");
    const quantityNegative = newCart.querySelector(".quantityNegative");
    const quantityPlus = newCart.querySelector(".quantityPlus");
    const totalPrice = newCart.querySelector(".total-price");

    quantityNegative.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityInput.value);
      const itemId = quantityNegative.getAttribute("data-id");
      if (currentQuantity > 1) {
        currentQuantity -= 1;
        quantityInput.value = currentQuantity;
        const newTotalPrice = currentQuantity * unitPrice;
        totalPrice.textContent = `$ ${newTotalPrice}`;

        totalCartPrice -= unitPrice;
        totalPriceContainer.textContent = `$ ${totalCartPrice}`;
        updateProduct(itemId, currentQuantity);
      }
    });

    quantityPlus.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityInput.value);
      const itemId = quantityPlus.getAttribute("data-id");
      currentQuantity += 1;
      quantityInput.value = currentQuantity;
      const newTotalPrice = currentQuantity * unitPrice;
      totalPrice.textContent = `$ ${newTotalPrice}`;

      totalCartPrice += unitPrice;
      totalPriceContainer.textContent = `$ ${totalCartPrice}`;
      updateProduct(itemId, currentQuantity);
    });
  });
  totalPriceContainer.textContent = `$${totalCartPrice}`;
}


// delete product
// document.addEventListener("click", (event) => {
//   if (event.target.closest(".delete-product")) {
//     const item = event.target.closest(".delete-product").dataset;
//     productDeleteId = item.id;
//     deleteQuantity = item.quantity;

//     modalContent.innerHTML = `
//         <div class="flex gap-8 my-4">
//             <div class="w-36 h-36 flex items-center bg-gray-100 rounded-2xl">
//                 <img class="p-4" src="${item.image}" alt="">
//             </div>
//             <div class="flex flex-col gap-4">
//                 <div class="flex justify-between items-center">
//                     <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-32">${item.name}</p>
//                 </div>
//                 <div class="flex justify-between gap-2">
//                     <div class="flex justify-between">
//                        <p>${renderShoeColor(item.color)}</p>
//                        <p class="text-gray-700">${item.color}</p>
//                     </div>
//                     |
//                     <p class="text-gray-700">size= ${item.size}</p>
//                 </div>
//                 <div class="flex items-center gap-2">
//                     <span class="total-price font-bold text-xl">$ ${item.price}</span>
//                 </div>
//             </div>
//         </div>
//     `;
//     removeBoxModal.classList.remove("hidden");
//     footer.classList.add("hidden");
//     overlay.classList.remove("hidden");
//   }
// });

// Add event listener for cancel button
cancelButton.addEventListener("click", () => {
  removeBoxModal.classList.add("hidden");
  footer.classList.remove("hidden");
  overlay.classList.add("hidden");
});

confirmRemove.addEventListener("click", () => {
  deleteProduct(productDeleteId);

  removeBoxModal.classList.add("hidden");
  footer.classList.remove("hidden");
  overlay.classList.add("hidden");
});

// Event listener for delete product button trash
document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-product");
  if (deleteButton) {
    const { id, name, image, color, size, price, quantity } = deleteButton.dataset;
    productDeleteId = id;
    deleteQuantity = quantity;

    modalContent.innerHTML = `
        <div class="flex gap-8 my-4">
            <div class="w-36 h-36 flex items-center bg-gray-100 rounded-2xl">
                <img class="p-4" src="${image}" alt="">
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                    <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-32">${name}</p>
                </div>
                <div class="flex justify-between gap-2">
                    <div class="flex justify-between">
                       <p>${renderShoeColor(color)}</p>
                       <p class="text-gray-700">${color}</p>
                    </div>
                    |
                    <p class="text-gray-700">size= ${size}</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="total-price font-bold text-xl">$ ${price}</span>
                </div>
            </div>
        </div>
    `;
    removeBoxModal.classList.remove("hidden");
    footer.classList.add("hidden");
    overlay.classList.remove("hidden");
  }
});


function setCartItems() {
  const cartItems = [];
  const buttons = document.querySelectorAll(".delete-product");

  buttons.forEach((button) => {
    const item = button.dataset;

    cartItems.push({
      id: item.id,
      name: item.name,
      image: item.image,
      color: item.color,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    });
  });

  console.log("Cart Items: ", cartItems); 
  return cartItems;
}

checkoutButton.addEventListener("click", () => {
  const cartItems = setCartItems();
  // console.log(cartItems);
  if (cartItems.length > 0) {
    sentToCheckout(cartItems);
  } else {
    console.log("cart is empty");
  }
});

getCartProduct();

