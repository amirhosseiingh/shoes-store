const radioButtons = document.querySelectorAll('input[name="Address"]');
const confirmButton = document.getElementById("confirm-address");

confirmButton.addEventListener("click", function () {
   let selectedAddress;
radioButtons.forEach(radio => {
    if (radio.checked) {
        selectedAddress = radio;
    }
});

  if (selectedAddress) {
    const addressText = selectedAddress.parentElement.innerText;
    localStorage.setItem("selectedAddress", addressText);
    window.location.href = "../checkout-box/checkout.html";
  } else {
    alert("Please select an address");
  }
});
