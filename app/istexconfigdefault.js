app.run(['$rootScope', function($rootScope) {

    $rootScope.istexConfigDefault = {
        // l'adresse de l'API de l'Istex
        istexApi: 'https://api.istex.fr',
        // on peut avoir besoin de proxyfier les liens vers les plein-textes ou les méta-données
        // pour une ezproxyfication, réglez ici proxyApi à l'adresse ezproxyfiée
        // ex à l'UL: https://api-istex-fr.bases-doc.univ-lorraine.fr
        proxyApi: 'https://api.istex.fr',

        // pour lancer une recherche au chargement de la page
        // indiquer les mots à rechercher (argument de ?q= au niveau de l'api istex)
        // si vous ne voulez pas de recherche au d�marrage, ne mettez rien (ou query: false)
        // si vous mettez query: "", les r�sultats seront tous les documents
        query: false,

        // les termes de la recherche sont liés par l'opérateur logique voulu
        // les deux valeurs possibles sont "OR" (OU) et "AND" (ET)
        operator:"AND",

        // il est possible de mettre le focus sur la barre de recherche au chargement de la page
        focusInputQueryOnLoad: false,

        // il est possible de ne charger que certaines facettes
        // par défaut, on charge seulement : 'corpus','pubdate','copyrightdate','language','wos','score'
        facetsToLoad: [ 'genre', 'corpusName','publicationDate','copyrightDate','language','wos','score'],

        // il est possible de cacher l'affichage des résultats derrière un bouton. Une fois le bouton cliqué, les résultats apparaissent
        hideButton:false,

        // il n'est possible de charger que certains champs de la recherche avancée
        // par défaut, tout les champs sont chargés
        // on peut mettre des valeurs par défaut aux champs au lieu de guillemets vides
        // pour enlever la recherche avancée, il faut mettre advancedToLoad:false
        advancedToLoad: {
            'author.name':"",
            'genre':"",
            'host.title':"",
            'host.genre':"",
            'subject.value':"",
            'language':""
        },

        // il est possible que la recherche avancée soit dépliée par défaut.
        // Par défaut elle est repliée
        advancedExpanded:false,

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

        // on peut plier ou déplier les facettes par défaut
        shownFacet: true,

        // on peut ajouter ou enlever des tags (les mots entourés de vert)
        tags: {
            'publicationDate':true,
            'corpusName':true,
            'articleType':true
        },

        // on peut choisir quel critère pour trier les documents on préfère
        // par défaut on choisit
        defaultSort: '',
        // et sinon, on a une liste des tris disponibles
        possibleSorts: [
            {'value':'','name':'Pertinence'},
            {'value':'score[desc]','name':'Qualité du pdf'},
            {'value':'publicationDate','name':'Date de publication (croissant)'},
            {'value':'publicationDate[desc]','name':'Date de publication (décroissant)'},
            //{'value':'title[desc]','name':'Alphabétique (titre)'},
        ],

        // Show the quality indicator with stars, hidden by default
        qualityIndicator: false,

        // les différents textes paramétrables
        // il est possible d'avoir les langues en anglais en mettant 'traduction':'en'
        labels: {
            search: {
                'advancedTitle':"Recherche avancée",
                'author.name':"Auteur",
                'host.title':"Titre de la collection",
                'genre':"Genre du document",
                'host.genre':"Genre de la collection",
                'subject.value':"Sujet du document",
                'language':"Langue",
                placeholder:{
                    'main':"Votre requête ici ...",
                    'author.name':"ex : Dijkstra",
                    'host.editor.name':"",
                    'host.title':"ex : Journal of Algebra",
                    'genre':"ex : article, paper, ...",
                    'host.genre':" ex : ebook, reviews, ...",
                    'subject.value':"ex : cell division",
                    'language':"3 lettres : fre, eng, ita, ..."
                }
            },
            results: {
                'noresult':"Pas de résultat (Faites attention quand vous utilisez plusieurs facettes)",
                'showResult':"Affichez les résultats",
                'abstract':"Pas de résumé",
                'fulltext':"Texte complet",
                'metadata':"Métadonnées",
                'enrichment':"Enrichissements"
            },
            facets: {
                'title' : 'Affiner votre recherche',
                'corpusName' : 'Corpus',
                'publicationDate' : 'Date de publication',
                'copyrightDate' : 'Début du copyright',
                'score' : 'Qualité du PDF',
                'wos':'Catégorie',
                'language':'Langue',
                'traduction':'fr'
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