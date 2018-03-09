<template>
    <div id="home" class="home">
        <home-sidebar class="home-aside">
            
        </home-sidebar>
        <div class="home-main">
            <div class="home-top"> 
                <label class="home-top__title">
                    {{  project.title }} 
                </label>
                <!-- <div class="home-top--right">
                    <el-button @click="triggerEditMode">自定配置</el-button>
                </div> -->
                </div>
            <div class="home-block__wrapper">
                <component
                    v-for="component in components" 
                    :is="component.name" 
                    :key="component.id" 
                    :is-edit-mode="isEditMode"
                    @close = "closeBlock(component.id)"
                />
            </div>
        </div>
        <el-dialog title="请选择">
        </el-dialog>
    </div>
</template>

<script>

import { getInfo, getTrail, getHomeInfoCnt } from './api';
import HomeSidebar from '../components/home-sidebar'
import Todo from '../components/todo'
import Calendar from '../components/calendar'
import Weather from '../components/weather'
import Statistics from '../components/statistics'
import Board from '../components/board'
import Gross from '../components/gross'
import { types } from '../../../packages/card/store';

import '../style.scss'

export default {
    name: 'home',
    components: {
        Todo,
        Calendar,
        Weather,
        Statistics,
        Board,
        Gross,
        HomeSidebar

    },
    data () {
        return {
            isEditMode: false,
            components: [
                {
                    id: 1,
                    name: 'weather'
                },
                {   
                    id: 2,
                    name: 'gross'
                },
                {
                    id: 3,
                    name: 'board'
                },
                {
                    id: 4,
                    name: 'statistics'
                },
                {
                    id: 5,
                    name: 'calendar'
                }
            ]
        }
    },
    computed:  {
        projectTitle () {
            return nenv.project.title
        },
    },
    methods: {
        triggerEditMode () {
            this.isEditMode = !this.isEditMode
        },
        closeBlock (id) {
            const self = this
            const index = self.components.findIndex(c => c.id === id)
            self.components.splice(index, 1)
        }
    },
    watch: {
        isEditMode (val) {
            this.$bus.$emit('trigger-home-edit-mode', val)
        }
    }
}
</script>
<style  lang ="scss" scoped>
    .home {
        &-aside {
            position: fixed;
            background-color: #fff;
            height: 100%;
            width: 280px;
        }
        &-main {
            background-color: rgba(248,249,250,1); 
            padding-left: 20px;
            margin-left: 280px;
        }

        &-top {
            line-height: 80px;
            margin: 10px;

            &__title {
                font-size: 20px;
                color: #9a9a9a;

            }

            &--right {
                float: right;
            }
        }
        &-block__wrapper {
            position: relative;
            display: flex;
            flex-direction: row;
            // justify-content: center;
            flex-wrap: wrap;
        }
    }
</style>


