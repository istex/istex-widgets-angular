app.directive('istexSearch', function () {
    return {
        template:'' +
        '<div id="istex-widget-search" ng-controller="IstexsearchCtrl" >' +
            '<form class="istex-search-form"  ng-submit="search()">'+
                '<div class="istex-search-bar-wrapper">'+
                    '<input class="istex-search-submit" type="submit" value="Rechercher" >'+
                    '<span><input class="istex-search-input" type="search" value="" placeholder="Votre requête ici ..." ng-model="query" ng-focus="istexConfigDefault.focusInputQueryOnLoad"></span>'+
                '</div>'+
                '<p class="istex-search-error"></p>'+
                '<div class="istex-search-loading" title="Recherche en cours"></div>'+
            '</form>'+
        '</div>'
    };
});