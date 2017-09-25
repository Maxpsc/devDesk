import Vue from 'vue';
import Vuex from 'vuex';
import { RESET_STATE, INIT_STATE, ADD_TODOITEM, REMOVE_TODOITEM, TOGGLE_TODOITEM, ADD_SEARCHITEM, REMOVE_SEARCHITEM, TOGGLE_CONTENT } from './mutation_type.js';
import { getStorage } from '@/services/storage';

Vue.use(Vuex);
const defaultSearchList = [//<?>用于替换keyword
    {
        name:'NPM',
        url:'https://www.npmjs.com/-/search?text=<?>&from=0&size=10&quality=1.95&popularity=3.3&maintenance=2.05',
        style:{
            backgroundColor: '#c02228',
            color: '#FFF'
        }
    },
    {
        name:'MDN',
        url:'https://developer.mozilla.org/zh-CN/search?q=<?>&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=canvas&topic=svg&topic=webgl&topic=mobile&topic=webdev&topic=http&topic=webext',
        style:{
            backgroundColor: '#FFF',
            color: 'blue'
        }
    },
    {
        name:'CAN I USE',
        url:'http://caniuse.com/#search=<?>',
        style:{
            backgroundColor: '#DB5600',
            color: '#FFF'
        }
    }
];

export default new Vuex.Store({
    state: {
        todoList: [],
        favorite: [],
        searchList: [...defaultSearchList],
        showContent: true
    },
    getters: {

    },
    actions: {
        //异步获取数据
        getChromeStorage ({commit}) {
            getStorage(["devDesk_todoList","devDesk_favorite","devDesk_searchList"], (res) => {
                console.log(res);
                commit(INIT_STATE ,{
                    todoList: res.devDesk_todoList,
                    favorite: res.devDesk_favorite,
                    searchList: res.devDesk_searchList
                });
            });
        }
    },
    mutations: {
        [TOGGLE_CONTENT](state){
            state.showContent = !state.showContent;
        },
        [RESET_STATE](state, payload){
            state.todoList = [];
            state.favorite = [];
            state.searchList = [...defaultSearchList];
        },
        [INIT_STATE](state, payload){
            if(payload.todoList && payload.todoList.length !== 0){
                state.todoList = payload.todoList;
            }
            if(payload.favorite && payload.favorite.length !== 0){
                state.favorite = payload.favorite;
            }
            if(payload.searchList && payload.searchList.length !== 0){
                state.searchList = payload.searchList;
            }
        },
        [ADD_TODOITEM](state, payload){
            state.todoList.unshift(payload.item);
        },
        [REMOVE_TODOITEM](state, payload){
            state.todoList.splice(payload.index, 1);
        },
        [TOGGLE_TODOITEM](state, payload){
            let target = state.todoList[payload.index];
            target.status = target.status === 'undo' ? 'done' : 'undo';
        },
        [ADD_SEARCHITEM](state, payload){
            state.searchList.push(payload.item);
        },
        [REMOVE_SEARCHITEM](state, payload){
            state.searchList.splice(payload.index, 1);
        }
    }
});
