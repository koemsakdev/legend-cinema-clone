import DayTaps from "./day-taps.js";
import monthTaps from "./month-taps.js";
export default {
    name: 'MovieTabs',
    components: {
        DayTaps,
        monthTaps
    },
    props: {
        selectedCinemaId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            activeTab: 'now-showing',
            tabs: [{
                    id: 'now-showing',
                    label: 'Now Showing'
                },
                {
                    id: 'coming-soon',
                    label: 'Coming Soon'
                }
            ]
        }
    },
    template: `
        <div class="container max-w-6xl mx-auto mt-8 px-4 md:px-0">
            <div class="flex items-center w-full space-x-0 rounded-full bg-linear-to-r from-slate-800/25 via-white/10 to-slate-800/25 md:bg-none">
                <template v-for="(tab, index) in tabs" :key="tab.id">
                    <button
                        @click="activeTab = tab.id"
                        :class="[
                            'px-4 md:px-6 py-2 md:py-5 rounded-full text-base md:text-3xl md:rounded-none transition-colors cursor-pointer duration-300 ease-in-out w-full md:w-auto',
                            activeTab === tab.id
                                ? 'bg-red-500 md:bg-transparent text-white font-normal md:font-bold' 
                                : 'text-gray-300/75 hover:text-gray-200'
                        ]"
                    >
                        {{ tab.label }}
                    </button>
                    <div v-if="index < tabs.length - 1" class="hidden md:block w-[2px] h-10 bg-gradient-to-b from-transparent via-gray-200/50 to-transparent mx-6"></div>
                </template>
            </div>

            <div class="mt-10">
                <div v-if="activeTab === 'now-showing'" class="animate-fade-in">
                    <day-taps :selected-cinema-id="selectedCinemaId"></day-taps>
                </div>
                <div v-else class="animate-fade-in">
                    <month-taps></month-taps>
                </div>
            </div>
        </div>
    `
}