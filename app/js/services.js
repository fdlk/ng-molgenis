'use strict';

angular.module('molgenis.services', [])
    .value('version', '0.1')
    .factory('Entity', ['$resource',
        function ($resource) {
            return $resource('http://localhost:8080/api/v1/:name/:id',
                {},
                {'query': {method: 'GET', isArray: false}});
        }])
    .factory('EntityMetadata', ['$resource',
        function ($resource) {
            return $resource('http://localhost:8080/api/v1/:name/meta',
                {},
                {'query': {method: 'GET', isArray: false}});
        }]);;