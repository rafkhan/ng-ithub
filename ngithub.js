var ngithub = function($http) {
  var API_BASE = 'https://api.github.com'

  return {
    transclude: true,

    link: function(scope, iElement, iAttrs) {
      $http.get(API_BASE + '/users/rafkhan/repos')
      .success(function(data, status, headers, config) {
        scope.ghrepos = data;
      })
      .error(function(data, status, headers, config) {
        
      });
    }
  };
};
