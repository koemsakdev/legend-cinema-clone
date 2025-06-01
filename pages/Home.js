import movieTabs from "../components/movie-tabs.js"
import tesnimol from "../components/tesnimol.js"
export default {
    name: "Home",
    components: {
        movieTabs,
        tesnimol,
    },
    data() {
        return {
            selectedCinemaId: null
        }
    },
    methods: {
        initSwiper() {
            const swiperWrapper = document.querySelector("#mySwiperHeader");
            let slidesHTML = '';

            for (let i = 1; i < 8; i++) {
                slidesHTML += `
                    <div class="swiper-slide" data-banner="${i}">
                        <img
                          src="assets/banner-${i}.jpeg"
                          alt="Legend Cinema ${i}"
                          class="w-full max-h-[500px] w-full object-cover md:rounded-[20px]"
                        />
                    </div>
                `;
            }

            swiperWrapper.innerHTML = slidesHTML;

            new Swiper(".mySwiperHeader", {
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                on: {
                    slideChange: function () {
                        const activeSlide = this.slides[this.activeIndex];
                        const bannerNumber = activeSlide.getAttribute('data-banner');
                        const slidersElement = document.getElementById('img-bg');
                        if (slidersElement) {
                            slidersElement.setAttribute('src', `assets/banner-${bannerNumber}.jpeg`);
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.initSwiper();
        window.addEventListener('cinema-changed', (event) => {
            this.selectedCinemaId = event.detail;
        });
    },
    unmounted() {
        window.removeEventListener('cinema-changed', (event) => {
            window.removeEventListener('cinema-changed');
        });
    },
    template: `
        <div class="container max-w-6xl mx-auto">
            <div class="absolute left-0 top-0 w-full overflow-hidden blur-lg max-lg:aspect-video max-lg:max-h-[600px] lg:h-[670px] xl:h-[760px]">
                <img 
                    src="assets/banner-1.jpeg" alt="Image slide"
                    class="max-w-full transition-opacity opacity-100 h-full w-full object-cover transition" id="img-bg" 
                />
                <div class="hero-overlay-1 absolute top-0 h-full w-full"></div>
                <div class="hero-overlay-2 absolute bottom-0 h-[4.125rem] w-full backdrop-blur-[2px]"></div>
            </div>
            <div class="max-lg:full-width">
                <div class="swiper mySwiperHeader w-full md:my-10">
                    <div class="swiper-wrapper" id="mySwiperHeader"></div>
                    <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"></div>
                </div>
            </div>
            <div class="relative z-10 mt-6 lg:mt-20 ">
                <!-- Tap -->
                <div class="full-width">
                    <div class="mb-10">
                        <movie-tabs :selected-cinema-id="selectedCinemaId"></movie-tabs>
                    </div>
                </div>
            </div>

            <tesnimol></tesnimol>
      </div>
    `
}