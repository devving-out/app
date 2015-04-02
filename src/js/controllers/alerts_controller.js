(function () {
    var app = angular.module('App.controllers.Alerts', []);
    app.controller('AlertsController', ['$http', '$modal', '$scope', function ($http, $modal, $scope) {
      	var self = this;
        $scope.alertOpen = false;
      	$scope.tabs = [];
      	$scope.selected_lead = {};
      	$scope.leads = [];

        $scope.checkSwipe = function ($event) {
            if ($scope.alertOpen) {
              $event.stopPropagation();
            }
        };

        $scope.toggleOpen = function(id) {
            $scope.tabs[id] = !$scope.tabs[id];
            for (var i in $scope.tabs) {
                if ($scope.tabs[i] != 'undefined' && i != id) {
                    $scope.tabs[i] = false;
                }
            }
        };

        $scope.$on('alertClose', function () {
          $scope.alertOpen = false;
        });

        $scope.openAlert = function (lead) {
            $scope.alertOpen = true;
            var modalInstance = $modal.open({
                templateUrl: 'alertModal.html',
                controller: 'AlertModalController as modalCtrl',
                resolve: {
                    lead: function () {
                        return lead;
                    }
                }
            });
        };

        // Define initialize
        function init() {
          $scope.$emit('Load');
  		    $http.get("http://54.69.7.81/taylor/html/app_api/methods/get/leads/?user_id=1")
      		.success(function (data, status, headers, config) {
            // JSON decode response
            $scope.$emit('Unload');
      			var response = angular.fromJson(data);

      			// Good response
            if (response.status) {
              var leads = response.data;
              var i = 0;
              var colors = ['#3498db', '#f39c12', '#e74c3c']

              angular.forEach(leads, function (value, key) {
                leads[key].alert_class = colors[getRandomInt(0, colors.length - 1)];
              });
      				$scope.leads = leads;
      			}
      		});
        }

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Call initialize
        init();
    }]);
})();