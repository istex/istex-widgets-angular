app.directive('istexFacets', function () {
    return {
        template:'' +
        '<div id="istex-widget-facets" style="opacity: 1;" ng-controller="IstexfacetsCtrl" ng-toggle="showFacets && aggregations">'+
            '<div class="istex-facets">'+
                '<h3 class="istex-facets-title">{{ istexConfigDefault.labels.facets["title"] || "Affiner votre recherche" }}</h3>'+
                '<form class="istex-facets" >'+
                    '<div class="istex-facet" ng-repeat="(facetName, facet) in aggregations">' +
                        '<h4 class="istex-facet-name" ng-click="shownFacet = !shownFacet;">{{ (istexConfigDefault.labels.facets[facetName] || facetName) | capitalize }}<div ng-class="shownFacet ? \'icon arrow\' : \'icon arrow flipped\'" ng-style="shownFacet && { width: \'silver\', display: \'inline-block\'} || { color: \'gold\', display: \'inline-block\' }"></div></h4>'+
                        '<div class="animate-switch-container" ng-switch on="facetName">'+
                            '<div class="istex-facet-checkbox corpus" ng-switch-when="corpusName" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key | capitalize}}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox language" ng-switch-when="language" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key | languagize:istexConfigDefault.labels.facets["traduction"] }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox wos" ng-switch-when="categories.wos" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox wos" ng-switch-when="wos" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="istex-facet-checkbox inist" ng-switch-when="categories.inist" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox inist" ng-switch-when="inist" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="istex-facet-checkbox scopus" ng-switch-when="categories.scopus" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox scopus" ng-switch-when="scopus" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+
                            '<div class="istex-facet-checkbox scienceMetrix" ng-switch-when="categories.scienceMetrix" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox scienceMetrix" ng-switch-when="scienceMetrix" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+

                            '<div class="istex-facet-checkbox teeft" ng-switch-when="keywords.teeft" ng-if="shownFacet">'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox teeft" ng-switch-when="teeft" ng-if="shownFacet">'+
                                'Un bug est survenu :/'+
                            '</div>'+

                            '<div class="istex-facet-copyrightdate" ng-switch-when="copyrightDate" ng-if="shownFacet">' +
                                '<div ng-if="!istexConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="istex-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="istexConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="istex-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="istex-facet-pubdate" ng-switch-when="publicationDate" ng-if="shownFacet">' +
                                '<div ng-if="!istexConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="istexConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="istex-facet-quality" ng-switch-when="score" ng-if="shownFacet">' +
                                '<div ng-if="!istexConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="0" max="10" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="0" max="10" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="istexConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="0" rz-slider-ceil="10" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="istex-facet-checkbox {{ facetName }}" ng-switch-default>'+
                                '<li ng-repeat="badge in facet.buckets" title="{{badge.key | capitalize}}"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)" >{{ badge.key  | capitalize | ellipse:false:27:"..."   }}<span class="istex-facet-checkbox-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                        '</div>'+
                    '</div>' +
                '</form>'+
            '</div>'+
        '</div>' +
        ''
    };
});