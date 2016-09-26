function MapController($scope, $state, uiGmapGoogleMapApi, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup, Drawings, ReverseGeocoding){

  // STATES
  $scope.on_map = true

  $scope.drawing = false

  $scope.confirming_drawing = false


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
 
  // Datos del dibujo
  $scope.currentDrawing = { sections: [] }

  $scope.currentSection = { stroke_attributes: { color: "#FBC757" }, points_attributes: [] }

  $scope.is_first_section = true


  // Set center on user location
  ionic.Platform.ready(function(){
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(function(position){
  
      $scope.currentLocation.latitude  = position.coords.latitude
      $scope.currentLocation.longitude = position.coords.longitude
  
      ReverseGeocoding.getLocationInformation($scope.currentLocation.latitude, $scope.currentLocation.longitude).then(function(locationName){
        $scope.locationName = locationName;
      });
  
    }, function(error){
      console.log(error)
      console.log("Could not get user location");
    });
  });     

  var watchCurrentLocation = function() {
    watch = $cordovaGeolocation.watchPosition({timeout: 10000, enableHighAccuracy: true});
    watch.then(
      null,
      function(err) { console.log("watch error", err); },
      function(position) {
        $scope.currentLocation.latitude  = position.coords.latitude
        $scope.currentLocation.longitude = position.coords.longitude

        $scope.currentSection.points_attributes.push({latitude: $scope.currentLocation.latitude, longitude: $scope.currentLocation.longitude});

        console.log('Location changed:', $scope.currentLocation.latitude, $scope.currentLocation.longitude);
    });
  };

  $scope.$watch('currentSection.stroke_attributes.color', function(newValue, oldValue){
    console.log("cambio el color a " + newValue);
    if(newValue != oldValue && !$scope.is_first_section){
      $scope.currentSection.stroke_attributes.color = oldValue;

      $scope.currentDrawing.sections.push($scope.currentSection);
      resetCurrentSection(newValue);
      $scope.is_first_section = false;
    }

    $scope.myStyle = { 'background': newValue }
  });

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

   var resetCurrentSection = function(color){
    $scope.currentSection = { stroke_attributes: { color: color }, points_attributes: [] };
  }

  $scope.saveDrawing = function(){
    Drawings.saveDrawing($scope.currentDrawing.sections).then(function(drawing){
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