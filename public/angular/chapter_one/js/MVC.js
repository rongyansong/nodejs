/**
 * Created by Administrator on 2017/2/8 0008.
 */
function CommonController($scope){
    $scope.commonFn = function(){
        alert("这是通用功能");
    };
}
function Controller1($scope){
    $scope.greeting = {
        text: 'Hello1'
    };
    $scope.test1 = function(){
        alert('test1');
    };
}
function Controller2($scope){
    $scope.greeting = {
        text: 'Hello2'
    };
    $scope.test2 = function(){
        alert('test2');
    }
}