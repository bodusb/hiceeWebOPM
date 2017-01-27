(function(){
    // This file contains the baseTabs module
    var baseTabs = angular.module('baseTabs',[]);


    // baseTabs service (Factory)



    // baseTabs controls

    baseTabs.controller('tabCtrls', ['$scope',
        function ($scope, dataShare) {
            $scope.text = 'tabCtrls';

        }
    ]);


})();