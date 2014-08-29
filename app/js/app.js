'use strict';


// Declare app level module which depends on filters, and services
angular.module('molgenis', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'molgenis.controllers',
  'angularBootstrapNavTree'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/#dataExplorer', {templateUrl: 'partials/dataExplorer.html', controller: 'DataExplorer'});
  $routeProvider.when('/#contact', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/#dataExplorer'});
}]);
