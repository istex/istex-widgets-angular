app.directive('istexAuth', function () {
    return {
        template:'' +
        '<div id="istex-widget-auth" ng-controller="IstexauthCtrl">'+
            '<button class="istex-ezproxy-auth-btn" ng-if="!isConnected" ng-click="connect()">Se connecter<div></div></button>'+
        '</div>'
    };
});