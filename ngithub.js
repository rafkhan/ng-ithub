var ngithub = function(params) {

  /*
   * Courtesy of: https://gist.github.com/niallo/3109252
   */
  function parse_link_header(header) {
    if (header.length == 0) {
      throw new Error("input must not be of zero length");
    }
  
    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    _.each(parts, function(p) {
      var section = p.split(';');
      if (section.length != 2) {
        throw new Error("section could not be split on ';'");
      }
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });
  
    return links;
  }

  // This function gets passed to the directive
  function directive_func($http) {

    return {

      // You have to have an ng-include on the same element
      // as this directive so the inner HTML is left untouched
      transclude: true,

      restrict: "EA", //element or attribute

      link: function(scope, iElement, iAttrs) {
        var gh_user = iAttrs.ghUser;

        // This probably isn't necessary...
        scope.gh_user  = gh_user;

        // Stack that repositories will be pushed on to, this
        // will be put on scope when all the links have been traversed
        //
        // TODO: Add option for this
        //
        var gh_repos = [];

        // You can use this to toggle visibility while the data loads
        scope.gh_done  = false;
        

        var repos_url = 'https://api.github.com/users/' + scope.gh_user+ '/repos'
                      + '?sort=' + params.sort
                      + '&type=' + params.type
                      + '&direction' + params.direction
                      + '&access_token=' + params.access_token;

        // This is called when all the pages have been traversed
        // and we have a list of all of the repos
        function finish_gh() {
          scope.gh_repos = gh_repos;
          scope.gh_success = true;
          scope.gh_done = true;
        }

        function get_repos(url) {
          $http.get(url)
          .success(function(data, status, headers, config) {

            // Add repos from response to list
            gh_repos = gh_repos.concat(data);


            var hdr = headers();
            if(hdr.link === undefined) { // Retrieved every repo, pass to view
              finish_gh();
            } else {
              var pages = parse_link_header(hdr.link);

              if(pages.next === undefined) {
                finish_gh();
              } else {
                get_repos(pages.next);
              }
            }
          })
          .error(function(data, status, headers, config) {
            scope.gh_success = false;
            scope.gh_done = true;
          });
        };

        get_repos(repos_url);

      }
    };
  };

  return directive_func;
};


//540b89167bcfc693567cfe9d177b66561db449f0
