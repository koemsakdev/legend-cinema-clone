import posterCard from "./poster-card.js";

export default {
    name: 'DayTaps',
    components: {
        posterCard
    },
    props: {
        selectedCinemaId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            activeTab: '',
            tabs: [],
            nowShowing: [],
            isLoading: false,
            baseUrl: "https://api.legend.com.kh",
            dates: []
        }
    },
    watch: {
        async selectedCinemaId(newId) {
            this.getMovieList(this.activeTab); // Refresh movie list with new cinema ID
            // Change the tabs value based on the new cinema ID
            this.tabs = await this.getNext7Days();
            this.activeTab = this.tabs[0].id;
            this.getMovieList(this.activeTab);
        }
    },
    methods: {
        async getNext7Days() {
            const tabs = [];
            const dates = await this.getFilterDate();
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const currentDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
            const today = currentDate.toISOString();
            dates.forEach((d) => {
                const date = new Date(d.date);
                const day = date.getDate();
                const month = date.toLocaleDateString('en-US', {
                    month: 'short'
                });
                const label = today === d.date ?
                    `Today, ${month}, ${day}` :
                    `${date.toLocaleDateString('en-US', { weekday:'short' })}, ${month}, ${day}`;
                tabs.push({
                    id: date.toISOString(),
                    date: date.toISOString(),
                    label
                });
            });
            return tabs;
        },
        async getMovieList(date) {
            try {
                this.isLoading = true;
                let url = this.selectedCinemaId ?
                    `${this.baseUrl}/scheduled-films?limit=100&date=${date}&vistaCinemaId=${this.selectedCinemaId}&sort=latest-released` :
                    `${this.baseUrl}/scheduled-films?limit=100&date=${date}&sort=latest-released`;
                const response = await axios.get(url);
                this.nowShowing = response.data.rows;
                this.isLoading = false;
            } catch (error) {
                console.error('Failed to fetch movie list:', error);
            }
        },
        async handleChange(tab) {
            this.activeTab = tab;
            await this.getMovieList(tab);
        },
        async getFilterDate() {
            try {
                let url = this.selectedCinemaId ?
                    `${this.baseUrl}/scheduled-films/filter-date?vistaCinemaId=${this.selectedCinemaId}` :
                    `${this.baseUrl}/scheduled-films/filter-date`;
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch filter date:', error);
            }
        }
    },
    mounted: async function() {
        this.tabs = await this.getNext7Days();
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