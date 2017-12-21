(function(angular){
	'use strict';

	//创建正在热映模块
	var module = angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);

	//配置模块的路由器
	module.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/:category/:page', {
	    templateUrl: 'movie_list/view.html',
	    controller: 'MovieListController'
	  });
	}]);

	module.controller('MovieListController', [
	  '$scope',
	  '$routeParams',  //路由的参数对象
	  '$route',  //更新页码
	  'HttpService',
	  'AppConfig',
	  function($scope,$routeParams,$route,HttpService,AppConfig) {
		//第一步：设计暴露的数据
		var count = 10; //每一页的条数
		var page = parseInt($routeParams.page); //当前页码
		var start = (page - 1) * count;  //当前页从那里开始
		$scope.loading = true;
		$scope.title = '';
		$scope.subjects = [];
		$scope.totalCount = 0;
		$scope.totalPages = 0;
		//第二步：设计暴露的行为

		/*该方法只能在同源下使用
	  	$http.get('./datas/in_theaters.json').then(function(rel){
			if(rel.status == 200){
				$scope.subjects = rel.data.subjects;
				console.log(rel);
				// 这里返回的rel并非json文件的data的json对象
			}else{
				$scope.message = '获取数据错误' + rel.statusText;
			}
		},function(err){
			$scope.message = '获取数据错误' + err.statusText;
		});*/

		HttpService.jsonp(
		  AppConfig.listApiAddress + $routeParams.category,
		  { start: start, count: count, q: $routeParams.q },  //传入动态数据
		  function(data){
		  	$scope.title = data.title;
			$scope.subjects = data.subjects;
			//console.log($scope.subjects);
			$scope.totalCount = data.total;
			$scope.totalPages = Math.ceil($scope.totalCount / count);
			$scope.currentPage = page;
			$scope.loading = false;
			$scope.$apply();

			$scope.go = function(page){
				if(page >=1 && page <= $scope.totalPages)
					$route.updateParams({page:page});
			};
		});
	}]);
})(angular)