function ReverseGeocoding($http) {

  this.getLocationInformation = function(position){
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.latitude+','+position.longitude+'&key=AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg').then(function(response){

      geoinfo = response.data.results[0]

      result = { address: geoinfo.formatted_address }

      for (var i = 0; i < geoinfo.address_components.length; i++)
        if(geoinfo.address_components[i].types.includes('locality'))
          result.city = geoinfo.address_components[i].long_name

      return result
    });
  }
}

app.service('ReverseGeocoding', ['$http', ReverseGeocoding]);