/**
 * Created by Administrator on 2017/2/9 0009.
 */
function EventController($scope){
    $scope.count = 0;
    $scope.$on('MyEvent',function(){
        $scope.count++;
    });
}