var ngithub = function($http) {
  var API_BASE = 'https://api.github.com'

  return {
    transclude: true,

    link: function(scope, iElement, iAttrs) {

      var gh_user = iAttrs.ghUser;
      scope.gh_user = gh_user;

      $http.get(API_BASE + '/users/' + scope.gh_user + '/repos')
      .success(function(data, status, headers, config) {
        scope.ghrepos = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });
    }
  };
};
