export default {
    name: "NavFooter",
    data() {
        return {
            companies: [
                {
                    id: 1,
                    label: "About Us",
                    link: "/pages/about-us.html",
                },
                {
                    id: 2,
                    label: "Contact Us",
                    link: "/pages/contact-us.html",
                },
                {
                    id: 3,
                    label: "Cinemas",
                    link: "/pages/cinema.html",
                },
            ],
            mores: [
                {
                    id: 1,
                    label: "Promotions",
                    link: "/pages/promotion.html",
                },
                {
                    id: 2,
                    label: "News & Activity",
                    link: "/pages/news-activity.html",
                },
                {
                    id: 3,
                    label: "My Ticket",
                    link: "/pages/myticket.html",
                },
                {
                    id: 4,
                    label: "Terms & Conditions",
                    link: "/pages/term-condition.html",
                },
                {
                    id: 5,
                    label: "Privacy & Policy",
                    link: "/pages/privacy-policy.html",
                }
            ],
            apps: [
                {
                    id: 1,
                    iconImg: "assets/playstore.png",
                    link: "https://play.google.com/store/apps/details?id=kh.com.legend&hl=en",
                },
                {
                    id: 2,
                    iconImg: "assets/app-store.png",
                    link: "https://apps.apple.com/us/app/legend-cinema/id1494420578",
                },
            ],
            socials: [
                {
                    id: 1,
                    iconClass: "fa-facebook",
                    link: "https://www.facebook.com/LegendCinemas?mibextid=LQQJ4d"
                },
                {
                    id: 2,
                    iconClass: "fa-instagram",
                    link: "https://instagram.com/legendcinemas?igshid=MzRlODBiNWFlZA=="
                },
                {
                    id: 3,
                    iconClass: "fa-youtube",
                    link: "https://youtube.com/@LegendCinemasKh"
                },
                {
                    id: 4,
                    iconClass: "fa-tiktok",
                    link: "https://www.tiktok.com/@legendcinema?_t=8eX8Pz2BlvL&_r=1"
                },
                {
                    id: 5,
                    iconClass: "fa-telegram",
                    link: "https://t.me/legendcinemas"
                }
            ]
        }
    },
    template: `
        <footer class="relative bg-black pb-24 pt-9 lg:py-9 px-4 sm:px-6">
            <div class="container px-4 md:px-0 max-w-6xl mx-auto">
                <div class="flex flex-wrap justify-between gap-x-12 gap-y-6">
                    <div>
                        <h3 class="text-md font-bold text-white">Company</h3>
                        <ul class="mt-6 flex flex-col gap-3 md:gap-4">
                            <li
                                v-for="(c, index) in companies"
                                :key="index"
                            >
                                <a :href="c.link">
                                    <span class="font-medium text-gray-200 hover:text-white">
                                        {{c.label}}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-white">More</h3>
                        <ul class="mt-6 flex flex-col gap-3 md:gap-4">
                            <li
                                v-for="(more, index) in mores"
                                :key="index"
                            >
                                <a :href="more.link">
                                    <span class="font-medium text-gray-200 hover:text-white">{{more.label}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-8">
                        <div class="gap-3 md:gap-4">
                            <h3 class="text-[18px] md:text-md font-bold text-white">Download Our App</h3>
                            <div class="mt-6 flex-wrap flex items-center gap-3 md:gap-4">
                                <a
                                    v-for="(app, index) in apps"
                                    :key="index"
                                    :href="app.link"
                                    class="p-0"
                                >
                                    <button class="flex items-center gap-2 rounded-full p-1.5 lg:p-2.5 border border-white bg-radial hover:from-gray-700/50 from-40% hover:to-white/25 cursor-pointer">
                                        <img :src="app.iconImg" alt="Play Store" class="size-6" />
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div class="gap-3 md:gap-4">
                            <h3 class="text-[18px] md:text-md font-bold text-white">Follow Our Social Media</h3>
                            <div class="mt-6 flex-wrap flex items-center gap-3 md:gap-4">
                                <a 
                                    v-for="(social, index) in socials"
                                    :key="index"
                                    :href="social.link"
                                    class="p-0"
                                >
                                    <button class="flex items-center gap-2 rounded-full p-1.5 lg:p-2.5 border border-white bg-radial hover:from-gray-700/50 from-40% hover:to-white/25 cursor-pointer">
                                        <i class="fa-brands text-[24px] text-white" :class="social.iconClass"></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 md:mt-12">
                    <div class="gap-x-16 gap-y-6">
                        <h3 class="text-[18px] md:text-md font-bold text-white">Payment</h3>
                        <div class="mt-6 flex-wrap flex items-center gap-x-16 gap-y-6">
                            <img src="assets/aba-payway-logo.png" alt="ABA Pay" class="w-[194px] h-[45px] h-fit">
                            <img src="assets/visa-logo.png" alt="Visal Pay" class="w-[66px] h-[21px] h-fit">
                            <img src="assets/mastercard-logo.png" alt="Mastercard Pay" class="w-[50px] h-[31px] h-fit">
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider my-6 md:mb-8 md:mt-12"></div>
            <p class="text-center text-white">All right revers &copy; 2023</p>
        </footer>
    `
}