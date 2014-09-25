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
                {expand:"attributes"},
                {'query': {method: 'GET', isArray: false}});
        }])
    .factory('AuthService', function ($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.user.id,
                        res.data.user.role);
                    return res.data.user;
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    })
    .service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
        return this;
    });