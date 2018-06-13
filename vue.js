const STORAGE_KEY="todos-storage"
var content = new Vue({
    el: '#content',
    data: {
        todos: [],
        newTodo: '',
        //儲存輸入的待辦事項
        editedTodo:null,
    },
    created(){
        this.todos =JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
     //重整頁面後代辦事項不因重整而清除
    },
    methods: {
        addTodo(todo) {
            this.todos.push({content:todo,completed:false,})
            //vue需要透過this去取資料          
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
            //將資料存在localstorage

        },
        removeTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        },
        editTodo(todo){
            this.editedTodo = todo;
        },
        doneEdit(todo){
            if(!this.editedTodo){
                return
            }
            this.editedTodo = null,
            todo.content = todo.content.trim();
            if(!todo.content){
                this.removeTodo(todo);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
            //記得做任何刪減新增功能必須都要補上localstorage程式碼
        }
    },
})