const nextButtons = document.querySelectorAll('.next');
let currentSlide = 0;

nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const slides = document.querySelectorAll('.swiper-slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    });
});

function gotoLogin() {
     window.location.href = '../../logIn/logIn.html'
}