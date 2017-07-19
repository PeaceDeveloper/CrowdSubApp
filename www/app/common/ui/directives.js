(function () {
    'use strict';
    angular.module('app')
        .directive('dateInputDirective', dateInputDirective)
        .directive('caret', caret)

    function caret() {
        function setCaretPosition(elem, caretPos) {
            if (elem !== null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                } else {
                    if (elem.setSelectionRange) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else
                        elem.focus();
                }
            }
        }

        return {
            scope: { value: '=ngModel' },
            link: function (scope, element, attrs) {
                //var caret = Number(attrs.caret);
                scope.$watch('value', function (newValue, oldValue) {
                    if (newValue && newValue != oldValue && !isNaN(newValue)) {
                        setCaretPosition(element[0], newValue.length + 2);
                    }
                });
            }
        };
    }

    function dateInputDirective() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function (data) {
                    //convert data from view format to model format
                    return data; //converted
                });

                ngModelController.$formatters.push(function (data) {
                    //convert data from model format to view format
                    return data; //converted
                });
            }
        }
    }
})();



