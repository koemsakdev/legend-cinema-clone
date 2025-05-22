import HeaderComponent from "../components/script-components/header.js"
import navbar from "../components/script-components/navbar.js"

const { createApp, ref, h } = Vue

createApp({
    components: {
        navbar,
        HeaderComponent
    },
    // template: `
    //     <div>
    //         <HeaderComponent />
    //         <navbar />
    //     </div>
    // `
}).mount("#app")