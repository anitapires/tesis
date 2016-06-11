function DrawingService($http) {

  this.getDrawings = function(){
    //return $http.get('model/drawings.json').then(function(response){
      //return response.data;
    //});
    return [
      {
        "color": "#00FF00",
        "sections": [
          {
            "lat":-34.911038, 
            "lng": -57.954474
          },
          {
            "lat":-34.909615, 
            "lng": -57.941537
          },
          {
            "lat":-34.920203, 
            "lng": -57.941868
          }
        ]
      }
      /* Otro dibujo
      ,
      {
        "color":"",
        "sections": [
          {
            "lat": ...,
            "lng": ...
          }
          ...
        ]
      }

      */
    ]
  }
}

app.service('Drawings', ['$http', DrawingService]);