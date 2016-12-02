
function FinishDrawingController($scope, $state, $stateParams, $ionicLoading, $ionicPlatform, $ionicPopup, WedrawSettings){

  $scope.city = $stateParams.city_name
}

app.controller('FinishDrawingController', ['$scope', '$state', '$stateParams','$ionicLoading', '$ionicPlatform', '$ionicPopup', 'WedrawSettings', FinishDrawingController]);