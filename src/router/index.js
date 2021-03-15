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
            import ( /* webpackChunkName:home */ './../views/Home.vue'),
        children: [{
                path: '/',
                redirect: 'welcome'
            },
            {
                path: "users",
                name: "Users",
                component: () =>
                    import ( /* webpackChunkName:users */ '../components/home_children/users.vue'),
            },
            {
                path: "roles",
                name: "Roles",
                component: () =>
                    import ( /* webpackChunkName:roles */ '../components/home_children/roles.vue'),
            },
            {
                path: "rights",
                name: "Rights",
                component: () =>
                    import ( /* webpackChunkName:rights */ '../components/home_children/rights.vue'),
            },
            {
                path: "goods",
                name: "Goods",
                component: () =>
                    import ( /* webpackChunkName:goods */ '../components/home_children/goods.vue'),
            },
            {
                path: "params",
                name: "Params",
                component: () =>
                    import ( /* webpackChunkName:params */ '../components/home_children/params.vue'),
            },
            {
                path: "categories",
                name: "Categories",
                component: () =>
                    import ( /* webpackChunkName:categories */ '../components/home_children/categories.vue'),
            },
            {
                path: "orders",
                name: "Orders",
                component: () =>
                    import ( /* webpackChunkName:orders */ '../components/home_children/orders.vue'),
            },
            {
                path: "reports",
                name: "Reports",
                component: () =>
                    import ( /* webpackChunkName:reports */ '../components/home_children/reports.vue'),
            },
            {
                path: "welcome",
                name: "Welcome",
                component: () =>
                    import ( /* webpackChunkName:welcome */ '../components/home_children/welcome.vue'),
            },
        ]
    },
    //login
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName:login */ './../views/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router