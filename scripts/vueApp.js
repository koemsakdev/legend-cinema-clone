import navbar from "../components/navbar.js";
import movies from "../components/movie-tabs.js";
import tesnimol from "../components/tesnimol.js";
import navfooter from "../components/nav-footer.js";

const routes = [
    { path: '/', component: navbar },
    // Add other routes here, e.g., { path: '/about', component: AboutPage }
];

const router = VueRouter.createRouter({
    // Use createWebHashHistory for hash mode (e.g., #/path)
    // Or createWebHistory() for HTML5 history mode (requires server config)
    history: VueRouter.createWebHashHistory(), 
    routes,
});

const app = Vue.createApp({})
app.component('MovieTabs', movies)
app.component('Tesnimol', tesnimol)
app.component('Navbar', navbar)
app.component('NavFooter', navfooter)

app.use(router);
app.mount('#app')