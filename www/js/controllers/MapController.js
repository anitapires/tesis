function MapController($scope, $state, uiGmapGoogleMapApi, $ionicLoading, $ionicPlatform, $ionicPopup, WedrawSettings, Drawings, LocationWatcher, Section, Drawing){

  $scope.markerID        = WedrawSettings.marker_id
  $scope.markerOptions   = WedrawSettings.marker_options
  $scope.mapZoom         = WedrawSettings.map_zoom.out
  $scope.currentLocation = WedrawSettings.default_location

  $scope.currentStroke   = angular.copy(WedrawSettings.default_stroke)

  Drawings.getDrawings().then(function(drawings){
    $scope.drawings = drawings;
  });

  $scope.currentDrawing = new Drawing()

  ionic.Platform.ready(function(){
    LocationWatcher.getCurrentLocation().then(function(location){
      $scope.currentLocation = location
    })
  })


  $scope.begin = function(){
    $scope.currentDrawing.start(WedrawSettings.default_stroke)

    $scope.mapZoom = WedrawSettings.map_zoom.in

    LocationWatcher.watchLocation()
    $scope.currentLocation = LocationWatcher.currentLocation

    $scope.$watch('currentLocation', function(newLocation, oldLocation){
      if($scope.currentDrawing.isStarted() && !$scope.currentDrawing.isPaused()){
        $scope.currentDrawing.currentSection().addPoint(newLocation);
      }
    }, true)

    $scope.$watch('currentStroke.color', function(newColor, oldColor){
      if(newColor != oldColor){
        $scope.currentDrawing.changeColor(angular.copy(newColor))
      }
    })
  }

  $scope.pause = function(){
    $scope.currentDrawing.pause()
  }

  $scope.resume = function(){
    $scope.currentDrawing.resume()
  }

  $scope.finish = function(){
    $scope.currentDrawing.finish()

    LocationWatcher.stopWatchLocation()
  }

  $scope.save = function(){
    Drawings.saveDrawing($scope.currentDrawing.sections()).then(function(drawing){
      if(drawing != null)
      {
        $state.go('finish_drawing', { city_name: $scope.currentLocation.city })
      }
      else
      {
        $ionicPopup.alert({ title: 'Error!', template: 'Hubo un error al guardar el dibujo.'})
      }
    })
  }
}

app.controller('MapController', ['$scope', '$state', 'uiGmapGoogleMapApi', '$ionicLoading', '$ionicPlatform', '$ionicPopup', 'WedrawSettings', 'Drawings', 'LocationWatcher', 'Section', 'Drawing', MapController]);