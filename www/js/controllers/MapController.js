function MapController($scope, $state, uiGmapGoogleMapApi, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup, Drawings, ReverseGeocoding){

  // STATES
  $scope.on_map = true

  $scope.drawing = false

  $scope.confirming_drawing = false

  $scope.hardcordedStroke= { color: "#FBC757"}

  // Drawings
  Drawings.getDrawings().then(function(drawings){
    $scope.drawings = drawings;
  });

  // Map
  $scope.map = { zoom: 14 }

  $scope.currentLocation = { latitude: -34.925316, longitude: -57.941211 }

  // Fucking marker
  $scope.user_location_id = "papa"

  $scope.marker_options = { icon:'img/marker.png' };
 


  // Set center on user location
  ionic.Platform.ready(function(){
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(function(position){
  
      $scope.currentLocation.latitude  = position.coords.latitude
      $scope.currentLocation.longitude = position.coords.longitude
  
      ReverseGeocoding.getLocationInformation($scope.currentLocation.latitude, $scope.currentLocation.longitude).then(function(locationName){
        $scope.locationName = locationName;
      });
  
    }, function(error){
      console.log("Could not get user location");
    });
  });     


  $scope.userLocations = []         

  var watchCurrentLocation = function() {
    watch = $cordovaGeolocation.watchPosition({timeout: 10000, enableHighAccuracy: true});
    watch.then(
      null,
      function(err) { console.log("watch error", err); },
      function(position) {
        $scope.currentLocation.latitude  = position.coords.latitude
        $scope.currentLocation.longitude = position.coords.longitude

        $scope.userLocations.push({latitude: $scope.currentLocation.latitude, longitude: $scope.currentLocation.longitude});

        console.log('Location changed:', $scope.currentLocation.latitude, $scope.currentLocation.longitude);
    });
  };

  $scope.changeToDrawing = function(){
    $scope.on_map = false

    $scope.map.zoom = 18

    $scope.drawing = true

    watchCurrentLocation();
  }

  $scope.changeToConfirming = function(){
    $scope.drawing = false

    $scope.confirming_drawing = true
  }

  $scope.saveDrawing = function(){
    Drawings.saveDrawing([{ color: $scope.hardcordedStroke.color, points_attributes: $scope.userLocations }]).then(function(drawing){
      if(drawing != null)
      {
        $state.go('finish_drawing')
      }
      else
      {
        $ionicPopup.alert({ title: 'Error!', template: 'Hubo un error al guardar el dibujo.'});
      }
    });
  }
}

app.controller('MapController', ['$scope', '$state', 'uiGmapGoogleMapApi', '$cordovaGeolocation', '$ionicLoading', '$ionicPlatform', '$ionicPopup', 'Drawings', 'ReverseGeocoding', MapController]);