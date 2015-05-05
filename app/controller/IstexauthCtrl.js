app.controller('IstexauthCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    var infos = JSON.parse(localStorage.getItem('infos'));
    if(infos && infos.isConnected)
        $rootScope.isConnected = true;
    else
        $rootScope.isConnected = false;


    $scope.connect = function(){
        localStorage.setItem('infos', JSON.stringify({"isConnected":"true"}));
        $rootScope.isConnected = true;
    };

}]);