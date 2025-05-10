const radioButton = document.querySelectorAll('input[name="Address"]');
const applyButton = document.getElementById("apply-button");

applyButton.addEventListener("click", function () {
    let selectedShippingAddress = null;
    radioButton.forEach(radio => {

        if (radio.checked) {
            selectedShippingAddress = radio;
        }
    });

    if (selectedShippingAddress) {
        const shippingText = selectedShippingAddress.parentElement.innerText;
        console.log( shippingText); 
        localStorage.setItem("selectedShippingAddress", shippingText);
        console.log("Stored Shipping Address in localStorage:", localStorage.getItem("selectedShippingAddress")); // لاگ برای بررسی ذخیره‌سازی
        window.location.href = "../checkout-box/checkout.html";
    } else {
        alert("Please select a shipping method");
    }
});
