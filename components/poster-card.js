export default {
    name: 'PosterCard',
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });
            const year = dateObj.getFullYear();
            return `${day} ${month} ${year}`;
        }
    },
    template: `
        <div class="w-full h-full">
            <router-link :to="'/movies/' + movie.hopk" class="flex flex-col gap-4">
                <div class="relative h-full w-full overflow-hidden">
                    <img :src="movie.bannerImageUrl" alt="Image Banner" class="max-w-full transition-opacity opacity-100 h-auto w-full rounded-xl">
                    <div class="absolute left-0 top-0 h-[115px] w-[124px]">
                        <div v-if="movie.isAdvancedTicket" class="absolute top-1/2 flex items-center justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-[300px] z-10 h-8 origin-center bg-red-500">
                            <p class="text-sm font-bold text-white/85">Advance Ticket</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <p class="text-gray-400 text-base font-normal">{{ formatDate(movie.openingDate) }}</p>
                    <img :src="movie.ageRatingImageUrl" alt="Image Rate" class="img object-cover">
                </div>
                <p class="text-white text-base font-medium">{{ movie.title }}</p>
            </router-link>
        </div>
    `
}