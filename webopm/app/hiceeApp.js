(function () {

    var app = angular.module('HiceeApp', ['ngMaterial','appHeader','hiceeContent']);

    /* 
    1 - Project page 
    2 - OPM page
    3 - Interface page
    4 - Tree page
    5 - DSM page
    6 - Disc page
    7 - Function page
    */

    app.factory('dataShare', function ($rootScope) {
        var service = {};
        service.data = false;
        service.pageLabel = 'Page Test from Service';

        service.appState = 1;
        service.currentViewType = 1;

        service.tabId = 1;
        service.contentURL = 'app/structure/context/default_contentA.html';

        service.sendData = function (data) {
            this.data = data;
            $rootScope.$broadcast('data_shared');
        };
        service.getData = function () {
            return this.data;
        };

        service.setPageLabel = function (newLabel) {
            this.pageLabel = newLabel;
            $rootScope.$broadcast('data_shared');
        };
        service.getPageLabel = function () {
            return this.pageLabel;
        };

        service.setContentPage = function(newPage) {
            this.contentURL = newPage;
            $rootScope.$broadcast('data_shared');
        };

        service.getContentPage = function() {
            return this.contentURL;
        };

        return service;
    });




    app.controller('MainCtrl', ['$scope', 'dataShare',
        function ($scope, dataShare) {
            $scope.text = 'Hey';
            $scope.send = function () {
                dataShare.sendData($scope.text);
            };

        }
    ]);
    app.controller('MainCtrl2', ['$scope', 'dataShare',
        function ($scope, dataShare) {

            $scope.text = '';
            $scope.$on('data_shared', function () {
                var text = dataShare.getData();
                $scope.text = text;
            });
        }
    ]);


    app.controller('PageController', ['$scope', 'dataShare',
        function ($scope, dataShare) {

            $scope.pageLabel = '';
            $scope.contentURL = '';
            $scope.$on('data_shared', function () {
                var aux = dataShare.getPageLabel();
                $scope.pageLabel = aux;
                aux = dataShare.getContentPage();
                $scope.contentURL = aux;

            });
            $scope.start = function() {
                dataShare.sendData('loading');
            };

            $scope.setContext = function(newContext){
                console.log('PageController - setContext: ' + newContext);
                dataShare.setContentPage(newContext);
                
            };
        }
    ]);


    app.directive('pageHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/headers/default_header.html',
            controller: function () {
            },
            controllerAs: 'hCtrl',
        };
    });

    app.directive('pagePalette', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/palettes/default_palette.html',
            controller: function () {
            },
            controllerAs: 'tc',
        };
    });

    app.directive('pageContent', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/contexts/default_content.html',
        };
    });

    app.directive('pageInspector', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/inspectors/default_inspector.html',
            controller: function () {
            },
            controllerAs: 'tc',
        };
    });

    app.directive('pageBottomSheet', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/structure/bottoms/default_bottom.html',
            controller: function () {
            },
            controllerAs: 'tc',
        };
    });

})();