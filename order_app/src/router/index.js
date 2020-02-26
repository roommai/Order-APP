import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('views/index/Index')
const Home = () => import('index/home/Home')
const Community = () => import('index/community/Community')
const Member = () => import('index/member/Member')
const Profile = () => import('index/profile/Profile')


const Login = () => import('views/login/Login')
const Forget = () => import('views/forget/Forget')
const Edit = () => import('views/edit/Edit')
    const Name = () => import('views/edit/children/Name')
    const UserName = () => import('views/edit/children/UserName')
    const Sign = () => import('views/edit/children/Sign')
    const Email = () => import('views/edit/children/Email')

const Setting = () => import('views/setting/Setting')
const CradSwiper = () => import('views/cardswiper/CradSwiper')
const Amend = () => import('views/setting/childComps/Amend')
const Search = () => import('views/search/Search')
const Shop = () => import('views/shop/Shop')
const Takeout = () => import('views/takeout/Takeout')
const Order = () => import('views/order/Order')
const Delivery = () => import('views/delivery/Delivery')
const Newly = () => import('views/delivery/Newly')
const Payment = () => import('views/payment/Payment')

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}


Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: { title: '首页' },
            },
            {
                path: '/community',
                name: 'community',
                component: Community,
                meta: { title: '社区' }
            },
            {
                path: '/member',
                name: 'member',
                component: Member,
                meta: { title: '会员' }
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile,
                meta: { title: '我的' }
            }
        ]
    },
    {
        path: '/login',
        component: Login,

    },
    {
        path: '/forget',
        component: Forget,
        meta: {title: '用户修改密码'}
    },
    {
        path: '/setting',
        component: Setting,
        meta: {
            keepAlive: false, // 此组件需要被缓存
        }
    },
    {
        path: '/edit',
        component: Edit,
        meta: {title: '个人资料'},
    },
    {
        path: "/name",
        component: Name,
    },
    {
        path: "/userName",
        component: UserName,
    },
    {
        path: "/sign",
        component: Sign,
    },
    {
        path: "/email",
        component: Email,
    },
    {
        path: "/cardswiper",
        component: CradSwiper,
    },
    {
        path: "/amend",
        component: Amend,
    },
    {
        path: "/search",
        component: Search,
    },
    {
        path: "/shop",
        component: Shop,
    },
    {
        path: "/Takeout",
        component: Takeout,
    },
    {
        path: "/order",
        component: Order,
    },
    {
        path: "/delivery",
        component: Delivery,
    },
    {
        path: "/newly",
        component: Newly,
    },
    {
        path: "/payment",
        component: Payment,
    },
    
]
const router = new VueRouter({ 
    routes,
    scrollBehavior(to, from,savedPosition) {
        return {
          x: 0,
          y: 0
        }
      },    
    mode:'history'
})

export default router