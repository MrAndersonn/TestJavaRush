var taskManagerModule = angular.module('taskManagerApp', ['ngAnimate']);

taskManagerModule.controller('taskManagerController', function ($scope,$http) {

	var urlBase="";
	$scope.toggle=true;
	$scope.selection = [];
	$scope.statuses=['ACTIVE','COMPLETED'];
	$scope.priorities=['HIGH','LOW','MEDIUM'];
	$http.defaults.headers.post["Content-Type"] = "application/json";


    $scope.isActive = function () {
       $http.get(urlBase + '/tasks/search/findByTaskStatus?status=ACTIVE').

            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }

                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';

            });


    }


    $scope.isCompleted = function () {
        $http.get(urlBase + '/tasks/search/findByTaskStatus?status=COMPLETED').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }
                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';
            });
    };
    $scope.findAll = function () {
        $http.get(urlBase + '/tasks').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }
                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';
            });
    };

    function findAllTasks() {
                $http.get(urlBase + '/tasks/search/findByTaskArchived?archivedfalse=0').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }
                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';
            });

    }



$scope.addTask = function addTask() {
		if($scope.taskName=="" || $scope.taskDesc=="" || $scope.taskPriority == "" || $scope.taskStatus == ""){
		}
		else{
		 $http.post(urlBase + '/tasks', {
             taskName: $scope.taskName,
             taskDescription: $scope.taskDesc,
             taskPriority: $scope.taskPriority,
             taskStatus: $scope.taskStatus
         }).
		  success(function(data, status, headers) {
			 //alert("Task added");
             var newTaskUri = headers()["location"];
             console.log("Might be good to GET " + newTaskUri + " and append the task.");
              findAllTasks();
		    });
		}
	};
		
	  $scope.toggleSelection = function toggleSelection(taskUri) {
	    var idx = $scope.selection.indexOf(taskUri);

	    if (idx > -1) {
	      $http.patch(taskUri, { taskStatus: 'ACTIVE' }).
              success(function(data) {
		     //
              findAllTasks();
		    });
	      $scope.selection.splice(idx, 1);
	    }

	    else {
	      $http.patch(taskUri, { taskStatus: 'COMPLETED' }).
		  success(function(data) {

              findAllTasks();
		    });
	      $scope.selection.push(taskUri);
	    }
	  };
	  
	
	// Archive Completed Tasks
	  $scope.archiveTasks = function archiveTasks() {
          $scope.selection.forEach(function(taskUri) {
              if (taskUri != undefined) {
                  $http.patch(taskUri, { taskArchived: 1});
              }
          });
         //
          console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
          findAllTasks();
	  };
	
});

taskManagerModule.directive('ngConfirmClick', [
	function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);
//Here is no function for task delete!!!