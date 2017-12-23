angular.module('app.core.auth.service', ['ngStorage']).service('AuthService', ['$rootScope', 'AUTH_EVENTS', '$http', '$localStorage', '$q', 'jwtHelper', function($rootScope, AUTH_EVENTS, $http, $localStorage, $q, jwtHelper) {
  var self = this;

  self.getToken = function() {
    return $localStorage.token;
  };

  self.login = function(credentials){
    return $http.post('/api/auth/login', credentials)
      .then(function(res) {
        if (!res.data || !_.isString(res.data.token)) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          return $q.reject({data: 'Expected a token in server response.'});
        }

        $localStorage.token = res.data.token;
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        return $q.resolve(true);
      })
      .catch(function(err) {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        return $q.reject(err);
      })
  };

  self.isAuthenticated = function() {
    var token = $localStorage.token;
    return !!token;
  };

  self.logout = function() {
    delete $localStorage.token;
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };
}
]);
