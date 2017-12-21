(function(angular){
	'use strict';

	//创建正在热映模块
	var module = angular.module('myApp.coming_soon', ['ngRoute']);

	//配置模块的路由器
	module.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/coming_soon/:page', {
	    templateUrl: 'coming_soon/view.html',
	    controller: 'ComingSoonController'
	  });
	}]);

	module.controller('ComingSoonController', [
	  '$scope',
	  '$routeParams',  //路由的参数对象
	  'HttpService',
	  function($scope,$routeParams,HttpService) {
		//第一步：设计暴露的数据
		var count = 10;
		var page = parseInt($routeParams.page);
		var start = (page - 1) * count;
		$scope.loading = true;
		$scope.subjects = [];
		$scope.message = '';
		//第二步：设计暴露的行为

		/*该方法只能在同源下使用
	  	$http.get('./datas/top250.json').then(function(rel){
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
		  'http://api.douban.com/v2/movie/coming_soon',
		  { start: start, count: count },  //传入动态数据
		  function(data){
			$scope.subjects = data.subjects;
			//console.log($scope.subjects);
			$scope.loading = false;
			$scope.$apply();
		});
	}]);
})(angular)