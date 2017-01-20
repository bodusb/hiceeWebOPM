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
                templateUrl: '/app/structure/pages/offlineStart_page.html'
            })
            .state('basePage', {
                url: '/basePage',
                templateUrl: '/app/structure/pages/base_page.html'
            })
            .state('project', {
                url: '/project',
                templateUrl: '/app/structure/pages/base_page.html',
                views: {
                    '': { templateUrl: '/app/structure/pages/base_page.html' },
                    'palette@project': { templateUrl: '/app/structure/palettes/project_palette.html' },
                    'content@project': { templateUrl: '/app/structure/pages/project_page.html' }
                }
            })
            .state('project.inspectproject', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/project_inspector.html' } }
            })
            .state('project.inspectmodel', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/model_inspector.html' } }
            })
            .state('project.inspectrelation', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/relation_inspector.html' } }
            })
            .state('opm', {
                url: '/opm',
                templateURl: '/app/structure/pages/base_page.html',
                views: {
                    '': { templateUrl: '/app/structure/pages/base_page.html' },
                    'palette@opm': { templateUrl: '/app/structure/palettes/opm_palette.html' },
                    'content@opm': { templateUrl: 'app/structure/pages/opm_page.html' }
                }
            })
            .state('opm.inspectthing', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/thing_inspector.html' } }
            })
            .state('opm.inspectlink', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/link_inspector.html' } }
            })
            .state('opm.inspectmodel', {
                views: { 'inspectordata': { templateUrl: '/app/structure/inspectors/model_inspector.html' } }
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