(function(){
    // This file contains the mainApp module
    var mainApp = angular.module('mainApp',['ngMaterial','basePage']);


    // mainApp service (Factory)
    mainApp.factory('mainService',function($rootScope){
        var service = {};
            service.name = 'HICEE WebApp';

            service.currentPage = {};
            service.currentPicked = {};

        return service;
    });


    // mainApp controls


    // mainApp directives
    mainApp.directive('mainPage', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/pages/base_page.html',
        };
    });                

})();