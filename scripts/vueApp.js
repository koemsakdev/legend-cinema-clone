import navbar from "../components/navbar.js";
import movies from "../components/movie-tabs.js";
import tesnimol from "../components/tesnimol.js";
import navfooter from "../components/nav-footer.js";
const app = Vue.createApp({})
app.component('MovieTabs', movies)
app.component('Tesnimol', tesnimol)
app.component('Navbar', navbar)
app.component('NavFooter', navfooter)

app.mount('#app')