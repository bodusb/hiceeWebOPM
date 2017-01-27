(function () {
    // This file contains the baseHeader module
    var baseHeader = angular.module('baseHeader', []);


    // baseHeader service (Factory)
    baseHeader.factory('headerService', function ($rootScope) {
        var service = {};
        service.pageLabel = 'PageLabel from Service';
        service.getPageLabel = function () { return this.pageLabel; };
        service.setPageLabel = function (newLabel) {
            this.pageLabel = newLabel;
            $rootScope.$broadcast('headerService');
        };
     
        service.pageClick = function(label){
            this.click = label;
            $rootScope.$broadcast('headerService');
        };

        return service;
    });


    // baseHeader controls
    baseHeader.controller('headerCtrls',
        ['$scope','$mdSidenav','headerService',
            function ($scope, $mdSidenav, headerService) {

                $scope.pageLabel = "Start App";

                // Controls the Title Click 
                $scope.titleClick = function () {
                    console.log('[LOG] titleClick()');
                    $scope.pageLabel = headerService.getPageLabel();
                };

                // Controls the Config Click


            }
        ]);




})();