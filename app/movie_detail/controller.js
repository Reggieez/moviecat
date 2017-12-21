(function(angular){
	'use strict';

	angular.module(
		'moviecat.movie_detail',[
		'ngRoute',
		'moviecat.services.http'
	])

	//配置模块路由
	  .config(['$routeProvider',function($routeProvider){
	  	$routeProvider.when('/detail/:id',{
	  		templateUrl: 'movie_detail/view.html',
	  		controller: 'DetailController'
	  	});
	  }])

	  .controller('DetailController',[
	  	'$scope',
	  	'$routeParams',
	  	'$route',
	  	'HttpService',
	  	'AppConfig',
	  	function($scope,$routeParams,$route,HttpService,AppConfig){
	  		$scope.movie = {};
	  		$scope.loading = false;
	  		var id = $routeParams.id;
	  		var apiAddress = AppConfig.detailApiAddress + id;
	  		//跨域的方式
	  		HttpService.jsonp(apiAddress,{},function(data){
	  			$scope.movie = data;
	  			$scope.loading = true;
	  			$scope.$apply();
	  			//第三方异步请求过后必须通过$apply()的方式进行重新绑定
	  		});
	  	}]);
})(angular)