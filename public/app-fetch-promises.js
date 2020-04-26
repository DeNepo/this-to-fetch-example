const appFetchPromises = {
  // data access methods
  getAll: function () {
    return fetch('/todos')
      .then(res => res.json())
      .catch(err => console.log(err))
  },
  postTodo: function (newTodo) {
    return fetch('/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  getOne: function (id) {
    return fetch('/todos/' + id)
      .then(res => res.json())
      .catch(err => console.log(err))
  },
  putTodo: function (id, putter) {
    return fetch('/todos/' + id, {
      method: 'PUT',
      body: JSON.stringify(putter),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  patchTodo: function (id, patcher) {
    return fetch('/todos/' + id, {
      method: 'PATCH',
      body: JSON.stringify(patcher),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  deleteTodo: function (id) {
    return fetch('/todos/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(err => console.log(err));
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
    this.getAll()
      .then(todos => document.getElementById(outputId)
        .innerHTML = this.renderTodos(todos))
      .catch(err => console.log(err));
  },
  handlePostTodo: function (target, outputId) {
    // debugger;
    const newTodo = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
    };
    this.postTodo(newTodo)
      .then(todo => document.getElementById(outputId)
        .innerHTML = this.renderTodo(todo))
      .catch(err => console.log(err));
  },
  handleGetOne: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    this.getOne(id)
      .then(todo => document.getElementById(outputId)
        .innerHTML = this.renderTodo(todo))
      .catch(err => console.log(err));
  },
  handlePutTodo: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToPut = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
      id
    };
    this.putTodo(id, todoToPut)
      .then(todo => document.getElementById(outputId)
        .innerHTML = this.renderTodo(todo))
      .catch(err => console.log(err));
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
    }
    this.patchTodo(id, todoToPatch)
      .then(todo => document.getElementById(outputId)
        .innerHTML = this.renderTodo(todo))
      .catch(err => console.log(err));
  },
  handleDeleteTodo: function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    this.deleteTodo(id)
      .then(todo => document.getElementById(outputId)
        .innerHTML = this.renderTodo(todo))
      .catch(err => console.log(err));
  },
};
