const BASE_URL = 'http://api.alikooshesh.ir:3000/api';
const accessToken = localStorage.getItem('token');
const confirmPayment = document.getElementById('confirm-payment');

async function sentToOrder(cartItems) {
  try {
    const response = await fetch(`${BASE_URL}/records/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key:
          'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(cartItems), 
    });
    if (!response.ok) {
      throw new Error('Error in the sending checkout product to order');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// request get checkout data
async function getCheckOutProduct() {
  try {
    const response = await fetch(`${BASE_URL}/records/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        api_key:
          'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('error in the get checkout product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//delete cart
async function deleteCart() {
  try {
    const response = await fetch(`${BASE_URL}/records/cart/delete-all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        api_key:
          'Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('error in delete cart');
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleConfirmButton() {
  const checkout = await getCheckOutProduct();
  let cartItems = [];

  checkout.records.forEach(item => {
    cartItems.push({
      createdAt: new Date(),
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      images: item.images[2],
      brand: item.brand,
      id: item.id,
      status : 0
    });
  });
  await sentToOrder(cartItems); 
  console.log(cartItems);
  await deleteCart(); 
  window.location.href= "../final-page/final-page.html";
}

function initializePage() {
  confirmPayment.addEventListener('click', handleConfirmButton);
}

window.onload = initializePage;
