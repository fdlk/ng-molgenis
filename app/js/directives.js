'use strict';

/* Directives */


angular.module('molgenis.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('molFilter', [function () {
        return {
            restrict: 'A',
            templateUrl: 'partials/filters.html',
            scope: {
                label: '=',
                type: '=',
                name: '=',
                query: '='
            },
            link: function (scope) {
                switch(scope.type) {
                    case "TEXT":
                    case "STRING":
                        scope.controlType = "text";
                        break;
                    case "BOOL":
                        scope.controlType = "boolean";
                        break;
                    case "LONG":
                    case "DECIMAL":
                        scope.controlType = "fromto";
                        scope.criteria = [{}];
                        scope.plus = function(){
                            scope.criteria[scope.criteria.length-1].operator = 'AND'
                            scope.criteria.push({});
                        }
                        scope.minus = function(index){
                            if(index == scope.criteria.length - 1) {
                                delete scope.criteria[index - 1].operator;
                            }
                            scope.criteria.splice(index, 1);

                        }
                        break;
                }
            }
        };
    }])
    .directive('menu', [function () {
        return {restrict: 'E', templateUrl: 'partials/header.html'}
    }]);
