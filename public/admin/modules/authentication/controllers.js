'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function(response) {
                if((response.data && response.data.success ) || response.success) {
                    AuthenticationService.SetCredentials($scope.email, $scope.password, response.token || esponse.data.token);
                    $location.path('/');
                } else {
                    $scope.error = response.data.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);