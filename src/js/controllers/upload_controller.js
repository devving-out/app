(function () {
    var app = angular.module('App.controllers.Upload', []);
    app.controller('UploadController', ['$scope', '$http', '$window', function($scope, $http, $window) {
        $scope.submitted        = false;
        $scope.campaign_invalid = false;
        $scope.lead             = {};

        $scope.response = {
            status  : false,
            message : ''
        };
        $scope.messaging_campaigns = [
            {id : 0, name : 'Select One'},
            {id : 1, name : 'Campaign 1'},
            {id : 2, name : 'Campaign 2'},
            {id : 3, name : 'Campaign 3'}
        ];

        $scope.resetLead = function () {
            $scope.lead = {};
            $scope.lead.messaging_campaign = $scope.messaging_campaigns[0];
        };

        $scope.uploadLead = function (valid) {
            $scope.submitted = true;

            // Validate campaign
            $scope.campaign_invalid = false;
            if ($scope.lead.messaging_campaign.id == 0) {
                $scope.campaign_invalid = true;
                valid = false;
            }

            // Valid submit
            if (valid) {
                // Format messaging campaign
                var new_lead = $scope.lead;
                new_lead.campaign_id = $scope.lead.messaging_campaign.id;

                // Remove the lead copy campaign object
                delete new_lead.messaging_campaign;

                // Default values for user_id and active
                new_lead.user_id = 1;
                new_lead.active  = 1;

                // Post to API
                $http.post("http://54.69.7.81/taylor/html/app_api/methods/post/lead/", {lead : new_lead})
                    .success(function (data, status, headers, config) {
                        var response = angular.fromJson(data);
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
                        $window.alert('Error Uploading Lead!');
                    });
            }
        };

    }]);
})();