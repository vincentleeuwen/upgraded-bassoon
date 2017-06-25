var axios = require('axios');

module.export = {
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodedURI('https://api.github.com/search/repositories?q=stars>1+language' + language + '&sort=starts&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      });
  }
}
