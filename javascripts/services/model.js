
angular.module('Angello.model', [
    'Angello.modelDefaults',
    'Angello.pouchdb']).
factory('model', function (modelDefaults, $q, couchdb) {

    // transform fun (err, data) -> reject and resolve
    var nodify = function (deferred) {
        return function (err, docs) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(docs);
            }
        };
    };

    var getStatuses = function () {
        var deferred = $q.defer();
        couchdb.query(function (doc) {
            if (doc.type === 'status') {
                emit(doc, null);
            }
        }, nodify(deferred));

        return deferred;
    };

    var getTypes = function () {
        
    };
    var getStories = function () {
        
    };

    // TODO: setWhatever or saveWhatever
    var setStatuses = function (statuses) {
        
    };
    var setTypes = function (types) {
        
    };
    var setStories = function (stories) {
        
    };

    return {
        getStatuses: getStatuses,
        getTypes: getTypes,
        getStories: getStories,
        setStatuses: setStatuses,
        setTypes: setTypes,
        setStories: setStories
    };

});

