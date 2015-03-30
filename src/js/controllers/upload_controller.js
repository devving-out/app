(function () {
    var app = angular.module('App.controllers.Upload', []);
    app.controller('UploadController', ['$scope', '$http', function($scope, $http) {
        $scope.response = {};
        $scope.response.status = false;
        $scope.response.message = '';
        $scope.submitted = false;
        $scope.lead = {};
        $scope.messaging_campaigns = [
            {id : 1, name : 'Campaign 1'},
            {id : 2, name : 'Campaign 2'},
            {id : 3, name : 'Campaign 3'}
        ];

        $scope.resetLead = function () {
            $scope.lead = {};
        };

        $scope.uploadLead = function (valid) {
            $scope.submitted = true;
            if (valid) {
                // Format messaging campaign
                var new_lead = $scope.lead;
                new_lead.campaign_id = $scope.lead.messaging_campaign.id;
                delete new_lead.messaging_campaign;
                new_lead.user_id = 1;

                $http.post("http://54.69.7.81/taylor/html/app_api/methods/post/lead", {lead : new_lead})
                    .success(function (data, status, headers, config) {
                        var response = angular.fromJson(data);
                        console.log(response);
                        if (response.status) {
                            $scope.response.status = true;
                            $scope.response.message = response.message;
                            $scope.resetLead();
                        } else {
                            $scope.response.status = false;
                            $scope.response.message = response.message;
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log('FATAL ERROR');
                    });
            }
        };

    }]);
})();