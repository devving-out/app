// default main controller code
(function () {
    var app = angular.module(
        'App.controllers.Main', []
    );

    app.controller(
        'MainController',
        [
        'SharedState',
        '$route',
        '$scope',
        '$location',
        '$timeout',
        '$rootScope',
        function(SharedState, $route, $scope, $location, $timeout, $rootScope) {
            const SPLASH_DELAY = 1000;
            const FADE_DELAY = 1000;
            var that = this;
            this.ready = 0;
            this.load_fade = 0;
            this.current_page = '';
            this.fade_in = false;
            this.fade_out = false;

            // Loading flag and event listeners
            $scope.viewLoading = false;
            $scope.$on('Load', function () {
                $scope.viewLoading = true;
            });
            $scope.$on('Unload', function () {
                $scope.viewLoading = false;
            });

            // Set default location
            $location.path('/');

            // Declare all other ng-click locations
            $scope.showHome = function() {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != '') {
                    fadeToPage('home');
                }
            }
            $scope.showAlerts = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'alerts') {
                    fadeToPage('alerts');
                }
            }
            $scope.showLeads = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'leads') {
                    fadeToPage('leads');
                }
            }
            $scope.showPerformance = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'performance') {
                    fadeToPage('performance');
                }
            }
            $scope.showUpload = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'upload') {
                    fadeToPage('upload');
                }
            }
            $scope.showSettings = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'settings') {
                    fadeToPage('settings');
                }
            }
            $scope.showCalendar = function () {
                SharedState.turnOff('uiSidebarLeft');
                if (this.current_page != 'calendar') {
                    fadeToPage('calendar');
                }
            }
            $scope.logout = function () {
                SharedState.turnOff('uiSidebarLeft');
                $location.path('/');
            }

            // Declare page fading
            function fadeToPage(path) {
                that.fade_in = false;
                that.fade_out = true;
                //0.2s fade fade out
                $timeout(function(){
                    changePage(path);
                }, 200);
            }

            // Change path method
            function changePage(path) {
                $location.path('/' + path);
                this.current_page = path;
                that.fade_out = false;
                that.fade_in = true;
            }


            //splash screen
            angular.element(document).ready(function () {
                $timeout(function(){
                    that.load_fade = 1;
                }, SPLASH_DELAY);
                // that.ready = 1;
                $timeout(function(){
                    that.ready = 1;
                }, FADE_DELAY + SPLASH_DELAY);
            });

        }]);
})();
