function GeolocationWatchdog() {
  this.watch_id = null;

  this.user_location = function(){
    //var position
    //app._invokeQueue.forEach(function(provider){
      //if(provider[1] == "value" && provider[2][0] == 'user_location')
      //{
        //position = provider[2][1];
      //}
    //});
//
    //return position;
    if (typeof pija !== 'undefined') {
      return pija;
    }
    
    return null;
  }

  this.positionSuccess = function(position){
    console.log('Position changed!');

    //app.value('user_location', position);

    pija = position;
  }

  this.positionError = function(){
    console.log("todo mal no pude sacar la posicion");
  }

  this.begin = function(){
    this.watch_id = navigator.geolocation.watchPosition(this.positionSuccess, this.positionError, { enableHighAccuracy: true });
  }

  this.end = function(){
    if(this.watch_id != null){
      navigator.geolocation.clearWatch(this.watch_id);
    }
  }
}


app.service('GeolocationWatchdog', GeolocationWatchdog);