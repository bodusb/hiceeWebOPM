(function(){
    // This file contains the palette module
    var basePalette = angular.module('basePalette',['ngMaterial']);


    // palette service (Factory)



    // palette controls
    basePalette.controller('paletteCtrls', ['$scope','$mdSidenav',
        function ($scope, $mdSidenav, dataShare) {
            $scope.text = 'Default Palette';

        // Controls the Palette open/close
        $scope.togglePalette = function(){
                $mdSidenav('basePalette').toggle();
        };


        }
    ]);

    // palette directives
    basePalette.directive('palette', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/palettes/base_palette.html',
        };
    });             

})();