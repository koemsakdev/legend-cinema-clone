export default {
    name: 'Search',
    data() {
        return {
            baseUrl: "https://api.legend.com.kh",
            search: '',
            result: [],
            isLoading: false,
            isClear: false,
        }
    },
    methods: {
        async searchMovie() {
            if (this.search) {
                this.isClear = true;
                this.isLoading = true;
                try {
                    const response = await fetch(`${this.baseUrl}/films?searchText=${this.search}&isComingSoon=true&isScheduledFilm=true`);
                    const data = await response.json();
                    this.result = data.rows;
                    this.isLoading = false;
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.isClear = false;
                this.isLoading = false;
            }
        },
        async getMovie() {
            try {
                this.isLoading = true;
                const response = await fetch(`${this.baseUrl}/films?isComingSoon=true&isScheduledFilm=true`);
                const data = await response.json();
                this.result = data.rows;
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        async handleClearSearch() {
            this.isClear = true;
            this.search = '';
            await this.getMovie();
        },
        formatDate(date) {
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', {
                month: 'short'
            });
            const year = dateObj.getFullYear();
            return `${day} ${month} ${year}`;
        },
    },
    async mounted() {
        await this.getMovie();
    },
    template: `
        <div class="bg-black/95 backdrop-blur-lg z-[9999] min-h-screen">
            <div class="py-4 lg:py-8">
                <div class="container py-4 m-auto lg:py-8 px-4 md:px-8">
                    <div class="relative flex items-center justify-center">
                        <div class="absolute left-0">
                            <router-link to="/">
                                <button class="flex items-center gap-2 rounded-full p-1.5 lg:p-2.5 border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-xs cursor-pointer">
                                    <img src="assets/arrow-left.svg" class="size-6" alt="back">
                                </button>
                            </router-link>
                        </div>
                        <h1 class="text-md font-normal lg:text-xl text-white">Search</h1>
                    </div>
                    <div class="relative">
                        <div class="mt-6 w-full rounded-md border border-white bg-[#1C1C1C] py-3 pl-2.5 pr-10 placeholder:text-white focus:outline-none">
                            <input type="text" autocomplete="off" v-model="search" @input="searchMovie" class="w-full bg-transparent text-white placeholder:text-white focus:outline-none px-1" placeholder="Search for movies...">
                        </div>
                        <img v-if="isClear" src="assets/close.svg" class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" alt="close" @click="handleClearSearch">
                    </div>
                    <div class="mt-6">
                        <h1 class="mb-4 text-[18px] font-light lg:text-lg text-white">Movies</h1>
                        <div v-if="isLoading" class="min-h-full py-12 md:py-24 flex flex-col justify-center items-center justify-center space-y-2">
                            <div class="border border-4 border-t-red-500 border-white w-10 h-10 p-3 rounded-full animate-spin"></div>
                            <p class="text-white font-medium tracking-wide">Loading...</p>
                        </div>
                        <ul v-else>
                            <li
                                v-for="(res, index) in result"
                                :key="index"
                            >
                                <a href="#" class="flex gap-4">
                                    <div class="h-[110px] w-[76px] overflow-hidden rounded">
                                        <img :src="res.bannerImageUrl" :alt="res.title" class="img w-full h-full object-cover" />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <span class="line-clamp-3 text-base font-semibold text-gray-200">{{res.title}}</span>
                                        <span class="text-xs text-gray-400">{{ formatDate(res.openingDate) }}</span>
                                    </div>
                                </a>
                                <div v-if="index !== result.length - 1" class="divider my-4"></div>
                            </li>
                        </ul>

                        <div v-if="result.length === 0 && !isLoading" class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 w-full">
                            <img src="assets/not-found.svg" class="w-50" alt="No Movies Found" />
                            <h1 class="text-center text-md font-light text-white">No movies were found, Please try other movie title</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute left-0 top-0 -z-10 h-[100px] w-full bg-gradient-to-b from-red-800/25 to-[rgba(0,0,0,0.1)] lg:h-[200px]"></div>
        </div>
    `
}