(function () {
    // This file contains the mainApp module
    var mainApp = angular.module('mainApp', ['ngMaterial', 'ui.router', 'ngFileUpload', 'mdColorPicker', 'basePage']);


    // mainApp service (Factory)
    mainApp.factory('mainService', function ($rootScope) {
        var service = {};
        service.name = 'HICEE WebApp';

        service.appProjectFile = {};
        service.appProjectFile.loaded = false;

        service.currentPage = {};
        service.currentPicked = {};

        service.setLoadedFile = function (newFile) {


            this.appProjectFile.loadedFile = newFile;

            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = function (e) {
                var text = reader.result;
            }
            reader.readAsText(this.appProjectFile.loadedFile);



            console.log(this.appProjectFile.loadedFile.name);
            console.log(this.appProjectFile.loadedFile.size);
            console.log(this.appProjectFile.loadedFile.lastModifiedDate);

        }

        return service;
    });

    // mainApp states
    mainApp.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/offlineStartPage');
        $stateProvider
            .state('offlineStartPage', {
                url: '/offlineStartPage',
                templateUrl: '/webopm/app/structure/pages/offlineStartPage.html'
            })
            .state('basePage', {
                url: '/basePage',
                templateUrl: '/webopm/app/structure/pages/basePage.html'
            })
            .state('project', {
                url: '/project',
                templateUrl: '/webopm/app/structure/pages/basePage.html',
                views: {
                    '': { templateUrl: '/webopm/app/structure/pages/basePage.html' },
                    'palette@project': { templateUrl: '/webopm/app/structure/palettes/projectPalette.html' },
                    'content@project': { templateUrl: '/webopm/app/structure/pages/projectPage.html' }
                }
            })
            .state('project.inspectproject', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/projectInspector.html' } }
            })
            .state('project.inspectmodel', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/modelInspector.html' } }
            })
            .state('project.inspectrelation', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/relationInspector.html' } }
            })
            .state('opm', {
                url: '/opm',
                templateURl: '/webopm/app/structure/pages/basePage.html',
                views: {
                    '': { templateUrl: '/webopm/app/structure/pages/basePage.html' },
                    'palette@opm': { templateUrl: '/webopm/app/structure/palettes/opmPalette.html' },
                    'content@opm': { templateUrl: '/webopm/app/structure/pages/opmPage.html' }
                }
            })
            .state('opm.inspectthing', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/thingInspector.html' } }
            })
            .state('opm.inspectlink', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/linkInspector.html' } }
            })
            .state('opm.inspectmodel', {
                views: { 'inspectordata': { templateUrl: '/webopm/app/structure/inspectors/modelInspector.html' } }
            });

    });

    mainApp.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('light-blue').backgroundPalette('teal').dark();
    });





    // mainApp controls
    mainApp.controller('fileController', ['$scope', '$state', '$timeout', 'mainService', 'Upload', function ($scope, $state, $timeout, mainService, Upload) {

        $scope.fileLoaded = false;

        $scope.loadOPMjson = function () {
            if ($scope.fileLoaded == false) {
                window.alert("File not Loaded");
            }
            var ans = confirm("do you want to load: " + $scope.f.name + " ?");
            if (ans == true) {
                x = "You pressed OK!";
                mainService.setLoadedFile($scope.f);
            } else {
                x = "You pressed Cancel!";
            }

        };


        $scope.uploadFiles = function (file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    if (file.progress == 100) {
                        $scope.fileLoaded = true;
                    }
                });
            }
        };

        $scope.loadModel = function () {
            console.log('[MAINAPP] load model');
            $state.go('project');

        };

        $scope.createModel = function () {
            console.log("[MAINAPP] create model");
            $state.go('opm');
        };



    }]);

    // mainApp directives
    mainApp.directive('myUpload', function () {
        return {
            template:
            '<input id="fileInput" type="file" ng-hide="true">' +
            '<md-button class="md-raised" ng-controller="fileController" ng-click="upload()">' +
            '<label> Load Model </label>' +
            '</md-button>',
            controller: 'fileController',
            restrict: 'E'

        };
    });





})();