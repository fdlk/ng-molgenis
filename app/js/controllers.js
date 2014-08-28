'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MenuCtrl', ['$scope', function ($scope) {

    }])
    .controller('DataExplorer', ['$scope', 'Entity', 'EntityMetadata',
        function ($scope, Entity, EntityMetadata) {
            $scope.entityNames = ['ASE', 'Genes', 'StudyDataRequest'];
            $scope.attributes = [];
            $scope.$watch('selectedEntityName', function () {
                EntityMetadata.query({name: $scope.selectedEntityName}, function (metaData) {
                    var attributeSelection = {};
                    $scope.entityMetadata = metaData;
                    $.each(metaData.attributes, function (key, value) {
                        if(key !== 'href'){
                            attributeSelection[key] = true;
                        }
                    });
                    $scope.attributeSelection = attributeSelection;
                });
                $scope.entities = Entity.query({name: $scope.selectedEntityName});
            });
            $scope.isAttributeSelected = function(name){
                return $scope.attributeSelection[name] === true;
            }
            $scope.selectedEntityName = 'Genes';
        }])
    .controller('MyCtrl2', ['$scope', function ($scope) {

    }]);
