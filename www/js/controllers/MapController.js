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

  $scope.delta     = 30
  $scope.measured_position;
  $scope.measured  = 0
  $scope.accum_lat = 0
  $scope.accum_lng = 0

  var watchCurrentLocation = function() {
    watch = $cordovaGeolocation.watchPosition({timeout: 10000, enableHighAccuracy: true});
    watch.then(
      null,
      function(err) { console.log("watch error", err); },
      function(position) {
        $scope.measured_position = position;

        //if(position.coords.accuracy < $scope.delta){
          $scope.measured++;
          $scope.accum_lat += position.coords.latitude;
          $scope.accum_lng += position.coords.longitude;
    
          if($scope.measured >= 5){
            $scope.currentLocation.latitude  = $scope.accum_lat / $scope.measured;
            $scope.currentLocation.longitude = $scope.accum_lng / $scope.measured;
          
            $scope.currentSection.points_attributes.push({latitude: $scope.currentLocation.latitude, longitude: $scope.currentLocation.longitude});
    
            console.log('Location changed:', $scope.currentLocation.latitude, $scope.currentLocation.longitude, " cantidad de puntos:", $scope.currentSection.points_attributes.length);
            
            $scope.measured  = 0;
            $scope.accum_lat = 0;
            $scope.accum_lng = 0;
          }
        //}
      });
  };

  $scope.$watch('currentSection.stroke_attributes.color', function(newValue, oldValue){
    console.log("cambio el color a " + newValue);

    //Si cambio el color y no habia al menos 2 puntos en la seccion actual no hago nada solo cambio el color
    //Si la seccion actual tenia al menos 2 puntos tengo que guardar la seccion y crear una nueva con el color nuevo
    if(newValue != oldValue && $scope.currentSection.points_attributes.length >= 2){
      saveCurrentSectionWithColor(oldValue);

      resetCurrentSection();    
    }

    //$scope.myStyle = { 'background': newValue }
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

  var saveCurrentSectionWithColor = function (color){
    sectionToSave = angular.copy($scope.currentSection);

    sectionToSave.stroke_attributes.color = color; 

    $scope.currentDrawing.sections.push(sectionToSave);

    console.log('Guarde una sección:', $scope.currentDrawing)
  }

  var resetCurrentSection = function(color){
    // La sección nueva tiene que comenzar desde el ultimo punto de la sección anterior
    last_point = angular.copy($scope.currentSection.points_attributes[$scope.currentSection.points_attributes.length-1])

    $scope.currentSection.points_attributes = [last_point];
  }

  $scope.saveDrawing = function(){
    // Agrego la sección actual antes de guardar el dibujo
    $scope.currentDrawing.sections.push($scope.currentSection)

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