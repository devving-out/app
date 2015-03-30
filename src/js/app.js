(function () {
    var app = angular.module('App', [
      'ngRoute',
      'mobile-angular-ui',
      'App.directives.loadingSpinner',
      'angular-carousel',
      'ui.bootstrap',
      //ngShow, Hide animations
      'mwl.calendar',
      'App.controllers.Main',
      'App.controllers.Login',
      'App.controllers.Alerts',
      'App.controllers.Calendar',
      'App.controllers.Leads',
      'App.controllers.Settings',
      'App.controllers.Performance',
      'App.controllers.Upload',
      'App.controllers.AlertModal',
      //custom directives
      'App.directives.toggleClass'
    ]);

    app.config(function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl:'home.html',
            reloadOnSearch: false,
            css: 'css/home.css'
        });
        $routeProvider.when('/alerts', {
            templateUrl:'alerts.html',
            reloadOnSearch: false,
            css: 'css/alerts.css'
        });
        $routeProvider.when('/leads', {
            templateUrl:'leads.html',
            reloadOnSearch: false,
            css: 'css/leads.css'
        });
        $routeProvider.when('/performance', {
            templateUrl:'performance.html',
            reloadOnSearch: false,
            css: 'css/performance.css'
        });
        $routeProvider.when('/upload', {
            templateUrl:'upload.html',
            reloadOnSearch: false,
            css: 'css/upload.css'
        });
        $routeProvider.when('/settings', {
            templateUrl:'settings.html',
            reloadOnSearch: false,
            css: 'css/settings.css'
        });
        $routeProvider.when('/calendar', {
            templateUrl:'calendar.html',
            reloadOnSearch: false,
            css: 'css/calendar.css'
        });
        $routeProvider.otherwise({
            templateUrl:'login.html',
            reloadOnSearch: false,
            css: 'css/login.css'
        });

    });

    app.service('CalendarEvents', ['$q', function ($q) {
        var self = this;

        this.events = [
          {
            title: 'Lead Followup - Taylor Birkeland', // The title of the event
            type: 'important', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            starts_at: new Date(2015,2,21,13), // A javascript date object for when the event starts
            ends_at: new Date(2015,2,21,15), // A javascript date object for when the event ends
            editable: true, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
            deletable: true // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
          },
          {
            title: 'Lead Followup - Mac Gainor', // The title of the event
            type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            starts_at: new Date(2015,2,24,9), // A javascript date object for when the event starts
            ends_at: new Date(2015,2,24,10), // A javascript date object for when the event ends
            editable: true, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
            deletable: true // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
          },
          {
            title: 'Lead Followup - John Sansone', // The title of the event
            type: 'warning', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
            starts_at: new Date(2015,2,24,9), // A javascript date object for when the event starts
            ends_at: new Date(2015,2,24,10), // A javascript date object for when the event ends
            editable: true, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
            deletable: true // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
          }
        ];

        this.addEvent = function (e) {
            var defer = $q.defer();
            self.events.push(e);
            defer.resolve();
            return defer.promise;
        };

        this.getEvents = function () {
            return self.events;
        };
    }]);
})();