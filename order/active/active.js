const BASE_URL = "http://api.alikooshesh.ir:3000/api";
const accessToken = localStorage.getItem("token");
const activeList = document.getElementById("active")

async function getOrder() {
    try {
        const response = await fetch(`${BASE_URL}/records/order`,{
            method : "GET",
            headers: {
                "Content-Type": "application/json",
                api_key: "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
                Authorization: `Bearer ${accessToken}`,
              },
        })
        if (!response.ok) {
            throw new Error("Error in the get cart product");
        }
        const data = await response.json();
        console.log(data);
        renderActiveList(data)
    } catch (error) {
        console.log(error);
    }
}

function renderShoeColor(color) {
    return `
      <div class="w-5 h-5 rounded-full inline-block mr-2 border border-black" style="background-color: ${color};"></div>
    `;
}
function renderActiveList(product) {
    activeList.innerHTML = '';
    if (product.records.length === 0) {
        window.location.href = "../empty/empty-order.html";
    }else{
        product.records.forEach(record => {
            Object.values(record).forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    const orderProduct = document.createElement("div");
                    orderProduct.innerHTML = `
                        <div class="flex justify-center items-center my-4  bg-white shadow-xl">
                            <div class="flex items-center justify-center m-3 bg-gray-100 rounded-2xl w-32 h-32">
                                <img class=" w-24 h-24 rounded rounded-2xl" src="${item.images}" alt="">
                            </div>
                            <div class="flex flex-col gap-2 pr-2 ">
                                <p class="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer max-w-44">${item.name}</p>
                                <div class="flex flex-row justify-between gap-2 ">
                                    <div class="flex">
                                      <p>${renderShoeColor(item.color)}</p>
                                      <p class="text-gray-700">Color= ${item.color}</p>
                                    </div>
                                    <p class="text-gray-700">Size= ${item.size}</p>
                                    <p class="text-gray-700">Qty= ${item.quantity}</p>
                                </div>
                                <div>
                                    <div class="bg-gray-200 rounded h-7 w-28 flex justify-center items-center">
                                        <span>In Delivery</span>
                                    </div>
                                </div>
                                <div class="flex justify-between my-2">
                                    <p class="font-bold text-2xl">$${item.price}</p>
                                    <button class="bg-black text-white font-semibold text-md rounded-full w-32 p-2 mr-8">Track Order</button>
                                </div>
                            </div>
                        </div>
                    `;
                    activeList.appendChild(orderProduct);
                }
            });
        });
    }
}

getOrder()