
angular.module('Angello.pouchDB').factory('pouchdb', function () {
    var pouchdb = Pouch('AngelloDB');

    return pouchdb;
});

