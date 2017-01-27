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
    basePage.controller('pageController', ['$scope', '$state', function ($scope, $state) {

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


    basePage.controller('MinimalCtrl', function ($scope) {


        $scope.model = new go.GraphLinksModel(
            [
                { key: 1, text: "test", fill: "white", stroke: "black", loc: "0 0", size: "400 400", isGroup: true, category: "file" },                  // File A
                { key: 2, text: "opmXYZ", fill: "white", stroke: "darkcyan", loc: "50 60", size: "20 20", isGroup: true, group: "1", category: "model" },  // Model inside File A
                { key: 3, text: "opmXYZ", fill: "white", stroke: "darkcyan", loc: "300 60", size: "20 20", isGroup: true, group: "1", category: "model" },  // Model inside File A
                { key: 4, text: "opmXYZ", fill: "white", stroke: "darkcyan", loc: "100 120", size: "200 200", isGroup: true, group: "1", category: "model" },  // Model inside File A
                { key: 5, text: "robot", textPlace: "go.Spot.Top", fill: "white", stroke: "blue", isGroup: true, loc: "120 140", size: "160 80", group: "4", category: "object" },
                { key: 6, text: "engaged", fill: "white", stroke: "yellow", isGroup: true, loc: "130 180", group: "5", category: "state" },
                { key: 7, text: "not-engaged", fill: "white", stroke: "red", isGroup: true, loc: "190 180", group: "5", category: "state" },
                { key: 8, text: "engage", fill: "white", stroke: "green", isGroup: true, loc: "160 270", size: "80 40", group: "4", category: "process" },
                /*{ key: 9, text: "I", fill: "white", stroke: "cyan", width: 60, height: 40, category: "model" },
                { key: 10, text: "J", fill: "white", stroke: "cyan", width: 60, height: 40, category: "model" },
                { key: 11, text: "K", fill: "white", stroke: "cyan", width: 60, height: 40, category: "model" },*/
            ],
            [
                { from: 2, to: 2, category: "simple" },
                { from: 3, to: 4, category: "simple" },
                { from: 4, to: 2, category: "simple" },
                { from: 7, to: 8, category: "simple" },
                { from: 8, to: 6, category: "simple" }
            ]);

        $scope.model.selectedNodeData = null;

    });


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


    basePage.directive('goDiagram', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            scope: { model: '=goModel' },
            link: function (scope, element, attrs) {
                var $ = go.GraphObject.make;
                var diagram = $(go.Diagram, element[0], { //Define the diagram characteristics
                    //initialContentAlignment: go.Spot.Center,
                    "ModelChanged": updateAngular,
                    "ChangedSelection": updateSelection,
                    "undoManager.isEnabled": true,
                    "grid.visible": true,
                    "draggingTool.isGridSnapEnabled": true,
                    "resizingTool.isGridSnapEnabled": true
                });
                // diagram.layout = $(go.LayeredDiagraphLayout,{direction:90,layerSpacing:10});
                diagram.groupTemplateMap = createTemplateMap();
                diagram.linkTemplateMap = createLinkTemplates();
                function updateAngular(e) { // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
                    if (e.isTransactionFinished) {
                        scope.$apply();
                    }
                };

                function updateSelection(e) { // update the Angular model when the Diagram.selection changes
                    diagram.model.selectedNodeData = null;
                    var it = diagram.selection.iterator;
                    while (it.next()) {
                        var selnode = it.value;
                        // ignore a selected link or a deleted node
                        if (selnode instanceof go.Node && selnode.data !== null) {
                            diagram.model.selectedNodeData = selnode.data;
                            break;
                        }
                    }
                    scope.$apply();
                }

                scope.$watch("model", function (newmodel) { // notice when the value of "model" changes: update the Diagram.model
                    var oldmodel = diagram.model;
                    if (oldmodel !== newmodel) {
                        diagram.removeDiagramListener("ChangedSelection", updateSelection);
                        diagram.model = newmodel;
                        diagram.addDiagramListener("ChangedSelection", updateSelection);
                    }
                });

                scope.$watch("model.selectedNodeData.name", function (newname) {
                    if (!diagram.model.selectedNodeData) return;
                    // disable recursive updates
                    diagram.removeModelChangedListener(updateAngular);
                    // change the name
                    diagram.startTransaction("change name");
                    // the data property has already been modified, so setDataProperty would have no effect
                    var node = diagram.findNodeForData(diagram.model.selectedNodeData);
                    if (node !== null) node.updateTargetBindings("name");
                    diagram.commitTransaction("change name");
                    // re-enable normal updates
                    diagram.addModelChangedListener(updateAngular);
                });


            }
        }
    });

    //functions

    //TemplateMap function
    function createTemplateMap() {

        var $ = go.GraphObject.make;
        var hiceeTemplateMap = new go.Map("string", go.Group);


        var fileTemplate = $(go.Group, "Vertical",
            { selectionObjectName: "SHAPE", resizable: true, resizeObjectName: "SHAPE", locationObjectName: "SHAPE" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Horizontal",  // the header
                $("SubGraphExpanderButton"),  // this Panel acts as a Button
                $(go.TextBlock, new go.Binding("stroke", "stroke"), { text: 'file: ' }),
                $(go.TextBlock, new go.Binding("text", "text"), new go.Binding("stroke", "stroke"), { editable: true, isMultiline: false }) // group title
            ),
            $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
                new go.Binding("fill", "fill"),
                new go.Binding("stroke", "stroke"),
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                { name: "SHAPE", strokeWidth: 4 })
        );

        var modelTemplate = $(go.Group, "Vertical",
            { selectionObjectName: "SHAPE", resizable: true, resizeObjectName: "SHAPE", locationObjectName: "SHAPE" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Horizontal",  // the header
                $("SubGraphExpanderButton"),  // this Panel acts as a Button
                $(go.TextBlock, new go.Binding("stroke", "stroke"), { text: 'model: ' }),
                $(go.TextBlock, new go.Binding("text", "text"), new go.Binding("stroke", "stroke"), { editable: true, isMultiline: false }) // group title
            ),
            $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
                new go.Binding("fill", "fill"),
                new go.Binding("stroke", "stroke"),
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                { name: "SHAPE", strokeWidth: 4 })
        );

        var objectTemplate = $(go.Group, "Vertical",
            { selectionObjectName: "SHAPE", resizable: true, resizeObjectName: "SHAPE", locationObjectName: "SHAPE" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Auto",
                $(go.Shape, "Rectangle",  // surrounds the Placeholder
                    new go.Binding("fill", "fill"),
                    new go.Binding("stroke", "stroke"),
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                    { name: "SHAPE", strokeWidth: 2 }
                ),
                $(go.TextBlock, new go.Binding("text", "text"), new go.Binding("stroke", "stroke"), new go.Binding("alignment", "textPlace", go.Spot.parse), { editable: true, isMultiline: false })
            )
        );

        var stateTemplate = $(go.Group, "Vertical",
            { selectionObjectName: "SHAPE", resizable: true, resizeObjectName: "SHAPE", locationObjectName: "SHAPE" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Auto",
                $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
                    new go.Binding("fill", "fill"),
                    new go.Binding("stroke", "stroke"),
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                    { name: "SHAPE", strokeWidth: 2 }),
                $(go.TextBlock, new go.Binding("text", "text"), new go.Binding("stroke", "stroke"), { editable: true, isMultiline: false })
            )
        );

        var processTemplate = $(go.Group, "Vertical",
            { selectionObjectName: "SHAPE", resizable: true, resizeObjectName: "SHAPE", locationObjectName: "SHAPE" },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Auto",
                $(go.Shape, "Ellipse",  // surrounds the Placeholder
                    new go.Binding("fill", "fill"),
                    new go.Binding("stroke", "stroke"),
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                    { name: "SHAPE", strokeWidth: 2 }),
                $(go.TextBlock, new go.Binding("text", "text"), new go.Binding("stroke", "stroke"), { editable: true, isMultiline: false })
            )
        );


        hiceeTemplateMap.add("file", fileTemplate);
        //      hiceeTemplateMap.add("server", serverTemplate);
        hiceeTemplateMap.add("model", modelTemplate);
        //      hiceeTemplateMap.add("filter", filtertemplate);
        hiceeTemplateMap.add("object", objectTemplate);
        hiceeTemplateMap.add("state", stateTemplate);
        hiceeTemplateMap.add("process", processTemplate);


        return hiceeTemplateMap;
    };

    //TemplateMap function
    function createLinkTemplates() {

        var $ = go.GraphObject.make;
        var hiceeLinks = new go.Map("string", go.Link);


        var simpleTemplate = $(go.Link,
            $(go.Shape,
                { strokeWidth: 2, stroke: "gray" },  // default color is "gray"
                { // here E is the InputEvent and OBJ is this Shape
                    mouseEnter: function (e, obj) { obj.strokeWidth = 4; obj.stroke = "dodgerblue"; },
                    mouseLeave: function (e, obj) { obj.strokeWidth = 2; obj.stroke = "gray"; }
                })
        );

        hiceeLinks.add("simple", simpleTemplate);

        return hiceeLinks;
    }

})();