'use strict';


// Declare app level module which depends on filters, and services
angular.module('molgenis', [
  'ngRoute',
  'ngResource',
  'molgenis.filters',
  'molgenis.services',
  'molgenis.directives',
  'molgenis.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dataExplorer', {templateUrl: 'partials/dataExplorer.html', controller: 'DataExplorer'});
  $routeProvider.when('/contact', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
      $routeProvider.when('/filterdemo', {templateUrl: 'partials/filterdemo.html', controller: 'FilterDemoCtrl'});
  $routeProvider.otherwise({redirectTo: '/filterdemo'});
}]);
