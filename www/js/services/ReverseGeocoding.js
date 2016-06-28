function ReverseGeocoding($http) {

  this.getLocationInformation = function(lat, long){
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg').then(function(response){
      return response.data.results[0].formatted_address;
    });
  }
}

app.service('ReverseGeocoding', ['$http', ReverseGeocoding]);