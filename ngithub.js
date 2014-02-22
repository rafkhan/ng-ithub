var ngithub = function($http) {
  var API_BASE = 'https://api.github.com';

  return {
    transclude: true,
    restrict: "EA",

    link: function(scope, iElement, iAttrs, ctrl, transclude) {
      scope.gh_success = true;
    
      scope.$watch('userinput', function() {
        var gh_user = iAttrs.ghUser;
        scope.gh_user = gh_user;

        $http.get(API_BASE + '/users/' + scope.gh_user + '/repos?access_token=540b89167bcfc693567cfe9d177b66561db449f0')
        .success(function(data, status, headers, config) {
          scope.gh_repos = data;
          scope.gh_success = true;
        })
        .error(function(data, status, headers, config) {
          scope.gh_success = false;
        });
      });
    }
  };
};
