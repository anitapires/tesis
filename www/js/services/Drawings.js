function DrawingService($http) {

  this.getDrawings = function(){
    //return $http.get('model/drawings.json').then(function(response){
      //return response.data;
    //});
    return [
      {
        "stroke": { "color": "#232323" },
        "sections": [
          {
            "latitude":-34.911038, 
            "longitude": -57.954474
          },
          {
            "latitude":-34.909615, 
            "longitude": -57.941537
          },
          {
            "latitude":-34.920203, 
            "longitude": -57.941868
          }
        ]
      },
      {
        "stroke": { "color":"#ffae00" },
        "sections": [
          {
            "latitude": -34.9214891,
            "longitude": -57.9563765
          },
          {
            "latitude": -34.9215272,
            "longitude": -57.9632371
          },
          {
            "latitude": -34.9196156,
            "longitude": -57.9617253
          },
          {
            "latitude": -34.9203052,
            "longitude":  -57.9606414
          },
          {
            "latitude": -34.9194256,
            "longitude": -57.959664
          },
          {
            "latitude": -34.9171775,
            "longitude": -57.9624358
          }
        ]
      }
    ]
  }

  this.saveDrawing = function(sections){
    console.log(sections);
    $http.post('http://localhost:9292/drawings', {sections: sections}).then(
      function(){console.log("i succeded to send the drawings to the server")}, 
      function(){console.log("i failed to send the drawings to the server")}
    );
  }
}

app.service('Drawings', ['$http', DrawingService]);