(function(){

    var app = angular.module('hiceeContent',[]);


    app.controller('tabCtrl', function () {

        function tabCtrl($scope){
            $scope.currentNavItem = 'page1';
        }
    });

})();