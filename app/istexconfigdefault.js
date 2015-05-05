app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});
app.filter('numberize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        return input;
    }
});
app.filter('ellipse', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

app.run(['$rootScope', function($rootScope) {

    $rootScope.istexConfigDefault = {
        // l'adresse de l'API de l'Istex
        // pour une ezproxyfication, réglez ici l'adresse ezproxyfiée
        // ex à l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
        istexApi: 'https://api.istex.fr',

        // pour lancer une recherche au chargement de la page
        // indiquer les mots à rechercher (argument de ?q= au niveau de l'api istex)
        query: "",

        // il est possible de ne charger que certaines facettes
        facetsToLoad: [ 'corpus'],

        // il est possible de cacher la zone de pagination avec ce paramètre
        showPagination: true,

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

        // les différents textes paramétrables
        labels: {
            facets: {
                'title' : 'Affiner votre recherche',
                'corpus' : 'Corpus'
            }
        }
    };

    //console.log(window.istexConfig);
    // create a empty istexConfig variable
    if (Object.getOwnPropertyNames(window.istexConfig).length > 0) {

    }

}]);
angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
});