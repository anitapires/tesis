app.constant('WedrawSettings', {
  api_url: 'http://aqueous-depths-71926.herokuapp.com',
  gmaps_key: 'AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg',
  geocoding: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=<LAT>,<LONG>&key=AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg',
  
  cordova_geolocation_options: {
    timeout: 10000, 
    enableHighAccuracy: true
  },

  location_watcher: {
    sample_size: 5
  },

  marker_id: 'MyPosition',
  marker_options: {
    icon:'img/marker.png'
  },

  default_location:{
    latitude:  -34.925316,
    longitude: -57.941211
  },
  default_stroke: {
    color: '#FBC757'
  },

  map_zoom:{
    out: 14,
    in:  18
  }

});