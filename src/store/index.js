import Vue from 'vue';
import Vuex from 'vuex';
import {
    RESET_STATE, INIT_STATE,
    ADD_TODOITEM, REMOVE_TODOITEM, TOGGLE_TODOITEM, UPDATE_TODOLIST,
    ADD_SEARCHITEM, REMOVE_SEARCHITEM,
    ADD_FAVORITEITEM, REMOVE_FAVORITEITEM,
    TOGGLE_CONTENT
} from './mutation_type.js';
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
const defaultFavorite = [
    {
        label:'FE Learning',
        children:[
            {
                label:'Stackoverflow',
                url:'http://www.stackoverflow.com'
            },
            {
                label:'ES6入门',
                url:'http://es6.ruanyifeng.com/#docs/intro'
            }
        ]
    },
    {
        label:'Daily Life',
        children:[
            {
                label:'Search Engine',
                children:[
                    {
                        label:'Chrome',
                        url:'http://www.chrome.com'
                    },
                    {
                        label:'Baidu',
                        url:'http://www.baidu.com'
                    },
                    {
                        label:'Bing',
                        url:'http://www.bing.com'
                    }
                ]
            },
            {
                label:'Github',
                url:'http://www.github.com'
            }
        ]
    }
];
export default new Vuex.Store({
    state: {
        todoList: [],
        favoriteList: [...defaultFavorite],
        searchList: [...defaultSearchList],
        showContent: true
    },
    getters: {
    },
    actions: {
        //异步获取数据
        getChromeStorage ({commit}) {
            getStorage(["devDesk_todoList","devDesk_favoriteList","devDesk_searchList"], (res) => {
                commit(INIT_STATE ,{
                    todoList: res.devDesk_todoList,
                    favoriteList: res.devDesk_favoriteList,
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
            state.favoriteList = [...defaultFavorite];
            state.searchList = [...defaultSearchList];
        },
        [INIT_STATE](state, payload){
            if(payload.todoList && payload.todoList.length !== 0){
                state.todoList = payload.todoList;
            }
            if(payload.favoriteList && payload.favoriteList.length !== 0){
                state.favoriteList = payload.favoriteList;
            }
            if(payload.searchList && payload.searchList.length !== 0){
                state.searchList = payload.searchList;
            }
            if(payload.showContent !== undefined && typeof payload.showContent === 'boolean'){
                state.showContent = payload.showContent;
            }
        },
        [UPDATE_TODOLIST](state, payload){
            state.todoList = payload.slice(0);
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
        },
        [ADD_FAVORITEITEM](state, payload){
            let { type, url, label, pos } = payload.content;
            let content = null; let funcBody = '';
            if(type === 'bookmark'){
                content = { label, url };
            }else{
                content = { label, children: [] };
            }
            if(pos === '0'){
                funcBody = `list.push(item)`;
            }else{
                let posList = pos.slice(2).split(',');
                funcBody = `list[${posList.join('].children[')}].children.push(item)`;
            }
            //list.push() 0
            //list[0].children.push() 0,0
            //list[0].children[0].children.push() 0,0,0
            new Function('list','item',funcBody).call(this, state.favoriteList, content);
        },
        [REMOVE_FAVORITEITEM](state, payload){
            let posList = payload.pos.slice(2).split(',');
            let index = posList.pop();
            let funcBody = '';
            if(posList.length === 0){
                funcBody = `list.splice(${index},1)`;
            }else{
                funcBody = `list[${posList.join('].children[')}].children.splice(${index},1)`;
            }
            //list.splice(0,1) 0
            //list[0].children.splice(0,1) 0,0
            new Function('list',funcBody).call(this, this.state.favoriteList);
        }
    }
});
