(function () {
    'use strict';
    angular.module('app')
        .filter('date', formatDate)
        .filter('time', formatTime)
        .filter('datetime', formatDatetime)
        .filter('reverse', reverseArray)
        .filter('with', withArray)
        .filter('inSlicesOf', filterInSlicesOf)
        .filter('filterServiceAddresses', filterServiceAddresses)
        .filter('filterServiceAddresses2', filterServiceAddresses2)
        .filter('tel', tel)
        .filter('distance', distance)
        .filter('cpf', formatCPF)
        ;

    function formatCPF() {
        return function (input) {
            var str = input + '';
            if (str.length <= 11) {
                str = str.replace(/\D/g, '');
                str = str.replace(/(\d{3})(\d)/, "$1.$2");
                str = str.replace(/(\d{3})(\d)/, "$1.$2");
                str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            }
            return str;
        }
    }

    function formatDate() {
        return function (date, format) {
            var mDate = moment(date);
            if (date && mDate.isValid()) {
                return mDate.format(format ? format : 'D MMMM YYYY');
            } else {
                return date;
            }
        }
    }

    function formatTime() {
        return function (date, format) {
            var mDate = moment(date);
            if (date && mDate.isValid()) {
                return mDate.format(format ? format : 'HH:mm');
            } else {
                return date;
            }
        }
    }

    function formatDatetime() {
        return function (date, format) {
            var mDate = moment(date);
            if (date && mDate.isValid()) {
                return mDate.format(format ? format : 'DD/MM/YYYY HH:mm');
            } else {
                return date;
            }
        }
    }

    function reverseArray() {
        return function (items) {
            return items.slice().reverse();
        };
    }

    function withArray() {
        return function (items, items2) {
            return items.concat(items2);
        };
    }

    function filterServiceAddresses() {
        // Just add arguments to your HTML separated by :
        // And add them as parameters here, for example:
        // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
        return function (dataArray, searchTerm) {
            // If no array is given, exit.
            if (!dataArray) {
                return;
            }
            // If no search term exists, return the array unfiltered.
            else if (!searchTerm) {
                return dataArray;
            }
            // Otherwise, continue.
            else {
                // Convert filter text to lower case.
                var term = searchTerm.filterText.toLowerCase();
                // Return the array and filter it by looking for any occurrences of the search term in each items id or name. 
                return dataArray.filter(function (item) {
                    var termInName = item.professionalDTO.name.toLowerCase().indexOf(term) > -1;
                    var termInState = item.addressDTO.addressState.toLowerCase().indexOf(term) > -1;
                    var termInStreet = item.addressDTO.addressStreet.toLowerCase().indexOf(term) > -1;
                    var termInNumber = item.addressDTO.addressNumber.toLowerCase().indexOf(term) > -1;
                    var termInNeighborhood = item.addressDTO.addressNeighborhood.toLowerCase().indexOf(term) > -1;
                    var termInCountry = item.addressDTO.addressCountry.toLowerCase().indexOf(term) > -1;
                    var termInLegalPerson = item.legalPersonDTO.name.toLowerCase().indexOf(term) > -1;
                    return termInName || termInState ||
                        termInStreet || termInNumber ||
                        termInNeighborhood || termInCountry || termInLegalPerson;
                });
            }
        }
    }


    function filterServiceAddresses2() {
        // Just add arguments to your HTML separated by :
        // And add them as parameters here, for example:
        // return function(dataArray, searchTerm, argumentTwo, argumentThree) {
        return function (dataArray, searchTerm) {
            // If no array is given, exit.
            if (!dataArray) {
                return;
            }
            // If no search term exists, return the array unfiltered.
            else if (!searchTerm) {
                return dataArray;
            }
            // Otherwise, continue.
            else {
                // Convert filter text to lower case.
                var term = searchTerm.filterText.toLowerCase();
                // Return the array and filter it by looking for any occurrences of the search term in each items id or name. 
                return dataArray.filter(function (item) {
                    var termInName = item.ProfessionalDTO.Name.toLowerCase().indexOf(term) > -1;
                    var termInState = item.AddressDTO.AddressState.toLowerCase().indexOf(term) > -1;
                    var termInStreet = item.AddressDTO.AddressStreet.toLowerCase().indexOf(term) > -1;
                    var termInNumber = item.AddressDTO.AddressNumber.toLowerCase().indexOf(term) > -1;
                    var termInNeighborhood = item.AddressDTO.AddressNeighborhood.toLowerCase().indexOf(term) > -1;
                    var termInCountry = item.AddressDTO.AddressCountry.toLowerCase().indexOf(term) > -1;
                    var termInLegalPerson = item.LegalPersonDTO.Name.toLowerCase().indexOf(term) > -1;
                    return termInName || termInState ||
                        termInStreet || termInNumber ||
                        termInNeighborhood || termInCountry || termInLegalPerson;
                });
            }
        }
    }


    function filterInSlicesOf($rootScope) {
        return function (items, count) {
            if (!angular.isArray(items) && !angular.isString(items)) return items;
            if (!count) { count = 3; }
            var array = [];
            for (var i = 0; i < items.length; i++) {
                var chunkIndex = parseInt(i / count, 10);
                var isFirst = (i % count === 0);
                if (isFirst) { array[chunkIndex] = []; }
                array[chunkIndex].push(items[i]);
            }

            if (angular.equals($rootScope.arrayinSliceOf, array)) {
                return $rootScope.arrayinSliceOf;
            } else {
                $rootScope.arrayinSliceOf = array;
            }

            return array;
        };
    }

    function distance() {
        return function (dis) {
            if (!dis) { return 'Não há' }
            dis = parseFloat(dis);
            if (dis >= 1000) {
                var result = Math.round(dis / 1000);
                return result.toString() + ' Km';
            }
            else {
                return dis.toString() + ' Metros';
            }
        }
    }

    function tel() {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // 27######## -> (DDD) ####-####
                    country = 55;
                    city = value.slice(0, 2);
                    number = value.slice(2);
                    number = number.slice(0, 3) + '-' + number.slice(3);
                    break;

                case 11: // 27######### -> (37) #####-####
                    country = 55;
                    city = value.slice(0, 2);
                    number = value.slice(2);
                    number = number.slice(0, 4) + '-' + number.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    city = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country == 55) {
                country = "";
            }

            return (country + " (" + city + ") " + number).trim();
        }
    }
})();
