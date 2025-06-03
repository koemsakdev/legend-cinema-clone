import CensorModal from "../components/censor-modal.js";
export default {
    name: "Detail",
    components: {
        CensorModal
    },
    data() {
        return {
            movieId: this.$route.params.id,
            cinemas: [],
            cinema: null,
            selectedCinemaId: null,
            censorRating: [],
            film: [],
            groupCinemas: [],
            baseUrl: "https://api.legend.com.kh",
            tabs: [{
                    id: 1,
                    name: "Showtime",
                },
                {
                    id: 2,
                    name: "Detail",
                },
            ],
            days: [],
            activeDay: '',
            activeTab: 1,
            showLocationList: false,
            activeCinemaId: null,
            isLoading: false,
            isCollapsed: {},
            showCensorModal: false,
            selectedSession: null,
        }
    },
    methods: {
        async getDays() {
            const tabs = [];
            const dates = await this.getFilterDate();
            dates.forEach((d) => {
                const date = new Date(d.date);
                const day = date.getDate();
                const month = date.toLocaleDateString('en-US', {
                    month: 'short'
                });
                const label = dates[0].date === d.date ?
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
        async getCinemas() {
            const res = await axios.get(`${this.baseUrl}/cinemas`);
            this.cinemas = res.data;
        },
        async getFilterDate() {
            try {
                let url = this.activeCinemaId ?
                    `${this.baseUrl}/scheduled-films/filter-date?vistaCinemaId=${this.activeCinemaId}` :
                    `${this.baseUrl}/scheduled-films/filter-date`;
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch filter date:', error);
            }
        },
        async getFilm(movieId) {
            try {
                const res = await axios.get(`${this.baseUrl}/scheduled-films/${movieId}`);
                this.film = res.data;
            } catch (error) {
                console.error('Failed to fetch movie list:', error);
            }
        },
        async getGroupCinemas(activeDay) {
            try {
                let url = this.activeCinemaId ?
                    `${this.baseUrl}/scheduled-films/${this.movieId}/group-sessions?date=${activeDay}&vistaCinemaId=${this.activeCinemaId}` :
                    `${this.baseUrl}/scheduled-films/${this.movieId}/group-sessions?date=${activeDay}`;
                const res = await axios.get(url);
                this.groupCinemas = res.data;
            } catch (error) {
                console.error('Failed to fetch group cinemas:', error);
            }
        },
        handleChangeTab(tab) {
            this.activeTab = tab.id;
        },
        async handleChangeDay(id) {
            this.activeDay = id;
            await this.getGroupCinemas(this.activeDay);
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
        formatTime(time) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return `${hours}h ${minutes}min`;
        },
        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            return `${formattedHours < 9 ? "0" + formattedHours : formattedHours }:${formattedMinutes} ${ampm}`;  
        },
        async getCensorRating(rating) {
            const res = await axios.get(`${this.baseUrl}/censor-ratings/${rating}`);
            this.censorRating = res.data;
        },
        handleShowLocationList() {
            this.showLocationList = !this.showLocationList;
        },
        handleCollapse(index) {
            this.$set(this.isCollapsed, index, !this.isCollapsed[index]);
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.legendLocationList;
            if (dropdown && !dropdown.contains(event.target)) {
                this.showLocationList = false;
            }
        },
        async handleChangeSelectLocation(cinemaId) {
            this.activeCinemaId = cinemaId;
            this.cinema = this.cinemas.find(cinema => cinema.vistaCinemaId === cinemaId);
            this.days = await this.getDays();
            this.activeDay = this.days[0].id;
            await this.getGroupCinemas(this.activeDay);

            this.showLocationList = false;
        },
        handleSessionClick(session) {
            this.selectedSession = session;
            this.showCensorModal = true;
        },
        handleCloseModal() {
            this.showCensorModal = false;
            this.selectedSession = null;
        }
    },
    async mounted() {
        this.days = await this.getDays();
        this.activeDay = this.days[0].id;

        await this.getFilm(this.movieId);
        await this.getCensorRating(this.film.rating);
        await this.getCinemas();
        await this.getGroupCinemas(this.activeDay);

        // console.log(this.censorRating.description);

        document.addEventListener('click', this.handleClickOutside);
    },
    template: `
        <div class="w-full overflow-x-hidden">
            <div class="container max-w-6xl mx-auto">
                <div class="absolute left-0 top-0 w-full overflow-hidden blur-lg h-[590px] xl:h-[670px]">
                    <img :src="film.backdropImageUrl" alt="Image slide" class="max-w-full transition-opacity opacity-100 h-full w-full object-cover" />
                    <div class="hero-overlay-1 absolute top-0 h-full w-full"></div>
                    <div class="hero-overlay-2 absolute bottom-0 h-[4.125rem] w-full backdrop-blur-[2px]"></div>
                </div>
                <div class="full-width lg:!left-auto lg:!ml-auto lg:!w-full lg:!max-w-none">
                    <div class="relative grid grid-cols-1 overflow-hidden bg-black lg:my-10 lg:max-h-[470px] lg:grid-cols-2 md:rounded-4xl">
                        <div class="order-2 py-6 pl-4 pr-4 md:py-14 lg:order-1 lg:pl-16">
                            <h1 class="break-all text-md font-bold md:text-2xl lg:text-4xl text-white"> {{ film.title }} </h1>
                            <div class="my-4 flex items-center gap-4 md:my-6 xl:mb-10 xl:mt-6">
                                <div class="w-6 md:w-10" v-for="(format, index) in film.formats" :key="index">
                                    <img :src="format.iconUrl"  alt="format.shortName" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-3 xl:gap-4">
                                <div class="flex items-center gap-2">
                                    <img src="/assets/genre.svg" alt="Genre">
                                    <div class="flex items-center gap-1 text-base">
                                        <span class="text-gray-300">Genre:</span>
                                        <span class="text-white">{{film.genreName}}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/assets/duration.svg" alt="Genre">
                                    <div class="flex items-center gap-1 text-base">
                                        <span class="text-gray-300">Duration:</span>
                                        <span class="text-white"> {{formatTime(film.runTime)}} </span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/assets/release-date.svg" alt="Genre">
                                    <div class="flex items-center gap-1 text-base">
                                        <span class="text-gray-300">Release:</span>
                                        <span class="text-white">{{ formatDate(film.openingDate) }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="/assets/classification.svg" alt="Genre">
                                    <div class="flex items-center gap-1 text-base">
                                        <span class="text-gray-300">Classification:</span>
                                        <span class="text-white">{{film.rating}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative order-1 max-h-[470px] lg:order-2">
                            <img :src="film.bannerImageUrl" :alt="film.title" class="max-w-full transition-opacity opacity-100 h-full w-full object-cover">
                            <button class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 p-4 cursor-pointer" :class="[film.trailerUrl == '' ? 'hidden' : 'block']">
                                <img src="assets/play.svg" alt="Play Icon">
                            </button>
                            <div class="absolute bottom-0 left-0 h-[200px] w-full bg-gradient-to-t from-black to-black/0 lg:top-0 lg:h-full lg:w-[200px] lg:bg-gradient-to-r"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <div class="full-width">
                    <div class="border-bottom-linea-divider bg-gradient-to-b from-black/0 to-[#090909] backdrop-blur-xs py-5 md:py-9 mb-4 md:mb-10">
                        <div class="container max-w-6xl mx-auto flex items-center gap-1 justify-center">
                            <template
                                v-for="(tab, index) in tabs"
                                :key="tab.id"
                            >
                                <button
                                    @click="handleChangeTab(tab)"
                                    :class="[
                                        'px-4 text-lg md:text-2xl rounded-none transition-colors cursor-pointer duration-300 ease-in-out bg-transparent',
                                        activeTab === tab.id
                                            ? 'text-white font-normal'
                                            : 'text-gray-300/75 hover:text-gray-200'
                                    ]"
                                >
                                    {{ tab.name }}
                                </button>
                                <div v-if="index < tabs.length - 1" class="w-[2px] h-10 bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-auto">
                <div class="mt-10">
                    <div v-if="activeTab === 1" class="animate-fade-in mx-6 lg:mx-0">
                        <div class="max-w-6xl mx-auto mb-[4.75rem]">
                            <h1 class="text-2xl font-bold md:text-4xl text-white">Showtime</h1>

                            <div class="my-4 md:mb-6 md:mt-10">
                                <div class="relative z-50 w-full rounded-md border border-white/5 bg-white/5" ref="legendLocationList">
                                    <button class="w-full cursor-pointer" @click="handleShowLocationList">
                                        <div class="flex w-full items-center justify-between p-4 lg:p-6">
                                            <p class="text-sm text-gray-200 line-clamp-1">{{cinema == null ? 'All Cinemas' : cinema.name}}</p>
                                            <svg :class="[showLocationList ? 'transition rotate-180' : 'transition']" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.594154 0.592566L0.594622 0.592089C0.66344 0.521721 0.72368 0.5 0.798736 0.5C0.873738 0.5 0.933524 0.521663 1.00175 0.591612L1.00222 0.592089L5.63463 5.3288L5.99209 5.69432L6.34956 5.3288L10.9978 0.575923C11.0463 0.526343 11.0995 0.5 11.1937 0.5C11.2772 0.5 11.3391 0.524277 11.4054 0.59209C11.4744 0.662668 11.5 0.729488 11.5 0.816719C11.5 0.903889 11.4745 0.97023 11.4059 1.04017C11.4059 1.04019 11.4059 1.04021 11.4058 1.04023L6.07783 6.47204L6.07732 6.47257C6.06745 6.48265 6.06072 6.48766 6.05762 6.48974C6.0547 6.49169 6.05442 6.49145 6.05653 6.49068C6.04281 6.49573 6.02354 6.50014 5.99465 6.5L5.99465 6.49999L5.99209 6.49999C5.96242 6.49999 5.94224 6.4954 5.92766 6.49003C5.92936 6.49066 5.92878 6.49072 5.92567 6.48865C5.92243 6.48649 5.91576 6.48154 5.90612 6.4718C5.90598 6.47166 5.90584 6.47151 5.9057 6.47137L0.578812 1.02454C0.527362 0.971928 0.5 0.913489 0.5 0.816072C0.5 0.72888 0.52555 0.662528 0.594154 0.592566Z" fill="white" stroke="white"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <!-- Default hiddend -->
                                    <ul class="absolute max-h-[60vh] w-full overflow-y-auto rounded-xl p-4 backdrop-blur-2xl left-0 border border-gray-500/50" :class="[showLocationList ? 'block' : 'hidden']">
                                        <li class="cursor-pointer" @click="handleChangeSelectLocation(null)">
                                            <div class="flex items-center gap-2">
                                                <img src="assets/location.svg" alt="Cinema Flag" class="img size-5 text-red-500" />
                                                <span :class="[activeCinemaId === null ? 'text-red-500' : 'text-gray-200', 'text-base font-light line-clamp-1']">All Cinemas</span>
                                            </div>
                                            <div class="divider my-2 last:hidden"></div>
                                        </li>
                                        <li
                                            v-for="(cinema, index) in cinemas"
                                            :key="index"
                                            @click="handleChangeSelectLocation(cinema.vistaCinemaId)"
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

                            <div class="max-w-full overflow-x-scroll hide-scrollbar">
                                <div class="flex items-center w-full space-x-4">
                                    <div
                                        v-for="(day) in days"
                                        :key="day.id"
                                        class="last:pr-4 focus:outline-none sm:last:pr-12 md:last:pr-8 lg:last:pr-24 xl:last:pr-[10.5rem] pointer-events-auto"
                                    >
                                        <button
                                            @click="handleChangeDay(day.id)"
                                            :class="[
                                                'opacity-100 w-[60px] rounded-[10px] border border-gray-500 bg-black p-2 lg:w-[10.25rem] cursor-pointer',
                                                activeDay === day.id
                                                    ? 'font-normal border-red-500 hover:border-red-500 border-2' 
                                                    : 'border-0.5 hover:border-white'
                                            ]"
                                        >
                                            <div class="flex flex-col">
                                                <p class="text-gray-300 text-xs sm:text-sm">{{ day.label.split(",")[0] }}</p>
                                                <h3 class="text-white font-extrabold text-lg">{{ day.label.split(",")[2] }}</h3>
                                                <p class="text-gray-300 text-xs sm:text-sm">{{ day.label.split(",")[1] }}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Collapse fade in and out -->
                        <div class="full-width">
                            <div class="mb-[1.75rem] mt-6 md:[&:not(:last-child)]:mt-[3.75rem]">
                                <template v-for="(group, index) in groupCinemas" :key="index">
                                    <template v-if="group.formats.length > 0">
                                        <button class="w-full bg-gradient-to-r from-gray-700/10 via-gray-700/30 to-gray-700/10 first:mt-0 cursor-pointer" @click="handleCollapse(index)">
                                            <div class="max-w-6xl mx-auto flex items-center justify-between gap-4 py-[1.125rem] border-bottom-linea-divider">
                                                <h3 class="font-bold md:text-md text-white">{{ group.name }}</h3>
                                                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" :class="[isCollapsed[index] ? 'transition' : 'transition rotate-180']">
                                                    <path
                                                        d="M0.594154 0.592566L0.594622 0.592089C0.66344 0.521721 0.72368 0.5 0.798736 0.5C0.873738 0.5 0.933524 0.521663 1.00175 0.591612L1.00222 0.592089L5.63463 5.3288L5.99209 5.69432L6.34956 5.3288L10.9978 0.575923C11.0463 0.526343 11.0995 0.5 11.1937 0.5C11.2772 0.5 11.3391 0.524277 11.4054 0.59209C11.4744 0.662668 11.5 0.729488 11.5 0.816719C11.5 0.903889 11.4745 0.97023 11.4059 1.04017C11.4059 1.04019 11.4059 1.04021 11.4058 1.04023L6.07783 6.47204L6.07732 6.47257C6.06745 6.48265 6.06072 6.48766 6.05762 6.48974C6.0547 6.49169 6.05442 6.49145 6.05653 6.49068C6.04281 6.49573 6.02354 6.50014 5.99465 6.5L5.99465 6.49999L5.99209 6.49999C5.96242 6.49999 5.94224 6.4954 5.92766 6.49003C5.92936 6.49066 5.92878 6.49072 5.92567 6.48865C5.92243 6.48649 5.91576 6.48154 5.90612 6.4718C5.90598 6.47166 5.90584 6.47151 5.9057 6.47137L0.578812 1.02454C0.527362 0.971928 0.5 0.913489 0.5 0.816072C0.5 0.72888 0.52555 0.662528 0.594154 0.592566Z"
                                                        fill="white" stroke="white">
                                                    </path>
                                                </svg>
                                            </div>
                                        </button>
                                        <div class="container max-w-6xl mx-auto mb-[1.75rem]" v-for="(format, index) in group.formats" :key="index" :class="[isCollapsed[index] ? 'transition hidden' : 'transition block']">
                                            <div class="my-10 [&:not(:last-child)]:mb-6 flex flex-wrap items-center gap-4">
                                                <div class="mb-6">
                                                    <img
                                                        :src="format.iconUrl"
                                                        class="h-8 md:h-10" :alt="format.shortName">
                                                </div>
                                            </div>
                                            <div class="[&:not(:last-child)]:mb-10" v-for="(g, index) in format.groups" :key="index">
                                                <div class="mb-6 flex flex-wrap items-center gap-2">
                                                    <div class="flex items-center gap-1 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-white [&:not(:first-child)]:pl-2" v-for="(attr, index) in g.attributes" :key="index">
                                                        <img :src="attr.iconUrl" class="h-[22px] object-cover" :alt="attr.shortName">
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap items-center gap-x-2 gap-y-2.5 md:gap-6">
                                                    <button 
                                                        v-for="(sess, index) in g.sessions"
                                                        :key="index"
                                                        @click="handleSessionClick(sess)"
                                                        class="flex items-center justify-center rounded-full border border-white text-white bg-gradient-to-r from-gray-dark/25 from-0% via-white/10 via-100% to-100% px-4 py-2.5 text-xs md:w-[10.25rem] md:py-3.5 md:text-base cursor-pointer"
                                                    >
                                                        {{ formatDateTime(sess.startTime) }}
                                                    </button>

                                                    <censor-modal
                                                        :show="showCensorModal"
                                                        :title="'Age Restriction'"
                                                        :description="'This movie is rated ' + film.rating + '. Are you 18 or older?'"
                                                        :redirect-path="'/booking/' + (selectedSession ? selectedSession.id : '')"
                                                        @close="handleCloseModal"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeTab === 2" class="animate-fade-in px-6 lg:px-0 max-w-6xl mx-auto">
                        <div class="mb-[4.75rem]">
                            <h1 class="text-xl font-bold md:text-4xl text-white">Synopsis</h1>
                            <p class="mt-6 text-gray-200">{{film.synopsis}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}