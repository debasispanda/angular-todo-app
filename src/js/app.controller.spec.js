//Test for app.controller
describe('Controller: TodoCtrl', function () {
  beforeEach(module('TodoApp.Controller'));

  var $controller, $scope;

  beforeEach(inject(function (_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = {};
    var controller = $controller('TodoCtrl', { $scope: $scope });
  }));

  it('has initially no todo', function () {
    var hasTodos = $scope.isTodo();
    expect(hasTodos).toEqual(false);
  });

  it('should add a todo', function () {
    var event = {
      keyCode: 13
    };
    $scope.todoText = 'Wakeup tomorrow morning at 5am';
    $scope.addTodo(event);
    $scope.todoText = 'Attend the meeting at 12:30 pm tomorrow';
    $scope.addTodo(event);
    var todos = $scope.todos;
    expect(todos.length).toEqual(2);
  });

  it('should be able to get remaining todo', function () {
    var event = {
      keyCode: 13
    };
    $scope.todoText = 'Wakeup tomorrow morning at 5am';
    $scope.addTodo(event);
    $scope.todoText = 'Attend the meeting at 12:30 pm tomorrow';
    $scope.addTodo(event);

    var todo = $scope.todos[1];
    todo.done = true;
    expect($scope.remaining()).toEqual(1);
  });

  it('should be able to know if any todo completed', function () {
    var event = {
      keyCode: 13
    };
    $scope.todoText = 'Wakeup tomorrow morning at 5am';
    $scope.addTodo(event);
    $scope.todoText = 'Attend the meeting at 12:30 pm tomorrow';
    $scope.addTodo(event);

    var todo = $scope.todos[1];
    todo.done = true;
    expect($scope.hasDone()).toEqual(true);
  });

  it('should be able to make all todos completed', function () {
    var event = {
      keyCode: 13
    };
    $scope.todoText = 'Wakeup tomorrow morning at 5am';
    $scope.addTodo(event);
    $scope.todoText = 'Attend the meeting at 12:30 pm tomorrow';
    $scope.addTodo(event);  

    $scope.markAll = true;
    $scope.toggleMarkAll();
    expect($scope.remaining()).toEqual(0);
  });

  it('should be able to clear completed todos from list', function(){
    var event = {
      keyCode: 13
    };
    $scope.todoText = 'Wakeup tomorrow morning at 5am';
    $scope.addTodo(event);
    $scope.todoText = 'Attend the meeting at 12:30 pm tomorrow';
    $scope.addTodo(event);  

    expect($scope.remaining()).toEqual(2);
    $scope.todos[0].done = true;
    $scope.clear();
    expect($scope.remaining()).toEqual(1);
  });
})