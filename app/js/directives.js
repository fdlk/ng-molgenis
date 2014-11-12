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
                query: '=',
                options: '='
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
                            scope.criteria[scope.criteria.length-1].operator = 'OR'
                            scope.criteria.push({});
                        }
                        scope.minus = function(index){
                            if(index == scope.criteria.length - 1) {
                                delete scope.criteria[index - 1].operator;
                            }
                            scope.criteria.splice(index, 1);

                        }
                        break;
                    case "MREF":
                        scope.options=[];
                        scope.controlType = "select";
                        scope.operatorEditable = true;
                        scope.criteria = [{selectedOperator:'AND'}];
                        scope.plus = function(){
                            scope.criteria[scope.criteria.length-1].operator = 'OR'
                            scope.criteria.push({selectedOperator:'AND'});
                        }
                        scope.minus = function(index){
                            if(index == scope.criteria.length - 1) {
                                delete scope.criteria[index - 1].operator;
                            }
                            scope.criteria.splice(index, 1);

                        }
                        scope.$watch('$select.search', function(data){
                            /*
                             {"num":1000,"q":[{"operator":"NESTED","nestedRules":[{"field":"value","operator":"LIKE","value":"l"}]},{"operator":"OR"},{"operator":"NESTED","nestedRules":[{"field":"label","operator":"LIKE","value":"l"}]}]}
                             */
                            console.log(data);
                            scope.options = ["label1", "label2"];
                        });

                }
            }
        };
    }])
    .directive('menu', [function () {
        return {restrict: 'E', templateUrl: 'partials/header.html'}
    }]);
