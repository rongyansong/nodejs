/**
 * Created by Administrator on 2017/2/7 0007.
 */
var myModule = angular.module("HelloAngular", []);

myModule.controller("helloAngular", ['$scope',
    function HelloAngular($scope){
        $scope.greeting = {
            text:'你好'
        };
    }
]);