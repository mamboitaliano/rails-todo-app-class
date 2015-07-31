
// Why do you have a this.refresh() as well as a prototype refresh?
App.TaskListView = function(){
  this.node = $('<div>').addClass('task-list');
  this.tasks = null;
  this.refresh();
};

App.TaskListView.prototype.refresh = function(){
  var view = this;
  App.Task.all().then(function(tasks){
    view.tasks = tasks;
    view.render()
  }
}

App.TasksListView.prototype.render = function(){
  this.node.html('');
  this.node.append(this.renderNewTaskForm())

  if (this.tasks){
    if (this.tasks.length === 0){
      this.node.text('no tasks, yet...');
    } else {
      var nodes = this.tasks.map(this.renderTask.bind(this));
      this.node.append(nodes)
    }
  }

}

// This is a crucial function.  This is where we get user input from a form insde the dom.
// In this form, we also call the create method.  The create method will pull information from the form
// and put it into the database.  It sets off a long chain of tasks.
App.TasksListView.prototype.renderNewTaskForm = function(){
  var view = this;
  var form = $.tmpl(App.TasksListView.NewTaskFormTemplate);
  form.on('submit', function(event){
    event.preventDefault();
    var description = $(this).find('input[name="task[description]"]').val();
    App.Task.create({description: description}).then(function(task){
      view.tasks.unshift(task);
      view.render()
    })
  })
  return form;
}

App.TasksListView.prototype.renderTask = function(task){
  var view = this;
  var domNode = $.tmpl(App.TasksListView.TaskTemplate, task);

  domNode.find('task-remove-link').on('click', function(event){
    event.preventDefaut();
    task.remove().then(function(){
      view.refresh();
    })
  })

  return domNode;
}


App.TasksListView.TaskTemplate = $('[data-template="task"]').text();
App.TasksListView.NewTaskFormTemplate = $('[data-template="new-task-form"]').text();









