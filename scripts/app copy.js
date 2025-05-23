import HeaderComponent from "../components/script-components/header.js"
import navbar from "../components/script-components/navbar.js"

const {
    createApp,
    ref,
    h
} = Vue

createApp({
    components: {
        navbar,
        HeaderComponent
    }
}).mount("#app");

// function showSwipperSlide() {
//     const swiperWrapper = document.querySelector(".swiper-wrapper");
//     let slidesHTML = '';

//     for (let i = 1; i < 8; i++) {
//         slidesHTML += `
//             <div class="swiper-slide flex items-center justify-center px-0 md:px-4">
//               <div class="max-w-6xl px-4 md:px-0 mx-auto">
//                 <img
//                   src="assets/banner-${i}.jpeg"
//                   alt="Legend Cinema ${i}"
//                   class="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//         `;
//     }

//     swiperWrapper.innerHTML = slidesHTML;
// }
// showSwipperSlide();

// // Custom Style for swipper
// new Swiper(".mySwiper", {
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
//     loop: true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     on: {
//         slideChange: function () {
//             const activeSlide = this.slides[this.activeIndex];
//             const bannerNumber = activeSlide.swiperSlideIndex ?? 0;
//             const slidersElement = document.getElementById('sliders');
//             slidersElement.style.backgroundImage = `url(assets/banner-${bannerNumber+1}.jpeg)`;
//             // Add a fade transition
//             slidersElement.style.transition = 'background-image 0.3s ease-in-out';
//         }
//     }
// });

function showSwipperSlide() {
    // const swiperWrapper = document.querySelector(".mySwiper");
    // let slidesHTML = '';

    // for (let i = 1; i < 8; i++) {
    //     slidesHTML += `
    //         <div class="swiper-slide" style="width: 960px; margin-right: 24px;">
    //             <img 
    //                 class="aspect-video max-h-[500px] w-full object-cover lg:rounded-[20px]"
    //                 src="assets/banner-${i}.jpeg"
    //                 alt="image/jpeg"
    //             >
    //         </div>
    //     `;
    // }

    // swiperWrapper.innerHTML = slidesHTML;

    // Initialize Swiper
    new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        // on: {
        //     slideChange: function () {
        //         const activeSlide = this.slides[this.activeIndex];
        //         const bannerNumber = activeSlide.getAttribute('data-banner');
        //         const slidersElement = document.getElementById('sliders');
        //         slidersElement.style.backgroundImage = `url(assets/banner-${bannerNumber}.jpeg)`;
        //         slidersElement.style.transition = 'background-image 0.3s ease-in-out';
        //     }
        // }
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', showSwipperSlide);