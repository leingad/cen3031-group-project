angular.module('specials', []).factory('Specials', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/specials');
    },
	
	create: function(special) {
	  return $http.post('http://localhost:8080/api/specials', special);
    }, 

    get3MostRecent: function(response)
    {
      return $http.get('http://localhost:8080/api/specials/?num=3');
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
     return $http.delete('http://localhost:8080/api/specials/'+id);

    }
  };

  return methods;
});
