import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/home',
        name: 'Home',
        component: () =>
            import('./../views/Home.vue'),
        children: [{
                path: '/',
                redirect: 'welcome'
            },
            {
                path: "users",
                name: "Users",
                component: () =>
                    import('../components/home_children/users.vue'),
            },
            {
                path: "roles",
                name: "Roles",
                component: () =>
                    import('../components/home_children/roles.vue'),
            },
            {
                path: "rights",
                name: "Rights",
                component: () =>
                    import('../components/home_children/rights.vue'),
            },
            {
                path: "goods",
                name: "Goods",
                component: () =>
                    import('../components/home_children/goods.vue'),
            },
            {
                path: "params",
                name: "Params",
                component: () =>
                    import('../components/home_children/params.vue'),
            },
            {
                path: "categories",
                name: "Categories",
                component: () =>
                    import('../components/home_children/categories.vue'),
            },
            {
                path: "orders",
                name: "Orders",
                component: () =>
                    import('../components/home_children/orders.vue'),
            },
            {
                path: "reports",
                name: "Reports",
                component: () =>
                    import('../components/home_children/reports.vue'),
            },
            {
                path: "welcome",
                name: "Welcome",
                component: () =>
                    import('../components/home_children/welcome.vue'),
            },
            {
                path: "addgoods",
                name: "addgoods",
                component: () =>
                    import('../components/home_goods/add_goods.vue'),
            },
        ]
    },
    //login
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('./../views/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router