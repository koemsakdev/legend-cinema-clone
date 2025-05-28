function showSwipperSlideHeader() {
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

    // Initialize Swiper
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
                slidersElement.setAttribute('src', `assets/banner-${bannerNumber}.jpeg`);
            }
        }
    });
}

function showSwipperSlideFooter() {
    const footerData = [{
            id: 1,
            image: "assets/footer-banner-1.jpeg",
            title: "Grab Your Ohana with a special movie bundle on Event Family Fun Day",
            description: "Grab Your Ohana with a special movie bundle on Event Family Fun Day Event Information: Event title: Family Fun DayLocation: Legend Cinema OlympiaDate: Sunday-25-May-2025Activities time: 2:00pm Screening time: 3:00pm Tickets price: _ $12.00 : get 3 tickets and popcorn regular (any flavor)_ $16.00: get 4 tickets and popcorn bucket (any flavor) Mechanic: - This exclusive event only for family have kid at least child 12 years or below.- Available for booking with bundle offer package and at counter - Tickets available for all platforms - This promotion not combine with other promotion- Join Activities have a chance to win mystery premium items  - All Kids get 4 coins to play claw machine",
            buttonText: "Learn More"
        },
        {
            id: 2,
            image: "assets/footer-banner-2.jpeg",
            title: "Indo Korean Spicy Noodle",
            description: "Spicy Deal Alert! 🔥 Get a FREE Indomie Korean Spicy Ramyeon with every Korean Spicy Noodles Combo at Legend Cinemas! Limited stock only – grab yours order today!",
            buttonText: "Learn More"
        },
        {
            id: 3,
            image: "assets/footer-banner-3.jpeg",
            title: "Become a Legend Diamond Member  Unlock a world of exclusivity and premiumprivileges by becoming a Legend Diamond Member",
            description: "Become a Legend Diamond Member! Unlock a world of exclusivity and premium privileges by becoming a Legend Diamond Member&nbsp;+5% Top-Up Bonus: Enjoy a 5% bonus on every top-up, making your deposits go even further.nbsp;10% Off Tickets, Food &amp; Beverage: As a Diamond Member, you’ll receive a 10% discount on tickets, food, and beverage purchases, enhancing your experience.&nbsp;VIP Lounge Access: Enjoy exclusive access to the VIP lounge and premium services.&nbsp;Complimentary Welcome Drinks: Receive 4 complimentary welcome drinks each month to kick off your exclusive journey.&nbsp;Birthday Rewards: Receive a special birthday reward to make your day even more memorable.&nbsp;10% Point Rebate: Earn a 10% rebate on points after spending$50.&nbsp;Exclusive Events: Receive invitations to exclusive, members-only events.",
            buttonText: "Learn More"
        },
        {
            id: 4,
            image: "assets/footer-banner-4.jpeg",
            title: "Let's enjoy the special price from Legend Toul Kork Cinema! ",
            description: "Enjoy Special Prices at Legend Toul Kork Cinema!Monday - Thursday:2D Movie: $2.503D Movie: $3.50Friday - Sunday:2D Movie: $3.503D Movie: $4.00Valid from today onwards!",
            buttonText: "Learn More"
        },
        {
            id: 5,
            image: "assets/footer-banner-5.jpeg",
            title: "Special price for students and senior citizen. Applicable on week days, weekends and public Holiday ",
            description: "Terms &Conditions :- This rate card applies for weekday, weekday, and public holiday- Students are required to show student ID (valid for grade 12 and below)- Senior Citizens are required to show National ID (valid for age 60 & above)- Not applicable for special formats such as Screen X, Gold, or Diamond Class.- Effective Date from 15th February 2024- Limited to one ticket per person per day- Price will vary for selected blockbuster movies and formats.",
            buttonText: "Learn More"
        }
    ]

    const swiperWrapper = document.querySelector("#mySwiperFooter");
    let slidesHTML = '';

    footerData.forEach((item) => {
        slidesHTML += `
            <div class="swiper-slide">
                <div class="flex flex-col overflow-hidden bg-[#840307] sm:rounded-2xl md:rounded-3xl xl:flex-row mx-auto">
                    <div class="order-2 px-4 py-6 lg:p-8 xl:order-1 xl:py-10 xl:pl-10 xl:w-1/3">
                        <div class="xl:w-[300px]">
                            <h1 class="line-clamp-2 text-md font-bold lg:text-xl xl:text-4xl text-white">${item.title}</h1>
                            <p class="mb-4 mt-2 md:mb-6 md:mt-4 line-clamp-3 text-sm md:text-base text-gray-300 xl:mb-8">${item.description}</p>
                        </div>
                        <a href="/">
                            <button class="flex items-center gap-x-2 text-sm md:text-base text-red-600 hover:text-red-700 font-bold transition-colors cursor-pointer border border-gray-400/25 hover:border-gray-400/50 rounded-full p-2 md:px-6 md:py-2 lg:px-8 lg:py-3 bg-white">
                                ${item.buttonText}
                            </button>
                        </a>
                    </div>
                    <div class="xl:order-2 relative order-1 h-[200px] md:h-[250px] lg:h-[300px] xl:h-[400px] w-full xl:w-1/1">
                        <img src="${item.image}" alt="footer-img" class="h-full w-full object-cover">
                        <div class="bg-gradient-to-t xl:bg-gradient-to-r from-[#840307] to-[rgba(132,3,8,0)] absolute bottom-0 left-0 h-20 w-full xl:left-0 xl:top-0 xl:h-full xl:w-[250px]"></div>
                    </div>
                </div>
            </div>
        `;
    })

    swiperWrapper.innerHTML = slidesHTML;

    // Initialize Swiper
    new Swiper(".mySwiperFooter", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showSwipperSlideHeader();
    showSwipperSlideFooter();
});