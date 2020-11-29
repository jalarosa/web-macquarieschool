'use strict';
 
angular.module('Home')
 
.controller('HomeController',['$scope', '$http',function ($scope, $http) {
      
    var onSuccess = function (data, status, headers, config) {
        $scope.events = data;
        $scope.loading = false;
    };

    var onError = function (data, status, headers, config) {
        $scope.error = status;
        $scope.loading = false;
    }

    $scope.onloadFun = function() {
        var promise = $http.get("http://localhost:3000/events/search").success(onSuccess).error(onError);
        $scope.editMode = false;
        $scope.loading = true;
    }

    //Delete Row
    $scope.delete = function(index) {
        $http.delete(`http://localhost:3000/events/${index}`)
           .then(function (response) {
               $scope.onloadFun();
               $scope.editMode = false;
               $scope.events.splice(index, 1);
               return response;
           });
    }

    //Update Row
    $scope.update = function() {
        var event = JSON.stringify($scope.editEvent);
        $http.put("http://localhost:3000/events", event, {headers: {'Content-Type': 'application/json'} })
           .then(function (response) {
               $scope.onloadFun();
               $scope.editMode = false;
               return response;
           });
    }

    $scope.edit = function(event) {
        $scope.editMode = true;
        $scope.editEvent = event;
    }

    $scope.insert = function() {
        var event = {
            title: $scope.editEvent.title,
            description: $scope.editEvent.description,
            date: $scope.editEvent.date
        }
        $http.post("http://localhost:3000/events", JSON.stringify(event), {headers: {'Content-Type': 'application/json'} })
           .then(function (response) {
               $scope.onloadFun();
               $scope.editMode = false;
               return response;
           });
    }

}]);