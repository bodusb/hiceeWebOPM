(function () {
    // This file contains the basePage module
    var basePage = angular.module('basePage', ['baseHeader', 'basePalette', 'baseInspector', 'baseTabs']);


    // basePage service (Factory)
    basePage.factory('basePageService', function ($rootScope) {
        var service = {};
        service.name = 'HICEE WebApp';

        service.currentPage = {};
        service.currentPicked = {};

        return service;
    });

    // basePage controls
    basePage.controller('pageController',  ['$scope', '$state',function ($scope, $state) {

        $scope.viewProj = function () {
            console.log("[BASEPAGE] inspect Project");
            $state.go('project.inspectproject');
        };

        $scope.viewModel = function () {
            console.log("[BASEPAGE] inspect Model");
            $state.go('project.inspectmodel');
        };

        $scope.viewRelation = function () {
            console.log("[BASEPAGE] inspect Relation");
            $state.go('project.inspectrelation');
        };

        $scope.viewThing = function () {
            console.log("[BASEPAGE] inspect Thing");
            $state.go('opm.inspectthing');
        };

        $scope.viewLink = function () {
            console.log("[BASEPAGE] inspect Link");
            $state.go('opm.inspectlink');
        };
                    
        $scope.viewOPMModel = function () {
            console.log("[BASEPAGE] inspect OPM Model");
            $state.go('opm.inspectmodel');
        };





    }]);


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

    basePage.directive('pageContent', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/pages/content_page.html',
        };
    });

})();