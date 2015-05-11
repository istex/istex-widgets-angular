app.run(['$rootScope', function($rootScope) {

    $rootScope.istexConfigDefault = {
        // l'adresse de l'API de l'Istex
        // pour une ezproxyfication, réglez ici l'adresse ezproxyfiée
        // ex à l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
        istexApi: 'https://api.istex.fr',

        // pour lancer une recherche au chargement de la page
        // indiquer les mots à rechercher (argument de ?q= au niveau de l'api istex)
        // si vous ne voulez pas de recherche au démarrage, ne mettez rien (ou query: false)
        query: false,

        // il est possible de ne charger que certaines facettes
        facetsToLoad: [ 'corpus'],

        // il est possible de cacher la zone de pagination en haut et/ou en bas avec ces paramètres
        showPaginationTop: true,
        showPaginationBot: true,

        // nombre de résultats souhaités par page
        pageSize: 10,

        // nombre max de pages à montrer dans la zone de pagination
        maxPagesInPagination: 10,

        // le nombre max de caractères du résumé à afficher
        abstractLength: 250,

        // le nombre max de caractères du titre à afficher
        titleLength: 150,

        // le format qu'on souhaite voir s'ouvrir quand on clique sur le titre
        fullTextOnTitle: 'pdf',

        // il est possible de cacher l'affichage de la vitesse de la requête
        // ex: "Environ 8 933 993 résultats (0.24 secondes)"
        //     si showQuerySpeed vaut false, "(0.24 secondes)" ne sera pas affiché
        showQuerySpeed: true,

        // PAS ENCORE IMPLEMENTE
        // les différents textes paramétrables
        labels: {
            facets: {
                'title' : 'Affiner votre recherche',
                'corpus' : 'Corpus'
            }
        }
    };

    // Updates the default configurations with the configurations from the HTML file if it exists
    if(window.istexConfig) {
        if (Object.getOwnPropertyNames(window.istexConfig).length > 0) {
            $rootScope.istexConfigDefault = extend($rootScope.istexConfigDefault, window.istexConfig);
        }
    }


}]);

//
angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
});