import Vue from 'vue';
import Vuex from 'vuex';
import { INIT_STATE, ADD_TODOITEM, REMOVE_TODOITEM, TOGGLE_TODOITEM, ADD_SEARCHITEM, REMOVE_SEARCHITEM } from './mutation_type.js';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        todoList: [],
        favorite: [],
        searchList: [//<?>用于替换keyword
            {
                name:'NPM',
                url:'https://www.npmjs.com/-/search?text=<?>&from=0&size=10&quality=1.95&popularity=3.3&maintenance=2.05',
                style:{
                    backgroundColor: 'red',
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
        ]
    },
    getters: {

    },
    actions: {
        //异步获取数据    
    },
    mutations: {
        [INIT_STATE](state, payload){
            state = Object.assign({},payload.state);
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
