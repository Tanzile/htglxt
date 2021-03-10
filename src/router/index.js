import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    name: 'Home',
    component: () =>
        import ( /* webpackChunkName:home */ './../views/Home.vue')
      
}, {
    path: '/login',
    name: 'Login',
    component: () =>
        import ( /* webpackChunkName:login */ './../views/Login.vue')
}]

const router = new VueRouter({
    routes
})

export default router