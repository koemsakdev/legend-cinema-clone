
export default {
    setup() {
        const count = Vue.ref(0)

        const increment = () => {
            count.value++
        }

        return { count, increment }
    },

    template: `
        <button @click="count++">
            Count is: {{ count }}
        </button>
    `
}