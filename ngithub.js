var ngithub = function(params) {

  // This function gets passed to the directive
  var directive_func = function($http) {
    var API_BASE = 'https://api.github.com';

    return {
      transclude: true,
      restrict: "EA",

      link: function(scope, iElement, iAttrs) {
        scope.gh_done = false;

        var gh_user = iAttrs.ghUser;
        scope.gh_user = gh_user;

        var query = API_BASE + '/users/' + scope.gh_user+ '/repos'
                  + '?sort=' + params.sort
                  + '&type=' + params.type
                  + '&direction' + params.direction
                  + '&access_token=' + params.access_token;

        console.log(query);

        $http.get(query)
        .success(function(data, status, headers, config) {
          scope.gh_repos = data;
          scope.gh_success = true;
          scope.gh_done = true;
        })
        .error(function(data, status, headers, config) {
          scope.gh_success = false;
          scope.gh_done = true;
        });
      }
    };
  };

  return directive_func;
};


//540b89167bcfc693567cfe9d177b66561db449f0
