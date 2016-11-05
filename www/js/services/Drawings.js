function DrawingService($http, WedrawSettings, Drawing) {

  this.getDrawings = function(){
    return $http.get(WedrawSettings.api_url + '/drawings').then(function(response){
      return response.data.map(Drawing.build);
    });
  }

  this.saveDrawing = function(sections){
    return $http.post(WedrawSettings.api_url + '/drawings', {sections: sections}).then(
      function(response){
        return response.data
      }, 
      function(response){
        return null
      }
    );
  }
}

app.service('Drawings', ['$http', 'WedrawSettings', 'Drawing', DrawingService]);