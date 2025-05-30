export default {
    name: "Navbar",
    data() {
        return {
            isOpen: false,
            cinemas: [],
            cinema: undefined,
            activeCinemaId: null,
            cinemaApi: "https://api.legend.com.kh",
            isLoading: false,
            search: "",
            searchResults: [],
            isSearch: false,
            isInputSearch: false,
            limit: 10,
            navbarItems: [
                {
                    title: "Home",
                    href: "/",
                    active: true,
                    showWhenSmall: false,
                    iconClass: "fa-solid fa-house"
                },
                {
                    title: "Cinemas",
                    href: "/cinemas",
                    active: false,
                    showWhenSmall: false,
                    iconClass: "fa fa-location-dot"
                },
                {
                    title: "Offers",
                    href: "/offers",
                    active: false,
                    showWhenSmall: false,
                    iconClass: "fa fa-tags"
                },
                {
                    title: "F&B",
                    href: "/f-and-b",
                    active: false,
                    showWhenSmall: false,
                    iconClass: "fa-solid fa-wine-glass"
                },
                {
                    title: "More",
                    href: "/more",
                    active: false,
                    showWhenSmall: true,
                    iconClass: "fa-solid fa-chess-board"
                }
            ]
        };
    },
    methods: {
        async fetchCinemas() {
            try {
                const response = await fetch(`${this.cinemaApi}/cinemas`);
                const data = await response.json();
                this.cinemas = data;
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        },
        async handleChange(id) {
            this.activeCinemaId = id;
            this.cinema = this.cinemas.find(cinema => cinema.vistaCinemaId === id);
            console.log(this.cinema);
            this.isOpen = false;
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.cinemaDropdown;
            if (dropdown && !dropdown.contains(event.target)) {
                this.isOpen = false;
            }
        },
        handleCloseSearchOutside(event) {
            const dropdown = this.$refs.searchDropdown;
            if (dropdown &&!dropdown.contains(event.target)) {
                this.isInputSearch = false;
            }
        },
        async handleSearch() {
            this.isLoading = true;
            let api = `${this.cinemaApi}/films?limit=${this.limit}`;
            if (this.search.trim() === '') {
                this.isSearch = false;
                api = `${this.cinemaApi}/scheduled-films?limit=${this.limit}`;
                this.searchResults = [];
            } else {
                this.isSearch = true;
                this.limit = 100;
                api = `${api}&searchText=${this.search}`;
            }
            try {
                const response = await fetch(api);
                const data = await response.json();
                this.searchResults = data.rows;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.error("Error fetching cinemas:", error);
            }
        },
        async handleClearSearch() {
            this.search = '';
            if (this.search.trim() !== '' || (this.searchResults.length === 0 && !this.isSearch)) {
                await this.handleSearch();
            }
        },
        async handleFocus() {
            if (!this.isInputSearch) {
                this.isInputSearch = true;
                if (this.search.trim() !== '' || (this.searchResults.length === 0 && !this.isSearch)) {
                    await this.handleSearch();
                }
            }
        },
        formatDate(date) {
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });
            const year = dateObj.getFullYear();
            return `${day} ${month} ${year}`;
        }
    },
    mounted() {
        this.fetchCinemas();
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('click', this.handleCloseSearchOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('click', this.handleCloseSearchOutside);
    },
    template: `
        <nav class="sticky left-0 top-0 z-[9999] w-full bg-secondary/50 backdrop-blur-2xl px-4 md:px-6">
            <div class="container max-w-6xl flex flex-col m-auto">
                <div class="flex flex-row-reverse md:flex-row lg:flex-row items-center justify-between relative py-4 lg:py-6">
                    <!-- Search -->
                    <div class="relative max-full order-1 md:order-1 z-10" ref="searchDropdown">
                        <input type="text" v-model="search" @focus="handleFocus" @input="handleSearch" id="search" name="search" class="w-full font-light grow py-2 px-4 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6 rounded-full bg-gray-900/50 pr-10 ring-1 ring-gray-400/25 focus:ring-gray-400/50 hidden md:block" placeholder="Search Movies" />
                        
                        <div class="absolute right-0 top-1/2 flex -translate-x-4 -translate-y-1/2 cursor-pointer items-center gap-2 text-gray-200">
                            <svg v-if="!isSearch" @click="alert('hello')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <svg v-else @click="handleClearSearch()" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="gridicons:cross">
                                    <path 
                                        id="Vector" 
                                        d="M13.4577 14.6666L8.00433 9.20814L2.55095 14.6666L1.33337 13.4498L6.79532 7.99992L1.33337 2.55005L2.55095 1.33325L8.00433 6.79169L13.4577 1.34182L14.6667 2.55005L9.21333 7.99992L14.6667 13.4498L13.4577 14.6666Z" 
                                        fill="white"
                                    >
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <div class="absolute left-0 top-[50px] z-[50] h-[488px] max-h-[488px] w-[300px] overflow-auto rounded-xl border border-gray-200 bg-black p-6 md:w-[446px] lg:top-[67px]" :class="[isInputSearch ? 'transition block' : 'transition hidden']">
                            <h4 class="text-2xl font-semibold text-gray-200 mb-4">Search</h4>
                            <div v-if="isLoading" class="h-full flex flex-col justify-center items-center justify-center space-y-2">
                                <div class="border border-4 border-t-red-500 border-white w-10 h-10 p-3 rounded-full animate-spin"></div>
                                <p class="text-white font-medium tracking-wide">Loading...</p>
                            </div>
                            <ul v-else>
                                <li
                                    v-for="(result, index) in searchResults"
                                    :key="index"
                                >
                                    <a href="#" class="flex gap-4">
                                        <div class="h-[110px] w-[76px] overflow-hidden rounded">
                                            <img :src="result.bannerImageUrl" :alt="result.title" class="img w-full h-full object-cover" />
                                        </div>
                                        <div class="flex flex-col gap-2">
                                            <span class="line-clamp-3 text-base font-semibold text-gray-200">{{result.title}}</span>
                                            <span class="text-xs text-gray-400">{{ formatDate(result.openingDate) }}</span>
                                        </div>
                                    </a>
                                    <div v-if="index !== searchResults.length - 1" class="divider my-4"></div>
                                </li>
                            </ul>

                            <div v-if="searchResults.length === 0 && !isLoading" class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
                                <img src="assets/not-found.svg" alt="No Movies Found" />
                                <h1 class="text-center text-md font-bold text-white">No movies were found, Please try other movie title</h1>
                            </div>
                        </div>
                    </div>
                    <!-- Logo -->
                    <div class="flex items-center absolute left-1/2 -translate-x-1/2">
                        <a href="#" class="flex items-center">
                            <img src="assets/legend-cinema-logo.png" alt="Legend Cinema" class="w-18 md:w-24 lg:w-28" />
                        </a>
                    </div>
                    <!-- Authentication Button With Icon -->
                    <div class="flex items-center gap-x-2 sm:gap-x-2 md:gap-x-2 lg:gap-x-4 order-2 md:order-2 z-10">
                        <button class="flex items-center gap-x-2 text-gray-200 hover:text-gray-100 transition-colors cursor-pointer border border-gray-400/25 hover:border-gray-400/50 rounded-full p-1.5 md:p-2 md:px-6 md:py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd"
                                d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                                clip-rule="evenodd" />
                            </svg>
                            <span class="hidden md:inline">Tecket</span>
                        </button>

                        <button class="flex items-center gap-x-2 text-gray-200 hover:text-gray-100 transition-colors cursor-pointer border border-gray-400/25 hover:border-gray-400/50 rounded-full p-1.5 md:p-2 md:px-6 md:py-2 hidden md:flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clip-rule="evenodd" />
                            </svg>
                            <span class="hidden md:inline">Join Now</span>
                        </button>

                        <button class="flex items-center gap-x-2 text-gray-200 hover:text-gray-100 transition-colors cursor-pointer border border-gray-400/25 hover:border-gray-400/50 rounded-full p-1.5 md:p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                <path fill-rule="evenodd"
                                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                                clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Seperator as gradiant -->
            <div class="divider"></div>
            <div class="container max-w-6xl flex flex-col m-auto">
                <div class="flex items-center justify-between">
                    <!-- Navigation -->
                    <nav class="flex flex-col py-4 sm:flex-row sm:justify-between sm:items-center sm:gap-x-4 hidden md:flex">
                        <ul class="flex flex-col sm:flex-row sm:items-center gap-x-3 sm:gap-x-6 text-sm font-medium text-gray-200">
                            <li
                                v-for="(item, index) in navbarItems"
                                :key="index"
                                :class="[item.showWhenSmall ? 'hidden' : 'block']"
                            >
                                <a  :href="item.href"
                                    :class="[item.active ? 'text-gray-200' : 'text-gray-300']"
                                    class="hover:text-gray-100 text-base font-normal hover:font-normal cursor-pointer flex items-center gap-x-3"
                                >
                                    <i class="text-red-500 size-4" :class="item.iconClass"></i>
                                    <span>{{item.title}}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <!-- Select location -->
                    <div class="relative w-full sm:w-full md:w-auto lg:w-auto" ref="cinemaDropdown">
                        <button class="flex items-center gap-2 w-full justify-between py-2.5 lg:py-4 cursor-pointer" @click="toggleDropdown">
                            <div class="flex text-left items-center gap-1">
                                <img src="assets/location.svg" alt="Cinema Flag" class="img size-5 text-red-500" />
                                <span class="text-sm text-gray-200 font-light line-clamp-1">{{cinema == undefined ? 'All Cinemas' : cinema.name}}</span>
                            </div>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" :class="[isOpen ? 'transition rotate-180' : 'transition']">
                                <path 
                                    d="M0.594154 0.592566L0.594622 0.592089C0.66344 0.521721 0.72368 0.5 0.798736 0.5C0.873738 0.5 0.933524 0.521663 1.00175 0.591612L1.00222 0.592089L5.63463 5.3288L5.99209 5.69432L6.34956 5.3288L10.9978 0.575923C11.0463 0.526343 11.0995 0.5 11.1937 0.5C11.2772 0.5 11.3391 0.524277 11.4054 0.59209C11.4744 0.662668 11.5 0.729488 11.5 0.816719C11.5 0.903889 11.4745 0.97023 11.4059 1.04017C11.4059 1.04019 11.4059 1.04021 11.4058 1.04023L6.07783 6.47204L6.07732 6.47257C6.06745 6.48265 6.06072 6.48766 6.05762 6.48974C6.0547 6.49169 6.05442 6.49145 6.05653 6.49068C6.04281 6.49573 6.02354 6.50014 5.99465 6.5L5.99465 6.49999L5.99209 6.49999C5.96242 6.49999 5.94224 6.4954 5.92766 6.49003C5.92936 6.49066 5.92878 6.49072 5.92567 6.48865C5.92243 6.48649 5.91576 6.48154 5.90612 6.4718C5.90598 6.47166 5.90584 6.47151 5.9057 6.47137L0.578812 1.02454C0.527362 0.971928 0.5 0.913489 0.5 0.816072C0.5 0.72888 0.52555 0.662528 0.594154 0.592566Z"
                                    fill="white" 
                                    stroke="white"
                                >
                                </path>
                            </svg>
                        </button>

                        <ul class="absolute max-h-[60vh] overflow-y-auto rounded-xl border bg-black p-3 lg:p-4 right-0 border-gray-200/50 w-full lg:w-[400px] xl:w-[544px] transition" :class="[isOpen ? 'block' : 'hidden']">
                            <li class="cursor-pointer" @click="handleChange(null)">
                                <div class="flex items-center gap-2">
                                    <img src="assets/location.svg" alt="Cinema Flag" class="img size-5 text-red-500" />
                                    <span :class="[activeCinemaId === null ? 'text-red-500' : 'text-gray-200', 'text-base font-light line-clamp-1']">All Cinemas</span>
                                </div>
                                <div class="divider my-2"></div>
                            </li>
                            <li
                                v-for="(cinema, index) in cinemas"
                                :key="index"
                                @click="handleChange(cinema.vistaCinemaId)"
                                class="cursor-pointer"
                            >
                                <div class="flex items-center gap-2">
                                    <img src="assets/location.svg" alt="Cinema Flag" class="img size-5 text-red-500" />
                                    <span :class="[activeCinemaId === cinema.vistaCinemaId ? 'text-red-500' : 'text-gray-200', 'text-base font-light line-clamp-1']">{{cinema.name}}</span>
                                </div>
                                <div v-if="index !== cinemas.length - 1" class="divider my-2"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <div class="fixed bottom-0 z-50 block w-full bg-gray-dark/70 backdrop-blur-2xl md:hidden">
            <nav class="w-full backdrop-blur-md">
                <ul class="container flex items-center justify-between px-6 py-2 md:py-4 mx-auto">
                    <li
                        v-for="(item, index) in navbarItems"
                        :key="index"
                    >
                        <a :href="item.href"
                            class="hover:text-slate-100 text-base font-normal hover:font-normal transition-colors cursor-pointer flex flex-col justify-center items-center gap-y-1"
                            :class="[item.active ? 'text-gray-200' : 'text-gray-300']"
                        >
                            <div 
                                class="rounded-full px-4 py-1"
                                :class="[item.active ? 'bg-red-800/75' : '']"
                            >
                                <i :class="item.iconClass"></i>
                            </div>
                            <span class="text-sm">{{item.title}}</span>
                        </a>
                    </li>
                    
                </ul>
            </nav>
        </div>
    `
}