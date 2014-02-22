var ngithub = function($http) {
  var API_BASE = 'https://api.github.com'

  $http.get(API_BASE + '/users/rafkhan/repos')
    .success(function(data, status, headers, config) {
      console.log(data);
    })
    .error(function(data, status, headers, config) {
    
    });

  return {
    transclude: true,

    link: function(scope, iElement, iAttrs) {

      $http.get(API_BASE + '/users/rafkhan/repos')
        .success(function(data, status, headers, config) {
          scope.repos = data;
        })
        .error(function(data, status, headers, config) {
        
        });

      scope.lel = "Asd";
      console.log(iElement);
      console.log(iAttrs);
    }
  };
};
