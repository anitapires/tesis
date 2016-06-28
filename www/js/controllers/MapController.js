function MapController($scope, $state, uiGmapGoogleMapApi, Drawings, GeolocationWatchdog, userPosition){

  $scope.on_map = true

  $scope.drawing = false

  $scope.confirming_drawing = false

  $scope.drawings = Drawings.getDrawings();

  $scope.new_map = { zoom: 14 }

  $scope.user_location = { latitude: 45, longitude: -73 }

  $scope.user_location_id = "papa"

  $scope.marker_options = { icon:'img/marker.png' };

  $scope.initializeMap = function(){

    // Si hay soporte para geolocalización, me guardo la posición del usuario
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.user_location = { longitude: position.coords.longitude, latitude: position.coords.latitude };
      },
      function(){
        console.log("No se pudo obtener la posición del usuario")
      });
    }
  } 

  GeolocationWatchdog.begin();

  $scope.userLocations = [];

  var intervalID = window.setInterval(function(){
    if(GeolocationWatchdog.user_location() !== null)
    {
      if($scope.userLocations.length > 0)
      {
        last_lat = $scope.userLocations[$scope.userLocations.length-1].lat; 
        last_lng = $scope.userLocations[$scope.userLocations.length-1].lng;

        if(GeolocationWatchdog.user_location().coords.latitude != last_lat || GeolocationWatchdog.user_location().coords.longitude != last_lng)
        {
          console.log("location has changed so i push"); 
          $scope.userLocations.push({ latitude: GeolocationWatchdog.user_location().coords.latitude, longitude: GeolocationWatchdog.user_location().coords.longitude });   
        }
        else
        {
          console.log("location has not changed so i don't push anything");
        }
      }
      else
      {
        console.log("first position pushed");
        $scope.userLocations.push({ latitude: GeolocationWatchdog.user_location().coords.latitude, longitude: GeolocationWatchdog.user_location().coords.longitude });
      }
    }
/*
    if($scope.userLocations.length > 1)
    {
      new google.maps.Polyline({
            path: $scope.userLocations,
            geodesic: true,
            strokeColor: '#00FF00',
            strokeOpacity: 1.0,
            strokeWeight: 2
        }).setMap($scope.map);
    } 
*/
//      $scope.map.setCenter(user_location);
//      var image = 'img/marker.png';
//      var user_position_marker = new google.maps.Marker({ position: user_location, map: $scope.map, icon: image });
  }, 10000);

  $scope.initializeMap();

  $scope.changeToDrawing = function(){
    $scope.on_map = false

    $scope.new_map.zoom = 18

    $scope.drawing = true
  }

  $scope.changeToConfirming = function(){
    $scope.drawing = false

    $scope.confirming_drawing = true
  }

  $scope.saveDrawing = function(){
    Drawings.saveDrawing($scope.userLocations);
  }
}

app.controller('MapController', ['$scope', '$state', 'uiGmapGoogleMapApi', 'Drawings', 'GeolocationWatchdog', MapController]);