var app = angular.module('app', []);

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
