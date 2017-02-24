/**
 * Created by Administrator on 2017/2/8 0008.
 */
function GreetCtrl($scope, $rootScope){
    $scope.name = 'World';
    $rootScope.department = 'Angular';
}

function ListCtrl($scope){
    $scope.names = ['song','rong','yan'];
}