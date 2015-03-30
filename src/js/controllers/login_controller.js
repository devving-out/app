(function () {
    var app = angular.module('App.controllers.Login', []);
    app.controller(
        'LoginController',
        ['$scope', '$location', '$http',
        function($scope, $location, $http) {
        $scope.user = {
            username: '',
            password: '',
            remember_me: false,
        };

        $scope.submitLogin = function (valid) {
            var request = $scope.user;
            $scope.submitted = true;
            //make sure no fields are empty
            if (valid) {
                $http({
                    url: "http://54.69.7.81/mac/html/app_api/methods/get/login/",
                    method: "POST",
                    data: request,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    var response = angular.fromJson(data);
                    if (response.status) {
                        $location.path('/home');
                    } else {
                        $scope.login_failed = true;
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log('FATAL ERROR');
                });
            }
        };

    }]);
})();