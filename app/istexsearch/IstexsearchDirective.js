app.directive('istexSearch', function () {
    return {
        template:'' +
        '<div id="istex-widget-search" ng-controller="IstexsearchCtrl" >' +
            '<form class="istex-search-form" >'+
                '<div class="istex-search-bar-wrapper">'+
                    '<span><input class="istex-search-input" type="search" value="" placeholder="{{istexConfigDefault.labels.search.placeholder.main || \'Votre requête ici ...\'}}" ng-model="query" ng-focus="istexConfigDefault.focusInputQueryOnLoad"></span>'+
                    '<input class="istex-search-submit" type="submit" value="Rechercher" ng-click="search()">'+
                '</div>' +
                '<div class="istex-advanced-wrapper" ng-if="istexConfigDefault.advancedToLoad">' +
                    '<div class="istex-advanced-button" ng-click="toggleAdvanced()" ng-if="!istexConfigDefault.advancedExpanded">' +
                        '<a href="" >{{ (istexConfigDefault.labels.search["advancedTitle"] || "Recherche avancée") | capitalize }}</a>' +
                    '</div>' +
                    '<div class="istex-advanced-inputs">'+
                    '<div class="istex-advanced" ng-repeat="(advancedName, advanced) in advancedQuery" ng-show="showAdvanced">' +
                        '<h4 class="istex-advanced-name">{{ (istexConfigDefault.labels.search[advancedName] || advancedName) | capitalize }}</h4>'+
                        '<div class="istex-advanced-{{advancedName}}" >'+
                            '<input type="search" ng-model="advancedQuery[advancedName]" placeholder="{{istexConfigDefault.labels.search.placeholder[advancedName]}}">'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                '</div>' +
                '<p class="istex-search-error"></p>'+
                '<div class="istex-search-loading" title="Recherche en cours" ng-toggle="showLoading && !noresult" ></div>'+
            '</form>' +
        '</div>'
    };
});