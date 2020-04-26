const appFetchAsyncAwait = {
  // data access methods
  getAll: async function () {
    try {
      const res = await fetch('/todos');
      return await res.json();
    } catch (err) {
      console.log(err);
    };
  },
  postTodo: async function (newTodo) {
    try {
      const res = await fetch('/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    };
  },
  getOne: async function (id) {
    try {
      const res = await fetch('/todos/' + id);
      return await res.json();
    } catch (err) {
      console.log(err);
    };
  },
  putTodo: async function (id, putter) {
    try {
      const res = await fetch('/todos/' + id, {
        method: 'PUT',
        body: JSON.stringify(putter),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    };
  },
  patchTodo: async function (id, patcher) {
    try {
      const res = await fetch('/todos/' + id, {
        method: 'PATCH',
        body: JSON.stringify(patcher),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    };
  },
  deleteTodo: async function (id) {
    try {
      const res = await fetch('/todos/' + id, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    };
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
  handleGetAll: async function (outputId) {
    // debugger;
    const allTodos = await this.getAll();
    document.getElementById(outputId)
      .innerHTML = this.renderTodos(allTodos);
  },
  handlePostTodo: async function (target, outputId) {
    // debugger;
    const newTodo = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
    };
    const todoToRender = await this.postTodo(newTodo);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handleGetOne: async function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToRender = await this.getOne(id);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handlePutTodo: async function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToPut = {
      todoText: target.form.todoText.value,
      completed: target.form.completed.checked,
      id
    };
    const todoToRender = await this.putTodo(id, todoToPut);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handlePatchTodo: async function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToPatch = {
      id,
      completed: target.form.completed.checked
    };
    if (target.form.todoText.value) {
      todoToPatch.todoText = target.form.todoText.value;
    };
    const todoToRender = await this.patchTodo(id, todoToPatch);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
  handleDeleteTodo: async function (target, outputId) {
    // debugger;
    const id = Number(target.form.id.value);
    const todoToRender = await this.deleteTodo(id);
    document.getElementById(outputId)
      .innerHTML = this.renderTodo(todoToRender);
  },
};
