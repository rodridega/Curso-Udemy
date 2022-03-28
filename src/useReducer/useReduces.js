

const initialState = [{
    id: 1,
    todo: 'aprender React',
    done: false
}]

const todoReducer = (state = initialState, action) => {

    if (action.type==='agregar') {
        return [...state, action.payload]
    }
    return state
}

const newTodo = {
    id: 2,
    todo: 'Aprender firebase',
    done: false
}

const agregarTodoAction = {
    type: 'agregar',
    payload: newTodo
}

let todos = todoReducer(todos, agregarTodoAction)