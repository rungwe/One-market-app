angular.module('app.controllers', [])
  
.controller('shopCtrl', function($scope, Shop) {
	$scope.products = Shop.getProducts();
	$scope.doRefresh = function(){
		
	}
})
   
.controller('broadcastCtrl', function($scope,Broadcast) {
	$scope.data= [];
	$scope.data = Broadcast.getBroadcasts();
	Broadcast.getBroadcasts().then(function(d) {
		console.log(d);
    	$scope.data = d;

  });
	$scope.like=function(broadcast){
		var id =broadcast.ID;
		for (var i = 0; i < $scope.data.length; i++) {
			if($scope.data[i].ID==id){
				$scope.data[i].ID+=1;

			}
		}

		//alert(broadcast.ID);
	}

})
   
.controller('adsCtrl', function($scope, Ads, $window) {
	$scope.ads = Ads.getAds();
})

.controller('mainCtrl', function($scope,$window,$cordovaToast,User){
  
  User.getProfile().then(function(d) {
    $scope.userProfile = d[0];

  });

  $scope.logout= function(){
  	
  	$window.localStorage.removeItem('User');
  	try{
	  	$cordovaToast.showShortBottom('logging you out').then(function(success) {
	    // success
	    
	  }, function (error) {
	    // error
	  });
	  }
	  catch(err){
	  	//nothing
	  }
  	$window.location.href="index.html";
  	
  }
  
 
})
