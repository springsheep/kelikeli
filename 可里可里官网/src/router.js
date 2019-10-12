import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            redirect:'/pc'
        },
        {
            path:'/pc',
            name:'office',
            component:()=>import('./components/office/office.vue')
        },
        {
            path:'/mobile',
            name:'office2',
            component:()=>import('./components/mobile-office/office2.vue')
        }
    ]
})
