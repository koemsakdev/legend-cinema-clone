import navbar from "../components/navbar.js";
import navfooter from "../components/nav-footer.js";
import Home from "../pages/Home.js";
import Search from "../pages/Search.js";
import Detail from "../pages/Detail.js";

const routes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/movies/:id', component: Detail },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), 
    routes,
});

const app = Vue.createApp({})
app.component('Navbar', navbar)
app.component('NavFooter', navfooter)

app.use(router);
app.mount('#app')