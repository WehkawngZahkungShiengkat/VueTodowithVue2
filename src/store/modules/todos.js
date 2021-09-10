import axios from "axios";

const state = {
    todos : [
        // {
        //     id: 1,
        //     title: 'Hi loo'
        // },
        // {
        //     id: 2,
        //     title: 'Hell loo'
        // }
    ],
};

const getters = {
    allTodos : state => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        // console.log(response.data);
        commit('setTodos', response.data);
    },
    
    async addTodo({ commit }, title ) {
        console.log("title - ", title)
        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/todos", {title: title, completed: false }
            );
        console.log(response.data);
        commit('newTodo', response.data);
    } ,

    async deleteTodo({ commit }, id ) {
        await axios.delete(
            `https://jsonplaceholder.typicode.com/todos/${id}`
            );
        commit('removeTodo', id);
    } ,

    async filterTodos({ commit }, e ) {
        const limitN = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limitN}`
            );
        commit('setTodos', response.data);
    } ,

    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo
        );
        console.log(response.data);
        commit('updateTodo', response.data)
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updateTodo: (state, data) => {
        const index = state.todos.findIndex(todo => todo.id === data.id);
        if (index !== -1) {
            state.todos.splice(index, 1, data)
        }
    } 
};

export default {
    state,
    getters,
    actions,
    mutations
};