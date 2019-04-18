angular.module("specials").controller("SpecialsController", [
  "$scope",
  "Specials",
  function($scope, Specials) {
    /* Get all the listings, then bind it to the scope */
    $scope.get3MostRecent = function() {
      Specials.get3MostRecent()
        .then(res => {
          console.log('get3specials', res);
          $scope.specials = res.data;
          $scope.special1 = res.data[0];
          $scope.special2 = res.data[1];
          $scope.special3 = res.data[2];
        })
        .catch(err => {
          console.log("Unable to retrieve specials:", error);
        });
    };

    $scope.getAll = function() {
      Specials.getAll()
        .then(res => {
          $scope.specials = res.data;
        })
        .catch(err => console.log("Unable to retrieve specials:", error));
    };

    $scope.addSpecial = function(newTitle, newText, newExpireDate) {
      var newSpecial = {
        title: newTitle,
        text: newText,
        expireDate: expireDate
      };
      Specials.create(newSpecial)
        .then(res => {
          //TODO: what should we do with the res?
          window.location = window.location;
        })
        .catch(err => console.log("Error creating special: ", err));
    };

    $scope.deleteSpecial = function(id) {
      Specials.delete(id).then(
        function(res) {
          $scope.specials = res.data;
          Specials.getAll().then(
            function(res) {
              $scope.specials = res.data;
            },
            function(error) {
              console.log("Unable to retrieve specials:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve specials:", error);
        }
      );
    };
  }
]);
