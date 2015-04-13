(function () {
    var app = angular.module('App.controllers.Settings', []);
    app.controller('SettingsController', ['$scope', function($scope) {
        $scope.submitted = false;
        $scope.valid_submit = false;

    	$scope.user = {
    		first_name: 'demo',
    		last_name: 'user',
    		email: 'demo@gmail.com',
    		new_lead_alert: false,
    		response_alert: true,
    		daily_digest_alert: false,
            weekly_digest_alert: true
    	};

    	$scope.submitSettings = function (valid) {
    		$scope.submitted = true;

            if (valid) {
                $scope.valid_submit = true;
            }
    	};

        $scope.resetSubmitted = function () {
            $scope.submitted    = false;
            $scope.valid_submit = false;
        };
    }]); 
})();