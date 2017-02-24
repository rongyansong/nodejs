/**
 * Created by Administrator on 2017/2/7 0007.
 */
var myModule = angular.module("MyModule",[]);
myModule.directive("hello",function(){
    return {
        restrict: 'E',
        template: '<div>Hi everyone!</div>',
        replace: true
    }
})