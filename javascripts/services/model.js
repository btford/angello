
angular.module('Angello.model', [
    'Angello.modelDefaults',
    'Angello.pouchDB']).
factory('angelloModel', function (modelDefaults, $q, pouchdb) {

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
        pouchdb.query(function (doc) {
            if (doc.type === 'status') {
                emit(doc, null);
            }
        }, nodify(deferred));

        return deferred.promise.then(function (data) {
            if (data.length === 0) {
                return setDefaultStatuses().then(getStatuses());
            } else {
                return data;
            }
        });
    };

    // return a promise when done
    var setDefaultStatuses = function () {
        return $q.all(modelDefaults.status.map(function (status) {
            var deferred = $q.deferred;
            pouchdb.post(status, nodify(deferred));
            return deferred.promise;
        }));
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

