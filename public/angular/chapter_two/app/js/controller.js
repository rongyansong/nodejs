/**
 * Created by Administrator on 2017/2/10 0010.
 */
var bookStoreCtrls = angular.module('bookStoreCtrls',[]);
bookStoreCtrls.controller('HelloCtrl',['$scope',
    function($scope){
        $scope.greeting = {
            text: 'Hello'
        };
    }
]);
bookStoreCtrls.controller('BookListCtrl',['$scope'],
    function($scope){
        $scope.books = [
            {title: "三生三世",author: "宋"},
            {title: "十里桃花",author: "荣"},
            {title: "一生情缘",author: "燕"}
        ]
    }
);