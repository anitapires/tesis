function LocationWatcher($cordovaGeolocation, WedrawSettings, ReverseGeocoding) {

  this.currentLocation
  this._watch
  this._measured  = 0
  this._accum_lat = 0
  this._accum_lng = 0

  this.getCurrentLocation = function(){
    return $cordovaGeolocation.getCurrentPosition(WedrawSettings.cordova_geolocation_options).then(
      (function(position){
        this.currentLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude }
  
        ReverseGeocoding.getLocationInformation(this.currentLocation).then((function(locationName){
          this.currentLocation.name = locationName
        }).bind(this))

        return this.currentLocation;
      }).bind(this), 
      function(error){
        throw "Couldn't get user location";
      }
    )
  }   

  this.watchLocation = function(){
    this._watch = $cordovaGeolocation.watchPosition(WedrawSettings.cordova_geolocation_options)
    console.log('[LocationWatcher] Watch started')
    this._watch.then(
      null,
      function(err){
        throw 'Watch Error'
      },
      (function(position){
        this._measured++
        this._accum_lat += position.coords.latitude
        this._accum_lng += position.coords.longitude   

        //console.log('[LocationWatcher] New position') 

        if(this._measured >= WedrawSettings.location_watcher.sample_size){

          this.currentLocation.latitude  = this._accum_lat / this._measured
          this.currentLocation.longitude = this._accum_lng / this._measured            

          console.log('[LocationWatcher] New location:', this.currentLocation.latitude, this.currentLocation.longitude)            
          this._measured  = 0
          this._accum_lat = 0
          this._accum_lng = 0
        }
      }).bind(this)
    )
  }

  this.stopWatchLocation = function(){
    this._watch.clearWatch()
    console.log('[LocationWatcher] Watch cleared')
  }  
}

app.service('LocationWatcher', ['$cordovaGeolocation', 'WedrawSettings', 'ReverseGeocoding', LocationWatcher]);