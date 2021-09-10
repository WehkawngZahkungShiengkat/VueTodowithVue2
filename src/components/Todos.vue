<template>
    <div class="legend">
        <h1>TO DOs</h1>
        <div>
            <span>Double click to mark as Complete</span>
            <span>
                <span class="incomplete-box"></span> = Incomplete
            </span>            
            <span>
                <span class="complete-box"></span> = Complete
            </span>
        </div>
        <div class="todos">
            <div @dblclick="onDbClick(todo)" v-for="todo in allTodos" :key="todo.id" class="todo" :class="{'todoDone': todo.completed}">
                {{todo.title}}
                <i @click="deleteTodo(todo.id)" class="fa fa-trash-o"></i>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Todos",
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
        onDbClick(td) {
            console.log("onDBC: ", td);
            const updTodo = {
                id: td.id,
                title: td.title,
                completed: !td.completed
            }
            this.updateTodo(updTodo)
        }
    },
    computed: mapGetters(['allTodos']),
    created() {
        this.fetchTodos();
    }
}
</script>

<style scoped>
    .todos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .todo {
        border: 1px solid #ccc;
        background: #41b883;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .todoDone {
        background: #a6ccbb;
        color: white;
    }

    i {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
    }

    .incomplete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #41b883;
    }

    .complete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #a6ccbb;
    }

    @media (max-width: 500px) {
        .todos {
            grid-template-columns: 1fr;
        }
    }
</style>