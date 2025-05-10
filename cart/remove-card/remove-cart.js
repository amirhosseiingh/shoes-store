// const BASE_URL = "http://api.alikooshesh.ir:3000/api";
// const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzU5YTJhZjBiZjk5ZDI5YmNlNWVkZCIsImlhdCI6MTczNTk3MjU3OCwiZXhwIjoxNzM2MTQ1Mzc4fQ.ViYjuPsiLmD1uNaM67xqDj6mBYcDzx-bcXr1NHDPTvw";
// const removeCartList = document.getElementById("remove-cart-list");
// const footer = document.getElementById("footer");
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");


// // services
// // get cart product
// async function getCartProduct() {
//   try {
//     const response = await fetch(`${BASE_URL}/records/cart`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         api_key:
//           "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error in the get product in the cart");
//     }
//     const data = await response.json();
//     console.log(data);
//     renderRemovePage(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // get product  in remove box
// async function getProductForRemove(id) {
//   try {
//     const response = await fetch(`${BASE_URL}/records/cart/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         api_key:
//           "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error in the get product");
//     }
//     const data = await response.json();
//     console.log(data);
//     removeBox(data);
//   } catch (error) {
//     console.log(error);
//   }
// }


// //request remove  product from cart
// async function deletingProduct(id) {
//   try {
//     const response = await fetch(`${BASE_URL}/records/cart/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         api_key:
//           "Amirhossein-1380sdcBhgHNtYZX5OgAiqKZWWRGOOBUYOBcXGvU2j6RYFrpAQILkWYmyq3FXEw4MOFR7KxES89oP3WCUvvuIpZR3kUI1p4oW0Hebc4cBuxLxED9XzXQ",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Error in the receive product");
//     }
//     const data = await response.json();
//     console.log(data);
//     removeBox(data);
//     // alert("Product remove successfully")
//     // window.location.href="../main-card/main-cart.html"
//   } catch (error) {
//     console.log(error);
//   }
// }


// // functionality
// // render remove list
// function renderRemovePage(products) {
//   removeCartList.innerHTML = "";
//   products.records.forEach((item) => {
//     const list = document.createElement("div");
//     list.innerHTML = `
//             <div class="bg-white mx-4 mt-4 p-2 rounded-3xl  flex gap-4 ">
//                     <div id="active"
//                         class="flex flex-col justify-center items-center mx-6 mt-4 max-h-[672px] overflow-y-scroll  ">
//                         <div class="flex gap-8 my-4">
//                             <div class="flex items-center bg-gray-100 rounded-2xl  ">
//                                 <img class="p-2" src="${item.images[0]}" alt="">
//                             </div>
//                             <div class="flex flex-col gap-4">
//                                 <div class="flex justify-between items-center">
//                                     <p class="font-bold text-xl"> ${item.name}</p>
//                                     <button>
//                                         <img class="w-5" src="../../assets/home-icon/bin.svg" alt="remove">
//                                     </button>
//                                 </div>
//                                 <div class="flex gap-4 ">
//                                     <p>color</p>
//                                     <p>${item.color}</p>
//                                     <p>size=${item.size}</p>
//                                 </div>
//                                 <div class="flex items-center gap-4 ">
//                                     <span class="font-bold text-xl">$125.25</span>
//                                     <div class="flex items-center gap-4 my-2  ">
//                                         <div class="flex items-center  gap-3">
//                                             <div class="flex bg-[#ececed] justify-between w-[90px] rounded-[30px]">
//                                                 <button id="quantityNegative"
//                                                     class="rounded-[30px] font-medium text-[17px] py-1 pl-4">-</button>
//                                                 <input id="quantityInput" type="number"
//                                                     class="bg-black w-full bg-opacity-0 text-center outline-none text-[17px]"
//                                                     value="0">
//                                                 <button id="quantityPlus"
//                                                     class="rounded-[30px] font-medium text-[17px] py-1 pr-4">+</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         `;
//     removeCartList.appendChild(list);
//   });
// }

// // render remove box
// function removeBox(product) {
//     footer.innerHTML = "";
//     const removeProduct = document.createElement("div");
//     removeProduct.innerHTML = `
//       <div class="fixed bottom-0 w-full bg-white flex flex-col justify-center mt-10 rounded-t-3xl">
//         <div class="bg-gray-900 w-[10%] h-0.5 ml-48 mt-4"></div>
//         <p class="text-center text-black font-bold text-3xl mt-2">Remove from Cart?</p>
//         <div class="bg-white m-4 rounded-3xl flex gap-4">
//           <div id="active" class="flex flex-col justify-center items-center mx-6 mt-4 max-h-[672px] overflow-y-scroll">
//             <div class="flex gap-8 my-4">
//               <div class="flex items-center bg-gray-100 rounded-2xl">
//                 <img class="p-2" src="${product.images[0]}" alt="image">
//               </div>
//               <div class="flex flex-col gap-4">
//                 <div class="flex justify-between items-center">
//                   <p class="font-bold text-xl">${product.name}</p>
//                 </div>
//                 <div class="flex gap-4">
//                   <p>Color:</p>
//                   <p>${product.color}</p>
//                   <p>Size: ${product.size}</p>
//                 </div>
//                 <div class="flex items-center gap-4">
//                   <span class="font-bold text-xl">$125.25</span>
//                   <div class="flex items-center gap-4 my-2">
//                     <div class="flex items-center gap-3">
//                       <div class="flex bg-[#ececed] justify-between w-[90px] rounded-[30px]">
//                         <button id="quantityNegative" class="rounded-[30px] font-medium text-[17px] py-1 pl-4">-</button>
//                         <input id="quantityInput" type="number" class="bg-black w-full bg-opacity-0 text-center outline-none text-[17px]" value="${product.quantity}">
//                         <button id="quantityPlus" class="rounded-[30px] font-medium text-[17px] py-1 pr-4">+</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="bg-gray-400 w-[90%] h-0.5 ml-5"></div>
//         <div class="flex justify-center gap-12 my-8">
//           <a href="../../cart/main-card/main-cart.html">
//             <button class="bg-gray-300 font-semibold text-lg w-36 p-4 rounded-full">Cancel</button>
//           </a>
//         <button onclick="deletingProduct(productId)" class="bg-black font-semibold text-white text-lg w-36 p-4 rounded-full shadow-md">Yes, Remove</button>
//         </div>
//       </div>
//     `;
//     footer.appendChild(removeProduct);
//   }

// //   function handleDelete(productId) {
// //     deletingProduct(productId);
// //   }

// getProductForRemove(productId);
// // deletingProduct(productId)
// getCartProduct();
