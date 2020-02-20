import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('views/index/Index')
const Home = () => import('index/home/Home')
const Community = () => import('index/community/Community')
const Member = () => import('index/member/Member')
const Profile = () => import('index/profile/Profile')


const Login = () => import('views/login/Login')

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
    
]
const router = new VueRouter({   
    routes,
    mode:'history'
})

export default router