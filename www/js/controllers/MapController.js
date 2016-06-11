function MapController($scope, $state, Drawings){
  console.log($state.current);
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
  
        // https://developers.google.com/maps/documentation/javascript/markers
        var user_position_marker = new google.maps.Marker({ position: $scope.user_location, map: $scope.map });
      },
      function(){
        console.log("No se pudo obtener la posición del usuario")
      });
    }

    $scope.drawOnMap();
  }


  $scope.initializeMap();
}

app.controller('MapController', ['$scope', '$state', 'Drawings', MapController]);