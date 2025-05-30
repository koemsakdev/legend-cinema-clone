import posterCard from "./poster-card.js";

export default {
    name: 'DayTaps',
    components: {
        posterCard
    },
    data() {
        return {
            activeTab: '',
            tabs: [],
            nowShowing: [],
            isLoading: false,
            baseUrl: "https://api.legend.com.kh"
        }
    },
    methods: {
        getNext7Days() {
            const tabs = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const day = date.getDate();
                const month = date.toLocaleDateString('en-US', {
                    month: 'short'
                });
                const label = i === 0 ?
                    `Today, ${month}, ${day}` :
                    `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${month}, ${day}`;
                tabs.push({
                    id: date.toISOString(),
                    date: date.toISOString(),
                    label
                });
            }
            return tabs;
        },
        async getMovieList(date) {
            try {
                this.isLoading = true;
                const response = await axios.get(
                    `${this.baseUrl}/scheduled-films?limit=100&date=${date}&vistaCinemaId&sort=latest-released`
                );
                this.nowShowing = response.data.rows;
                this.isLoading = false;
            } catch (error) {
                console.error('Failed to fetch movie list:', error);
            }
        },
        handleChange(tab) {
            this.activeTab = tab;
            this.getMovieList(tab);
        }
    },
    mounted: async function() {
        this.tabs = this.getNext7Days();
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
                                'opacity-100 w-[60px] rounded-[10px] border border-gray-500 bg-black p-2 lg:w-[10.25rem] cursor-pointer',
                                activeTab === tab.id
                                    ? 'font-normal border-red-500 border-2' 
                                    : 'border-0.5'
                            ]"
                        >
                            <div class="flex flex-col gap-0.5">
                                <p class="text-gray-300 text-xs sm:text-sm">{{ tab.label.split(",")[0] }}</p>
                                <h3 class="text-white font-extrabold text-xl">{{ tab.label.split(",")[2] }}</h3>
                                <p class="text-gray-300 text-xs sm:text-sm">{{ tab.label.split(",")[1] }}</p>
                            </div>
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
                                <div v-for="movie in nowShowing" :key="movie.id" class="animate-fade-in">
                                    <poster-card :movie="movie" />
                                </div>
                            </div>
                        </div>

                        <div v-if="nowShowing.length < 1" class="flex h-[150px] items-center justify-center lg:h-[300px]">
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