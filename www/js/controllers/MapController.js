function MapController($scope, $state, Drawings, GeolocationWatchdog, userPosition){
  $scope.drawOnMap = function(){

      // Por cada dibujo, lo pongo en el mapa
      Drawings.getDrawings().forEach(function(drawing){
        new google.maps.Polyline({
            path: drawing.sections,
            geodesic: true,
            strokeColor: drawing.color,
            strokeOpacity: 1.0,
            strokeWeight: 2
        }).setMap($scope.map);
      })
  };

  $scope.initializeMap = function(){
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    if($state.current.hasOwnProperty('data') && $state.current.data.hasOwnProperty('zoom'))
    {
      $scope.map.setZoom($state.current.data.zoom);
      console.log('i changed the zoom');
    }

    // Si hay soporte para geolocalización, me guardo la posición del usuario
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.user_location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  
        $scope.map.setCenter($scope.user_location);
  
        var image = 'img/marker.png';
        var user_position_marker = new google.maps.Marker({ position: $scope.user_location, map: $scope.map, icon: image });
      },
      function(){
        console.log("No se pudo obtener la posición del usuario")
      });
    }

    $scope.drawOnMap();
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
          $scope.userLocations.push(new google.maps.LatLng(GeolocationWatchdog.user_location().coords.latitude,GeolocationWatchdog.user_location().coords.longitude));   
        }
        else
        {
          console.log("location has not changed so i don't push anything");
        }
      }
      else
      {
        console.log("first position pushed");
        $scope.userLocations.push(new google.maps.LatLng(GeolocationWatchdog.user_location().coords.latitude,GeolocationWatchdog.user_location().coords.longitude));
      }
    }

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
//      $scope.map.setCenter(user_location);
//      var image = 'img/marker.png';
//      var user_position_marker = new google.maps.Marker({ position: user_location, map: $scope.map, icon: image });
  }, 10000);

  $scope.initializeMap();
}

app.controller('MapController', ['$scope', '$state', 'Drawings', 'GeolocationWatchdog', MapController]);