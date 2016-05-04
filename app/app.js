// If IE8 or less, show error
window.myNav = navigator.userAgent.toLowerCase();
window.myNav = (window.myNav.indexOf('msie') != -1) ? parseInt(window.myNav.split('msie')[1]) : false;
if (window.myNav && window.myNav <= 8) {
    var scr = document.getElementsByTagName("script");
    var lastSrcipt = scr[scr.length - 1];
    lastSrcipt.insertAdjacentHTML('afterend', '<div id="old">Votre navigateur ne peut pas afficher les widgets ISTEX, veuillez en utiliser un plus récent : Internet Explorer 9 ou plus, Google Chrome, Firefox,...</div>');
}

var scripts = document.getElementsByTagName("script");
var isSlider = false;
for(var i = 0; i < scripts.length; i++){
    if(/\/rzslider.js/.test(scripts[i].src)){
        isSlider = true;
    }
};

// If istexConfig.slider = false, it's not loaded
if(window.istexConfig.slider !== false && isSlider){
    var app = angular.module('app', ['rzModule']);
}else{
    var app = angular.module('app', []);
}

app.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

/********************Functions********************/

// Credit to : http://gomakethings.com/ditching-jquery
// Merges two Javascript Objects
// @objects = The list of objects that will be merged
var extend = function ( objects ) {
    var extended = {};
    var merge = function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                extended[prop] = obj[prop];
            }
        }
    };
    merge(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        merge(obj);
    }
    return extended;
};

/********************Filters********************/
// HOW TO USE :
// {{ input | filter }}
// {{ input | filter:option1:option2:optionN }}

app.filter('proxify', function() {
    return function(input, istexApi) {
        if (input!=null && istexApi !== "https://api.istex.fr")
            input = input.replace("https://api.istex.fr", istexApi);
        return input;
    }
});

// Put the first letter of a word in upper case, the rest in lower case
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

// Put spaces every three digits in a number
app.filter('numberize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        return input;
    }
});

// Crops a string if it's too long
// @value = The string that may be croped
// @wordwise = A boolean which indicate if you want to cut the whole word (TRUE) or at the precise character (FALSE). DEFAULT : FALSE
// @max = Number of characters allowed in the String. DEFAULT : 10
// @tail = The String you crop with. DEFAULT : '...'
app.filter('ellipse', function () {
    return function (input, wordwise, max, tail) {
        if (!input) return '';

        max = parseInt(max, 10);
        if (!max) return input;
        if (input.length <= max) return input;

        input = input.substr(0, max);
        if (wordwise) {
            var lastspace = input.lastIndexOf(' ');
            if (lastspace != -1) {
                input = input.substr(0, lastspace);
            }
        }

        return input + (tail || ' …');
    };
});

// Write the full language name from initials
// @value = language initials
// @traduction = language in which the full language name must be written
app.filter('languagize', function(){
    return function(input, traduction){
        if(!input) return '';

        if(traduction==="en"){
            switch(input){
                case 'fre' : return 'French';
                case 'eng' : return 'English';
                case 'lat' : return 'Latin';
                case 'deu' : return 'German';
                case 'ger' : return 'German';
                case 'spa' : return 'Spanish';
                case 'dut' : return 'Dutch';
                case 'ita' : return 'Italian';
                case 'por' : return 'Portuguese';
                case 'rus' : return 'Russian';
                case 'wel' : return 'Welsh';
                case 'glg' : return 'Galician';
                case 'grc' : return 'Greek';
                case 'gre' : return 'Greek';
                case 'ara' : return 'Arabian';
                case 'heb' : return 'Hebrew';
                case 'pol' : return 'Polish';
                case 'dan' : return 'Danish';
                case 'swe' : return 'Swedish';
                case 'moh' : return 'Mohawk';
                case 'syr' : return 'Syriac';
                case 'per' : return 'Persian';
                case 'frm' : return 'French, Middle';
                case 'mul' : return 'Multiple languages';
                case 'unknown' : return 'Unknown';
                default : return input;
            }
        }else{
            switch(input){
                case 'fre' : return 'Français';
                case 'eng' : return 'Anglais';
                case 'lat' : return 'Latin';
                case 'deu' : return 'Allemand';
                case 'ger' : return 'Allemand';
                case 'spa' : return 'Espagnol';
                case 'dut' : return 'Néerlandais';
                case 'ita' : return 'Italien';
                case 'por' : return 'Portugais';
                case 'rus' : return 'Russe';
                case 'wel' : return 'Gallois';
                case 'glg' : return 'Galicien';
                case 'grc' : return 'Grec';
                case 'gre' : return 'Grec';
                case 'ara' : return 'Arabe';
                case 'heb' : return 'Hébreu';
                case 'pol' : return 'Polonais';
                case 'dan' : return 'Danois';
                case 'swe' : return 'Suédois';
                case 'moh' : return 'Mohawk';
                case 'syr' : return 'Syriaque';
                case 'per' : return 'Persan';
                case 'frm' : return 'Français moyen';
                case 'mul' : return 'Multilingue';
                case 'unknown' : return 'Non spécifié';
                default : return input;
            }
        }

    };
});

/********************Directives********************/
// HOW TO USE :
// <element directive="BOOLEAN">...</element>
// IMPORTANT :
// Here the name is in camel case (ngDirective) but in the HTML code, it must be kebab case (ng-directive)

// Custom toggle directive to be independent from jQuery
// @element = The element that will appear/disappear
// @attributes.ngToggle = A boolean which indicate if you want to hide (TRUE) or show (FALSE) the @element
app.directive(
    "ngToggle",
    function() {
        function link( $scope, element, attributes ) {
            element = element[0];

            var expression = attributes.ngToggle;

            // Default display of the element
            /*
            if ( ! $scope.$eval( expression ) ) {
                element.style.opacity = '0';
            }*/


            // Sort of event listener
            $scope.$watch(
                expression,
                function( newValue, oldValue ) {
                    // Show element.
                    if ( newValue ) {
                        element.style.opacity = '1';
                        // Hide element.
                    } else {
                        element.style.opacity = '0';
                    }
                }
            );
        }
        return({
            link: link,
            restrict: "A"
        });

    }
);

// Custom autofocus directive
// @element = The element that will be focused or blured
// @attributes.ngFocus = A boolean which indicate if you want to focus (TRUE) or blur (FALSE) the @element
app.directive(
    "ngFocus",
    function() {
        function link( $scope, element, attributes ) {
            element = element[0];

            var expression = attributes.ngFocus;

            // Default display of the element
            if ( $scope.$eval( expression ) ) {
                element.focus();
            }

            // Sort of event listener
            $scope.$watch(
                expression,
                function( newValue, oldValue ) {
                    // Ignore first-run values since we've
                    // already defaulted the element state.
                    if ( newValue === oldValue ) {
                        return;
                    }

                    // Show element.
                    if ( newValue ) {
                        element.focus();
                        // Hide element.
                    } else {
                        element.blur();
                    }
                }
            );
        }
        return({
            link: link,
            restrict: "A"
        });

    }
);
