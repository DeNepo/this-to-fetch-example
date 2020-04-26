const appThis = {
  // data
  todos: [],
  nextId: 1,

  // data access methods
  getAll: function () {
    return this.todos;
  },
  postTodo: function (newTodo) {
    newTodo.id = this.nextId;
    this.todos.push(newTodo);
    this.nextId += 1;
    return newTodo;
  },
  getOne: function (id) {
    return this.todos
      .find(todo => todo.id === id);
  },
  putTodo: function (id, putter) {
    const foundEntry = this.todos
      .find(entry => entry.id === id);
    if (foundEntry) {
      putter.id = id;
      const indexOf = this.todos.indexOf(foundEntry);
      this.todos[indexOf] = putter;
    };
    return putter;
  },
  patchTodo: function (id, patcher) {
    const foundEntry = this.todos
      .find(entry => entry.id === id);
    if (foundEntry) {
      for (let key in patcher) {
        foundEntry[key] = patcher[key];
      }
    };
    return foundEntry;
  },
  deleteTodo: function (id) {
    this.todos = this.todos
      .filter(nextTodo => nextTodo.id !== id);
    return {};
  },

  // render methods
  renderTodo: function (todo) {
    return `<pre>${JSON.stringify(todo, null, '  ')}<pre>`
  },
  renderTodos: function (todos) {
    return `<ul> ${todos
      .map(todo => `<li>${this.renderTodo(todo)}</li>`)
      .reduce((listStr, nextLi) => listStr + nextLi, '')
      }</ul>`
  },

  // handler methods
  handleGetAll: function (outputId) {
    // debugger;
    const allTodos = this.getAll();
    document.getElementById(outputId)
      .innerHTML = this.renderTodos(allTodos);
  },
  handlePostTodo: function (target, outputId) {
    // debugger;
    const newTodo = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
    };
    const todoToRender = this.postTodo(newTodo);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handleGetOne: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToRender = this.getOne(id);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handlePutTodo: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToPut = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
      id
    };
    const todoToRender = this.putTodo(id, todoToPut);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handlePatchTodo: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToPatch = {
      id,
      completed: target.form.completed.checked
    };
    if (target.form.todoText.value) {
      todoToPatch.todoText = target.form.todoText.value;
    };
    const todoToRender = this.patchTodo(id, todoToPatch);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handleDeleteTodo: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToRender = this.deleteTodo(id);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
};
