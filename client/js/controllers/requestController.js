//TODO: bring this up to par with other controllers
angular.module("requests").controller("RequestsController", [
  "$scope",
  "Requests",
  function($scope, Requests) {
    Requests.getAll()
      .then(res => {
        $scope.requests = res.data;
      })
      .catch(err => {
        console.log("Unable to retrieve requests: ", err);
      });

    $scope.detailedInfo = undefined;

    $scope.addRequest = function(
      newClientId,
      newBudgetMin,
      newBudgetMax,
      newLocationTo,
      newLocationFrom,
      newTravelDatesDeparting,
      newTravelDatesReturning,
      newNumChildren,
      newNumAdults,
      newWantTravelInsurance,
      newWantCruise,
      newText
    ) {
      var newRequest = {
        clientId: newClientId,
        requestState: "Pending",
        budget: {
          min: newBudgetMin,
          max: newBudgetMax
        },
        location: {
          to: newLocationTo,
          from: newLocationFrom
        },
        travelDates: {
          departing: newTravelDatesDeparting,
          returning: newTravelDatesReturning
        },
        numChildren: newNumChildren,
        numAdults: newNumAdults,
        wantTravelInsurance: newWantTravelInsurance,
        wantCruise: newWantCruise,
        text: newText
      };

      Requests.create(newRequest)
        .then(res => {
          if (res.status == 200) alert("Request successfully made!");
        })
        .catch(err => {
          alert(err.data.code, "Request couldn't be made");
        });
    };

    $scope.deleteRequest = function(index) {
      var id = $scope.requests[index]._id;
      Requests.delete(id).then(
        function(response) {
          $scope.requests = response.data;

          Requests.getAll().then(
            function(response) {
              $scope.requests = response.data;
            },
            function(error) {
              console.log("Unable to retrieve requests:", error);
            }
          );
        },
        function(error) {
          console.log("Unable to retrieve requests:", error);
        }
      );
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.requests[index];
      $scope.parties = $scope.requests[index].party;
    };
  }
]);
