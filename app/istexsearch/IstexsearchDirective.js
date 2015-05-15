app.directive('istexSearch', function () {
    return {
        template:'' +
        '<div id="istex-widget-search" ng-controller="IstexsearchCtrl" >' +
            '<form class="istex-search-form" >'+
                '<div class="istex-search-bar-wrapper">'+
                    '<input class="istex-search-submit" type="submit" value="Rechercher" ng-click="search()">'+
                    '<span><input class="istex-search-input" type="search" value="" placeholder="{{istexConfigDefault.labels.search[\'placeholder\'] || \'Votre requête ici ...\'}}" ng-model="query"></span>'+
                '</div>' +
                '<div class="istex-advanced-wrapper">' +
                    '<div class="istex-advanced" ng-repeat="(advancedName, advanced) in advancedQuery">' +
                        '<h4 class="istex-advanced-name">{{ (istexConfigDefault.labels.search[advancedName] || advancedName) | capitalize }}</h4>'+
                        '<div class="istex-advanced-{{advancedName}}" >'+
                            '<input type="search" ng-model="advancedQuery[advancedName]">'+
                        '</div>'+
                    '</div>'+
                '</div>' +
                '<p class="istex-search-error"></p>'+
                '<div class="istex-search-loading" title="Recherche en cours"></div>'+
            '</form>'+
        '</div>'
    };
});