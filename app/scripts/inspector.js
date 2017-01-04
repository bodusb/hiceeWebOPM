(function(){
    // This file contains the inspector module
    var baseInspector = angular.module('baseInspector',['ngMaterial']);


    // inspector service (Factory)




    // inspector controls
    baseInspector.controller('inspectorCtrls', ['$scope','$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {
            $scope.text = 'Default Inspector';

        // Controls the inspector open/close
        $scope.toggleInspector = function(){
                $mdSidenav('baseInspector').toggle();
        };


        }
    ]);    

    // inspector directives
    baseInspector.directive('inspector', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/inspectors/base_inspector.html',
        };
    });             

})();