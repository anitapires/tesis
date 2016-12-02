// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('Wedraw', ['ionic', 'ngCordova', 'uiGmapgoogle-maps', 'ionic-color-picker']).config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider){

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg'
  })

  // AIzaSyBGU5_GQbuD2DzWeQqJOewndTDnAdzDdrg Javascript
  //AIzaSyAjU2ucHTv8xjBwPCRWHyAK3wwIg2Y7pcE  Android

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

  .state('ayuda',{
    url: '/ayuda',
    templateUrl: 'views/ayuda.html'
  })

  .state('finish_drawing',{
    url: '/finish_drawing',
    params: {
      city_name: 'La Plata'
    },
    templateUrl: 'views/finish_drawing.html',
    controller: 'FinishDrawingController'
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