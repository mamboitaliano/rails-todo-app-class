App.Task = function(attributes){
  this.setAttributes(attributes)
}

// I don't understand why we are extending here.  Does it have something to do with the fact that
// we want an array with all of the objects in it so this pushes them all together?  Couldn't we
// accomplish this the same way but with a push and an empty array?
App.task.prototype.setAttributes = function(attributes){
  $.extend(this, attributes)
  return this;
}

App.task.prototype.attributes = function(){
  return {
    id:           this.id,
    task_list_id: this.task_list_id,
    description:  this.description,
    completed:    this.completed,
    created_at:   this.created_at,
    updated_at:   this.updated_at,
  };
};
// Why is params a hash here with the key of "task"?  Why not just pass the hash?
App.Task.create = function(attributes){
  params = {task: attributes}
  var task_list_id = attributes.task_list_id
  return App.request('post', "/task_lists/"+task_list_id+"/tasks", params).then(function(attributes){
    return new App.Task(attributes);
  })
}

// Why do you have the method as a post route instead of a get route?
// Is this how I can get the task list id?
// Why did you put the attributes in callback function?
// should't we return the task?
App.Task.prototype.complete = function(attributes){
  var task = this;
  var task_list_id = attributes.task_list_id;
  return App.request('get', '/task_lists/'+task_list_id+'/tasks/'+this.id+'/completed').then(function(attributes){
    task.completed = true;
    return task;
  });
};

// would I need to get the task_list_id with a promise here or will this work?
App.Task.prototype.save = function(){
  var promise,
      task = this,
      attributes = {task: task.attributes()};
  var task_list_id = attributes.task.task_list_id
  if (task.id){
    promise = App.request('put', '/task_lists/'+task_list_id+'/tasks/'+task.id+'/', attributes)
  } else {
    promise = App.request('post', '/task_lists/'+task_list_id+'/tasks', attributes)
  }

  return promise.then(function(attributes){
    return task.setAttributes(attributes)
  })
}

App.Task.prototype.remove = function(attributes){
  var task = this;
  var task_list_id = attributes.task_list_id;
  return App.request('delete', '/task_lists/'+task_list_id+'/tasks/'+task.id)
}

App.Task.all = function(attributes){
  var task_list_id = attributes.task_list_id;
  return App.request('get', '/task_lists/'+task_list_id+'/tasks').then(tasks){
    return tasks.map(function(attributes){
      return new App.Task(attributes);
    })
  }
}






