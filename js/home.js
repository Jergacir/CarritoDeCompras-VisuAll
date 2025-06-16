var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000, // Cambia de slide cada 3 segundos (3000 ms)
        disableOnInteraction: false, // Para que siga deslizando después de una interacción del usuario
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Pausar al pasar el mouse
const swiperEl = document.querySelector('.swiper');
swiperEl.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
});
swiperEl.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
});

//CATEGORÍAS DE PRODUCTOS DESTACADOS
const swiper2 = new Swiper('.contenedor-productos-destacados-interno', {
  loop: true,
  //Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
        slidesPerView:1,
    },
    768: {
        slidesPerView:2,
    },
    1024: {
        slidesPerView:3,
    },
  },

  spaceBetween: 60,
  
});