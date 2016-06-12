function DrawingService($http) {

  this.getDrawings = function(){
    //return $http.get('model/drawings.json').then(function(response){
      //return response.data;
    //});
    return [
      {
        "color": "#232323",
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
      },
      {
        "color":"#ffae00",
        "sections": [
          {
            "lat": -34.9214891,
            "lng": -57.9563765
          },
          {
            "lat": -34.9215272,
            "lng": -57.9632371
          },
          {
            "lat": -34.9196156,
            "lng": -57.9617253
          },
          {
            "lat": -34.9203052,
            "lng":  -57.9606414
          },
          {
            "lat": -34.9194256,
            "lng": -57.959664
          },
          {
            "lat": -34.9171775,
            "lng": -57.9624358
          }
        ]
      }
    ]
  }
}

app.service('Drawings', ['$http', DrawingService]);