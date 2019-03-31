import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/components/Home'
import Fuel from './components/Fuel'
import PlateNumber from '@/components/PlateNumber'
import Report from './components/Report'
import Request from './components/Request'
import TaskList from './components/TaskList'
import Login from './components/Login'

let routes=[
    {path:'/',component:Home},
    {path:'/home',component:Home},
    {path:'/fuel',component:Fuel},
    {path:'/Platenumber',component:PlateNumber},
    {path:'/report',component:Report},
    {path:'/request',component:Request},
    {path:'/tasklist',component:TaskList},
    {path:'/login',component:Login},
];
const router = new VueRouter({mode:"history", routes});

export default router;
