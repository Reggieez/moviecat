'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list'
  //这里模块的先后顺序决定域名先匹配的顺序
])
  //constant(name,value)可以将一个已经存在的变量值注册为服务，
  //并将其注入到应用的其他部分中。
.constant('AppConfig',{
  pageSize: 10,
  listApiAddress: 'http://api.douban.com/v2/movie/',
  detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
})
.config(['$routeProvider', function($routeProvider) {
	// 默认跳转到其中的一个
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
.controller('NavController',[
  '$scope',
  '$location',
  function($scope,$location){
  	$scope.$location = $location;
  	//console.log($location.path());
  	/*$watch只能监视$scope上挂载的变量*/
  	$scope.$watch('$location.path()',function(now){
  		if(now.startsWith('/in_theaters')){
  			$scope.category = 'in_theaters';
  		}else if(now.startsWith('/coming_soon')){
  			$scope.category = 'coming_soon';
  		}else if(now.startsWith('/top250')){
  			$scope.category = 'top250';
  		}
  		console.log($scope.category);
  	});
}])
.controller('SearchController',[
  '$scope',
  '$route',
  function($scope,$route){
    $scope.input = '';
    $scope.search = function(){
      $route.updateParams({category:'search', q:$scope.input });
    };

  }
]);
