app.run(['$rootScope', function($rootScope) {

    $rootScope.istexConfigDefault = {
        // l'adresse de l'API de l'Istex
        // pour une ezproxyfication, r�glez ici l'adresse ezproxyfi�e
        // ex � l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
        istexApi: 'https://api.istex.fr',

        // pour lancer une recherche au chargement de la page
        // indiquer les mots � rechercher (argument de ?q= au niveau de l'api istex)
        // si vous ne voulez pas de recherche au d�marrage, ne mettez rien (ou query: false)
        // si vous mettez query: "", les r�sultats seront tous les documents
        query: false,

        // il est possible de mettre le focus sur la barre de recherche au chargement de la page
        focusInputQueryOnLoad: false,

        // il est possible de ne charger que certaines facettes
        facetsToLoad: [ 'corpus'],

        // il est possible de cacher la zone de pagination en haut et/ou en bas avec ces param�tres
        showPaginationTop: true,
        showPaginationBot: true,

        // nombre de r�sultats souhait�s par page
        pageSize: 10,

        // nombre max de pages � montrer dans la zone de pagination
        maxPagesInPagination: 10,

        // le nombre max de caract�res du r�sum� � afficher
        abstractLength: 250,

        // le nombre max de caract�res du titre � afficher
        titleLength: 150,

        // PAS ENCORE IMPLEMENTE
        // le format qu'on souhaite voir s'ouvrir quand on clique sur le titre
        fullTextOnTitle: 'pdf',

        // il est possible de cacher l'affichage de la vitesse de la requ�te
        // ex: "Environ 8 933 993 r�sultats (0.24 secondes)"
        // si showQuerySpeed vaut false, "(0.24 secondes)" ne sera pas affich�
        showQuerySpeed: true,

        // PAS ENCORE IMPLEMENTE
        // les diff�rents textes param�trables
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