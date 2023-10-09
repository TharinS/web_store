// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Product from '@/components/Products.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Orders from '@/components/Orders.vue';
import Logout from '@/components/Logout.vue';
import OrderHistory from '@/components/OrderHistory.vue';
import MoreDetails from '@/components/MoreDetails.vue';

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/category/:category',
        name: 'category',
        component: Product,
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
    {
        path: '/orderhistory',
        name: 'orderhistory',
        component: OrderHistory
    },
    {
        path: '/more_details/:order_id',
        name: 'more_details',
        component: MoreDetails,
        props: true
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;