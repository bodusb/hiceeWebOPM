(function(){
    // This file contains the basePage module
    var basePage = angular.module('basePage',['baseHeader','basePalette','baseInspector','baseTabs']);


    // basePage service (Factory)



    // basePage controls


    // basePage directives
    basePage.directive('pageHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/headers/base_header.html',
        };
    }); 

    basePage.directive('pageTab', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/headers/base_tab.html',
        };
    }); 

    basePage.directive('pageContext', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/pages/base_page.html',
        };
    });             

})();