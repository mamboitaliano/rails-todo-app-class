//= require_self
//= require_tree ./app

App = {}

App.request = function(method, path, params){

  return new Promise(function(resolve, reject){

    var request = $.ajax({
      type: method,
      url: path,
      data: params,
      dataType: 'json',
    });

    request.done(function(response_as_JSON){
      resolve(response_as_JSON)
      console.log('success');
    });

    request.fail(function(error){
      reject(error)
      console.log('fail');
    });
  });
};

App.initialize = function(){
  this.tasksListView = new App.TaskListView();
  this.tasksListView.render();
}

$(function(){
  App.initialize();
})





