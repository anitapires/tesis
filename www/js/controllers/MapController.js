function MapController($scope, $state, uiGmapGoogleMapApi, $ionicLoading, $ionicPlatform, $ionicPopup, WedrawSettings, DrawingState, Drawings, LocationWatcher, Section, Drawing){
  
  $scope.drawingState    = DrawingState;
  
  $scope.markerID        = WedrawSettings.marker_id
  $scope.markerOptions   = WedrawSettings.marker_options
  $scope.mapZoom         = WedrawSettings.map_zoom.out
  $scope.currentLocation = WedrawSettings.default_location

  Drawings.getDrawings().then(function(drawings){
    $scope.drawings = drawings;
  });

  $scope.currentDrawing = new Drawing()

  $scope.currentSection = new Section(WedrawSettings.default_stroke)

  // Set center on user location
  ionic.Platform.ready(function(){
    LocationWatcher.getCurrentLocation().then(function(location){
      $scope.currentLocation = location
    })
  })


  $scope.begin = function(){
    $scope.drawingState.changeToStarted()

    $scope.mapZoom = WedrawSettings.map_zoom.in

    LocationWatcher.watchLocation()

    $scope.currentLocation = LocationWatcher.currentLocation
    
    $scope.$watch('currentLocation', function(newLocation, oldLocation){
      if($scope.drawingState.isStarted() && !$scope.drawingState.isPaused()){
        $scope.currentSection.addPoint(newLocation);
        console.log('Added point to current section:', $scope.currentSection)
      }
    }, true)
  
    $scope.$watch('currentSection.stroke_attributes.color', function(newValue, oldValue){
      console.log("Change color to:" + newValue);
  
      if(newValue != oldValue && $scope.currentSection.isPath()){
        $scope.currentDrawing.addSection(angular.copy($scope.currentSection).changeColor(oldValue))
  
        $scope.currentSection.reset()  
  
        console.log('Save section:', $scope.currentDrawing)
      }
    })
  }

  $scope.pause = function(){
    $scope.drawingState.changeToPaused()

    if($scope.currentSection.isPath()){
      $scope.currentDrawing.addSection(angular.copy($scope.currentSection));
      console.log('Save section:', $scope.currentDrawing)
    }

    $scope.currentSection.reset(false)
  }

  $scope.resume = function(){
    $scope.drawingState.changeToResumed()
  }

  $scope.finish = function(){
    $scope.drawingState.changeToFinished()

    LocationWatcher.stopWatchLocation()
  }

  $scope.save = function(){
    // Agrego la sección actual antes de guardar el dibujo
    $scope.currentDrawing.addSection($scope.currentSection)

    Drawings.saveDrawing($scope.currentDrawing.sections()).then(function(drawing){
      if(drawing != null)
      {
        $state.go('finish_drawing')
      }
      else
      {
        $ionicPopup.alert({ title: 'Error!', template: 'Hubo un error al guardar el dibujo.'})
      }
    })
  }
}

app.controller('MapController', ['$scope', '$state', 'uiGmapGoogleMapApi', '$ionicLoading', '$ionicPlatform', '$ionicPopup', 'WedrawSettings', 'DrawingState', 'Drawings', 'LocationWatcher', 'Section', 'Drawing', MapController]);