window.myNav = navigator.userAgent.toLowerCase();
window.myNav = (window.myNav.indexOf('msie') != -1) ? parseInt(window.myNav.split('msie')[1]) : false;
if (window.myNav && window.myNav <= 8) {
    var scr = document.getElementsByTagName("script");
    var lastSrcipt = scr[scr.length - 1];
    lastSrcipt.insertAdjacentHTML('afterend', '<div id="old">Votre navigateur ne peut pas afficher les widgets ISTEX, veuillez en utiliser un plus récent : Internet Explorer 9 ou plus, Google Chrome, Firefox,...</div>');
}

if(window.istexConfig.slider !== false)
    var app = angular.module('app', ['rzModule']);
else
    var app = angular.module('app', []);

/********************Functions********************/

// Credit to : http://gomakethings.com/ditching-jquery
// Permits to merge two Javascript Objects
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
            //input = istexApi+input.substring(20);
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
