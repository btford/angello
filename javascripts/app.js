var myModule = angular.module('Angello', []);

myModule.factory('angelloHelper', function($rootScope) {
    var buildIndex = function(source, property) {
        var tempArray = [];

        for(var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.controller('MainCtrl', function($scope, angelloModel, angelloHelper) {
    $scope.currentStory;
    
    $scope.types = angelloModel.getTypes();
    $scope.statuses = angelloModel.getStatuses();
    $scope.stories = angelloModel.getStories();
    $scope.typesIndex = angelloHelper.buildIndex($scope.types, 'name');
    $scope.statusesIndex = angelloHelper.buildIndex($scope.statuses, 'name');

    $scope.setCurrentStory = function(story) {
        $scope.currentStory = story;

        $scope.currentStatus = $scope.statusesIndex[story.status];
        $scope.currentType = $scope.typesIndex[story.type];
    };

    $scope.createStory = function() {
        $scope.stories.push({title:'New Story', description:'Description pending.', criteria:'Criteria pending.', status:'Back Log', type:'Feature', reporter:'Pending', assignee:'Pending'});
    };

    $scope.setCurrentStatus = function(status) {
        if(typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.status = status.name;
        }
    };

    $scope.setCurrentType = function(type) {
        if(typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.type = type.name;
        }
    };
});