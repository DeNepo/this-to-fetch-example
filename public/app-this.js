const appThis = {
  // data
  todos: [],
  nextId: 5,

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
    document.getElementById(outputId)
      .innerHTML = this.renderTodos(this.getAll());
  },
  handlePostTodo: function (target, outputId) {
    const newTodo = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
    };
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(this.postTodo(newTodo));
  },
  handleGetOne: function (target, outputId) {
    const id = Number(target.form.id.value);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(this.getOne(id));
  },
  handlePutTodo: function (target, outputId) {
    const id = Number(target.form.id.value);
    const todoToPut = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
      id
    };
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(this.putTodo(id, todoToPut));
  },
  handlePatchTodo: function (target, outputId) {
    const id = Number(target.form.id.value);
    const todoToPatch = {
      id,
      completed: target.form.completed.checked
    };
    if (target.form.todoText.value) {
      todoToPatch.todoText = target.form.todoText.value;
    }
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(this.patchTodo(id, todoToPatch));
  },
  handleDeleteTodo: function (target, outputId) {
    const id = Number(target.form.id.value);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(this.deleteTodo(id));
  },
};
