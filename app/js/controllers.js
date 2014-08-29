'use strict';

/* Controllers */

angular.module('molgenis.controllers', [])
    .controller('MenuCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            console.log('|'+viewLocation+'|', '|'+$location.path()+'|');
            return viewLocation === $location.path();
        };
    }])
    .controller('DataExplorer', ['$scope', 'Entity', 'EntityMetadata',
        function ($scope, Entity, EntityMetadata) {
            $scope.entityNames = ['ASE', 'Genes', 'StudyDataRequest', 'MolgenisUser'];
            $scope.attributes = [];
            $scope.selectAllAttributes = function(){
                $scope.selectedAttributes = $scope.attributes;
            }
            $scope.$watch('selectedEntityName', function () {
                EntityMetadata.query({name: $scope.selectedEntityName}, function (metaData) {
                    var attributes = [];
                    $scope.entityMetadata = metaData;
                    $.each($scope.entityMetadata.attributes, function (key, value) {
                        if(key !== 'href'){
                            attributes.push(key);
                        }
                    });
                    $scope.attributes = attributes;
                    $scope.selectAllAttributes();
                });
                $scope.entities = Entity.query({name: $scope.selectedEntityName});
            });
            $scope.selectedEntityName = 'Genes';
        }])
    .controller('MyCtrl2', ['$scope', function ($scope) {

    }]);
