let todoListingData = [
]

let id = 0;

async function getAccount() {
    return {
        name: 'Yogendra Bhanu Singh',
        id: 1
    }
}

async function getToDoListing(userId) {
    return todoListingData;
}

async function saveToDo(toDoData) {
    toDoData['id'] = ++id;
    toDoData['completeStatus'] = false;
    todoListingData.push(toDoData);
    return toDoData;
}

async function deleteToDo(id) {
    var idx = todoListingData.findIndex((el) => { return el.id == id });
    if (idx > -1) {
        todoListingData.splice(idx, 1);
    }
}

async function markCompleteTodo(id) {
    var idx = todoListingData.findIndex((el) => { return el.id == id });
    if (idx > -1)
        todoListingData[idx].completeStatus = !todoListingData[idx].completeStatus;
}

export default { getAccount, getToDoListing, saveToDo, deleteToDo, markCompleteTodo };