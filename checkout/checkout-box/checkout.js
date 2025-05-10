const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const accessToken = localStorage.getItem('token');

let amount = 0;
let shipping = 0; 
let promo = 0; 

// Services
async function getCheckOutProduct() {
    try {
        const response = await fetch(`${BASE_URL}/records/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error in getting the product in the cart");
        }
        const data = await response.json();
        console.log(data);
        renderCheckList(data);
        calculateAmounts(data);
    } catch (error) {
        console.log(error);
    }
}
getCheckOutProduct()
// Render list
function renderCheckList(product) {
    const checkoutList = document.getElementById("checkout-list");
    checkoutList.innerHTML = '';

    product.records.forEach(record => {
            const productCart = document.createElement("div");
            productCart.innerHTML = `
                <div class="flex gap-4 items-center bg-white rounded-2xl shadow-xl">
                    <div class="flex items-center bg-gray-100 rounded-2xl m-4 w-40 h-40">
                        <img class="p-4" src="${record.images[0]}" alt="Product Image">
                    </div>
                    <div class="flex flex-col gap-4 p-4">
                        <div class="flex justify-between items-center">
                            <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-32">${record.name}</p>
                        </div>
                        <div class="flex gap-2">
                            <span>${renderShoeColor(record.color)}</span>
                            <p>${record.color}</p>
                            <p>Size: ${record.size}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="font-semibold text-lg">$${record.price}</p>
                            <span class="bg-gray-300 rounded-full w-8 h-8 text-center">${record.quantity}</span>
                        </div>
                    </div>
                </div>
            `;
            checkoutList.appendChild(productCart);
    });
}


// Calculate amounts and update HTML
function calculateAmounts(product) {
    const amountElement = document.getElementById("amount");
    amount = product.records.reduce((sum, record) => {
        return sum + (record.price * record.quantity);
    }, 0);
    amountElement.textContent = `$${amount}`;
    updateTotal();
}

console.log(amount);

// Update total
function updateTotal() {
    const shippingElement = document.getElementById("shipping");
    const promoElement = document.getElementById("promo");
    const totalElement = document.getElementById("total");
    const total = (amount + shipping) - promo;

    shippingElement.textContent = `$${shipping}`;
    promoElement.textContent = `$${promo}`;
    totalElement.textContent = `$${total}`;
}
// Functionality
function renderShoeColor(color) {
    return `
      <div class="w-5 h-5 rounded-full inline-block mr-2 border border-black" style="background-color: ${color};"></div>
    `;
}

// Initialize page
// function initializePage() {
//     getCheckOutProduct();
// }

// window.onload = initializePage;


// Promo code selection handling
const toggleButton = document.getElementById('toggleSelect');
const selectElement = document.getElementById('promoSelect');
const promoContainer = document.getElementById('promoContainer');
const inputElement = document.getElementById('promoInput');

toggleButton.addEventListener('click', function() {
    if (selectElement.classList.contains('hidden')) {
        selectElement.classList.remove('hidden');
        selectElement.style.border = '1px solid #000'; 
        selectElement.style.borderRadius = '20px'; 
        selectElement.style.width = '300px'; 
        selectElement.style.height = '50px'; 
    } else {
        selectElement.classList.add('hidden');
        selectElement.style.border = 'none'; 
        selectElement.style.width = 'auto';
    }
});

selectElement.addEventListener('change', function() {
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    promo = parseFloat(selectElement.options[selectElement.selectedIndex].value.replace(/[^\d.]/g, '')) || 0; // Extract price from selected promo

    const selectedDiv = document.createElement('div');
    selectedDiv.className = 'bg-black text-white text-2xl rounded-full p-2 w-80 h-16 shadow-xl flex justify-evenly items-center'; // بک‌گراند مشکی و متن سفید
    selectedDiv.innerText = selectedText;
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'text-white w-12 h-12 text-3xl ml-4';
    closeButton.addEventListener('click', function() {
        promoContainer.innerHTML = '';
        promoContainer.appendChild(inputElement);
        promoContainer.appendChild(toggleButton);
        selectElement.classList.add('hidden');
        selectElement.style.border = 'none'; 
        selectElement.style.width = 'auto'; 
        promo = 0; // Reset promo to zero
        updateTotal();
    });

    selectedDiv.appendChild(closeButton);

    promoContainer.innerHTML = '';
    promoContainer.appendChild(selectedDiv);

    selectElement.classList.add('hidden');
    selectElement.style.border = 'none'; 
    selectElement.style.width = 'auto';
    updateTotal();
});

// Handle address
function renderSelectedAddress() {
    const addressSection = document.getElementById('address-box');
    const selectedAddress = localStorage.getItem('selectedAddress');

    if (selectedAddress) {
        const addressParts = selectedAddress.split('\n'); 
        const title = addressParts[0];
        const addressDetails = addressParts

        addressSection.innerHTML = `
            <div class="flex gap-6 items-center">
                <div class="bg-gray-400 w-14 h-14 rounded-full flex items-center">
                    <img src="../../assets/location-svgrepo-com (1).svg" alt="location">
                </div>
                <div>
                    <p class="font-bold text-lg">${title}</p>
                    <p class="text-gray-400 text-sm">${addressDetails}</p>
                </div>
            </div>
            <a href="../addres/addres.html">
                <button>
                    <img src="../../assets/edit-svgrepo-com.svg" alt="edit-address">
                </button>
            </a>
        `;
    }
}

// Render selected shipping
function renderSelectedShipping() {
  const shippingSection = document.getElementById('shipping-choice-box');
  const selectedShipping = localStorage.getItem('selectedShippingAddress');

  if (shippingSection && selectedShipping) {
      shippingSection.innerHTML = `
          <div class="flex justify-between items-center">
              <div class="flex gap-2 items-center">
                  <img class="w-12" src="../../assets/truck-svgrepo-com.svg" alt="shipping">
                  <p class="font-bold text-lg">${selectedShipping}</p>
              </div>
              <a href="../shipping/chose-shipping.html">
                  <button>
                      <img class="w-10" src="../../assets/arrow-next-svgrepo-com.svg" alt="edit-address">
                  </button>
              </a>
          </div>
      `;
      shipping = parseFloat(selectedShipping.replace(/[^\d.]/g, '')) || 0; 
      updateTotal();
  }
}

// Initialize page
function initializePage() {
    renderSelectedAddress();
    renderSelectedShipping();
    getCheckOutProduct();
}

window.onload = initializePage;
