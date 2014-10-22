'use strict';

/* Controllers */

angular.module('molgenis.controllers', [])
    .controller('MenuCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            console.log('|'+viewLocation+'|', '|'+$location.path()+'|');
            return viewLocation === $location.path();
        };
    }])
    .controller('FilterDemoCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.attribute={name: "dateOfBirth", label:"Date of Birth.", type:"LONG", options:["label1", "label2", "label3"]};
        $scope.query = {};
    }])
    .controller('DataExplorer', ['$scope', 'Entity', 'EntityMetadata',
        function ($scope, Entity, EntityMetadata) {
            $scope.entityNames = ['ASE', 'Gene', 'e_CeliacSprue', 'MolgenisUser'];
            $scope.attributes = [];
            $scope.query = {};
            $scope.selectAllAttributes = function(){
                $scope.selectedAttributes = $scope.attributes;
            }
            $scope.$watch('selectedEntityName', function () {
                $scope.query = {};
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
            $scope.selectedEntityName = 'Gene';
        }])
    .controller('LoginCtrl', ['$scope', function ($scope) {

    }]);
