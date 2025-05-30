import PosterCard from "./poster-card.js";

export default {
    name: 'MonthTaps',
    components: {
        PosterCard,
    },
    data() {
        return {
            activeTab: '',
            tabs: [],
            commingSoon: [],
            isLoading: false,
        }
    },
    methods: {
        getRemainingMonthsOfYear() {
            const months = [];
            const now = new Date();
            const year = now.getFullYear();
            const startMonth = now.getMonth(); // 0-based index

            for (let month = startMonth; month < 12; month++) {
                const date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0)); // UTC midnight
                months.push({
                    id: date.toISOString(),
                    date: date.toISOString(),
                    label: date.toLocaleDateString('en-US', {
                        month: 'long'
                    })
                });
            }
            return months;
        },
        async getMovieList(date) {
            try {
                this.isLoading = true;
                const response = await axios.get(
                    `https://api.legend.com.kh/films?limit=100&isComingSoon=true&date=${date}&sort=early-released`
                );
                this.commingSoon = response.data.rows;
                this.isLoading = false;
            } catch (error) {
                console.error('Failed to fetch movie list:', error);
            }
        },
        handleChange(id) {
            this.activeTab = id;
            this.getMovieList(id);
        }
    },
    mounted: async function() {
        this.tabs = this.getRemainingMonthsOfYear();
        this.activeTab = this.tabs[0].id;
        await this.getMovieList(this.activeTab);
    },
    template: `
        <div class="container max-w-6xl mx-auto">
            <div class="max-w-full overflow-x-scroll hide-scrollbar">
                <div class="flex items-center w-full space-x-4">
                    <div
                        v-for="(tab) in tabs"
                        :key="tab.id"
                        class="last:pr-4 focus:outline-none sm:last:pr-12 md:last:pr-8 lg:last:pr-24 xl:last:pr-[10.5rem] pointer-events-auto"
                    >
                        <button
                            @click="handleChange(tab.id)"
                            :class="[
                                'rounded-[10px] border border-gray-300 bg-black p-2 lg:min-h-[80px] lg:p-4 opacity-100 cursor-pointer transition-colors duration-300 ease-in-out',
                                activeTab === tab.id
                                    ? 'font-normal border-red-500 border-1' 
                                    : 'border-0.5'
                            ]"
                        >
                            <span class="text-gray-300 text-sm lg:text-md lg:font-extrabold">{{ tab.label }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-10">
                <div v-for="tab in tabs" :key="tab.id" class="animate-fade-in">
                    <div v-if="activeTab === tab.id" class="animate-fade-in">
                        <div v-if="isLoading" class="h-full my-30 md:my-80 flex flex-col items-center justify-center space-y-2">
                            <div class="border border-4 border-t-red-500 border-white w-10 h-10 p-3 rounded-full animate-spin"></div>
                            <p class="text-white font-medium tracking-wide">Loading...</p>
                        </div>
                        <div v-else>
                            <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-6">
                                <div v-for="movie in commingSoon" :key="movie.id" class="animate-fade-in">
                                    <poster-card :movie="movie" />
                                </div>
                            </div>
                        </div>

                        <div v-if="commingSoon.length < 1" class="flex h-[150px] items-center justify-center lg:h-[300px]">
                            <div class="flex flex-col items-center justify-center gap-3">
                                <img src="assets/not-found.svg" alt="No Movies Found" class="img w-35 lg:w-45" />
                                <p class="text-sm font-medium lg:text-base text-white">No movies avialable!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}