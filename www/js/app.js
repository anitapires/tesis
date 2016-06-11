// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('Wedraw', ['ionic']).config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  
  .state('home', {
    url: '/',
    templateUrl: "views/home.html"
  })
  
  .state('map',{
    url: '/map',
    templateUrl: 'views/map.html',
    controller: 'MapController'
  })
  
  .state('start_drawing',{
    url: '/start_drawing',
    templateUrl: 'views/start_drawing.html',
    controller: 'MapController',
    data: {
      zoom: 18
    } 
  })
  
  .state('confirm_drawing',{
    url: '/confirm_drawing',
    templateUrl: 'views/confirm_drawing.html',
    controller: 'MapController'
  })
  
  .state('finish_drawing',{
    url: '/finish_drawing',
    templateUrl: 'views/finish_drawing.html',
    controller: 'MapController'
  });

}).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})