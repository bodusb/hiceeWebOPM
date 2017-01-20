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

    // Project Inpector Controller
    baseInspector.controller('projectCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {

        }
    ]);

    // OPM Model Inpector Controller
    baseInspector.controller('opmCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {

        }
    ]);

    // OPM Relation Inpector Controller
    baseInspector.controller('relationCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {

        }
    ]);

    // OPM Thing Inpector Controller
    baseInspector.controller('thingCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {

        }
    ]);    

    // OPM Link Inpector Controller
    baseInspector.controller('linkCtrl', ['$scope', '$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {

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