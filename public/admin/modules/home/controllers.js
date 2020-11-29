'use strict';
 
angular.module('Home')
 
.controller('HomeController',['$scope', '$http', '$location', function ($scope, $http, $location) {
      
    var onSuccess = function (data, status, headers, config) {
        $scope.events = data;
        $scope.loading = false;
        $scope.showError = false;
    };

    var onError = function (data, status, headers, config) {
        $scope.error = status;
        $scope.loading = false;
        $scope.showError = true;
    }

    $scope.getUrl = function() {
        var host = $location.host();
        var protocol = $location.protocol();
        var port = $location.port() ? `:${$location.port()}` : '';
        return `${protocol}://${host}${port}`;
    }

    $scope.onloadFun = function() {
        var headers = {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
        var promise = $http.get(`${$scope.getUrl()}/events/search`, {headers: headers }).success(onSuccess).error(onError);
        $scope.editMode = false;
        $scope.loading = true;
    }

    $scope.delete = function(index) {
        $http.delete(`${$scope.getUrl()}/events/${index}`)
           .then(function (response) {
               $scope.onloadFun();
               $scope.editMode = false;
               $scope.events.splice(index, 1);
               return response;
           });
    }

    $scope.update = function() {
        var event = JSON.stringify($scope.editEvent);
        $http.put(`${$scope.getUrl()}/events`, event, {headers: {'Content-Type': 'application/json'} })
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
        $http.post(`${$scope.getUrl()}/events`, JSON.stringify(event), {headers: {'Content-Type': 'application/json'} })
           .then(function (response) {
               $scope.onloadFun();
               $scope.editMode = false;
               return response;
           });
    }

}]);