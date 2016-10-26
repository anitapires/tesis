function DrawingService($http, WedrawSettings, Drawing) {

  this.getDrawings = function(){
    //return $http.get('http://localhost:9292/drawings').then(function(response){ // development
    return $http.get(WedrawSettings.api_url + '/drawings').then(function(response){ // produccion
      return response.data.map(Drawing.build);
    });
  }

  this.saveDrawing = function(sections){
    //return $http.post('http://localhost:9292/drawings', {sections: sections}).then( // development
    return $http.post(WedrawSettings.api_url + '/drawings', {sections: sections}).then( // produccion
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