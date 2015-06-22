app.run(['$rootScope', function($rootScope) {

    $rootScope.istexConfigDefault = {
        // l'adresse de l'API de l'Istex
        // pour une ezproxyfication, réglez ici l'adresse ezproxyfiée
        // ex à l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
        istexApi: 'http://api-integ.istex.fr',

        // pour lancer une recherche au chargement de la page
        // indiquer les mots à rechercher (argument de ?q= au niveau de l'api istex)
        // si vous ne voulez pas de recherche au d�marrage, ne mettez rien (ou query: false)
        // si vous mettez query: "", les r�sultats seront tous les documents
        query: false,

        // il est possible de mettre le focus sur la barre de recherche au chargement de la page
        focusInputQueryOnLoad: false,

        // il est possible de ne charger que certaines facettes
        // par défaut, on charge seulement : 'corpus','pubdate','copyrightdate'
        facetsToLoad: [ 'corpusName','publicationDate','copyrightDate'],

        // il n'est possible de charger que certains champs de la recherche avancée
        // par défaut, tout les champs sont chargés
        // on peut mettre des valeurs par défaut aux champs au lieu de guillemets vides
        // pour enlever la recherche avancée, il faut mettre advancedToLoad:false
        advancedToLoad: {
            'author.name':"",
            'host.editor.name':"",
            'genre':"",
            'host.genre':"",
            'subject.value':"",
            'host.subject.value':"",
            'language':""
        },

        // il est possible d' soit un slider soit deux inputs lorsque les facettes sont des dates
        // si vous voulez le slider, n'oubliez pas d'inclure les dépendances en plus : slider/rzslider.css et slider/rzslider.js
        slider:true,

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

        // PAS ENCORE IMPLEMENTE
        // le format qu'on souhaite voir s'ouvrir quand on clique sur le titre
        fullTextOnTitle: 'pdf',

        // il est possible de cacher l'affichage de la vitesse de la requête
        // ex: "Environ 8 933 993 résultats (0.24 secondes)"
        // si showQuerySpeed vaut false, "(0.24 secondes)" ne sera pas affiché
        showQuerySpeed: true,

        // les différents textes paramétrables
        labels: {
            search: {
                'advancedTitle':"Recherche avancée",
                'placeholder':"Votre requête ici ...",
                'author.name':"Auteur",
                'host.editor.name':"Editeur",
                'genre':"Genre de document",
                'host.genre':"Genre de série",
                'subject.value':"Sujet du document",
                'host.subject.value':"Sujet de la série",
                'language':"Langue"
            },
            results: {
                'noresult':"Pas de résultat",
                'abstract':"Pas de résumé",
                'fulltext':"Texte complet",
                'metadata':"Métadonnées"
            },
            facets: {
                'title' : 'Affiner votre recherche',
                'corpus' : 'Corpus',
                'pubdate' : 'Date de publication',
                'copyrightdate' : 'Début du copyright'
            }
        }
    };

    // Updates the default configurations with the configurations from the HTML file if it exists
    if(window.istexConfig) {
        if (Object.getOwnPropertyNames(window.istexConfig).length > 0) {
            $rootScope.istexConfigDefault = extend($rootScope.istexConfigDefault, window.istexConfig);
            //add Slider to Angular Modules

        }
    }

}]);

// it links "app" to Angular and says the scope of app is the whole document
angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
});