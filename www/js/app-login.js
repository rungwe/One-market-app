// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('onemarket', ['ionic','ngCordova'])

.run(function($ionicPlatform,$window) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if($window.localStorage.getItem("User")!=null){
        $window.location.href="home.html";
        
    }

  });
})

.controller('LoginCtrl', ['$scope','$http','$window','$location','Aunthenticate','$cordovaToast',function ($scope,$http,$window,$location,Aunthenticate,$cordovaToast){
	//$scope.Remember =true;
	$scope.Register = false;
	
	$scope.test =function(){
		if($window.localStorage.Remember){
			alert($window.localStorage.Remember);
		}
		else{
			alert($window.localStorage.Remember);
			//$scope.Remember=!$scope.Remember;
		}
		
	};
	
	$scope.login=function(email,paswd){
		//alert($scope.Remember)
		$window.localStorage.setItem('Remember',$scope.Remember);
		//$location.path('/home.html');

		if(email==null || paswd==null){
			$cordovaToast.showShortBottom('Either password or email is not filled').then(function(success) {
		    // success
		  }, function (error) {
		    // error
		  });

			return;

		}
		if(email.trim()=="" || paswd.trim()==""){
			$cordovaToast.showShortBottom('Either password or email is not filled').then(function(success) {
		    // success
		  }, function (error) {
		    // error
		  });

			return;
		}
		try{
			$cordovaToast.showShortBottom('Logging you in').then(function(success) {
			    // success
			  }, function (error) {
			    // error
			  });
		}
		catch(err){
			//nothing
		}
		Aunthenticate.login(email.trim(),paswd.trim());
		
	}

	$scope.register = function(email,fname,lname,pass,cnfpass){
		/*$cordovaToast.showShortBottom('Registering you').then(function(success) {
		    // success
		  }, function (error) {
		    // error
		  });*/

		Aunthenticate.Register(email,fname,lname,pass,cnfpass);
	};
}])

.service('Aunthenticate', ['$http','$window','$cordovaToast',function($http,$window,$cordovaToast){
	var self = this;
	this.login = function(email,password){
		$http.post("http://ec2-52-32-172-4.us-west-2.compute.amazonaws.com/Token", "username=" + encodeURIComponent(email) +
                     "&password=" + encodeURIComponent(password) +
                     "&grant_type=password")
			 .then(function (response) {
			 	console.log(response);
			 	$window.localStorage.setItem("User", JSON.stringify(response));
			 	$window.location.href = 'home.html';
			 }, function(response){
			 	if(response.status==400){
			 		$cordovaToast.showLongBottom('Logging in failed incorrect details').then(function(success) {
				    // success
				  }, function (error) {
				    // error
				  });
			 	}
			 	else if(response.status==500){
			 		$cordovaToast.showLongBottom('Logging in failed, an error occurred in the server').then(function(success) {
				    // success
				  }, function (error) {
				    // error
				  });
			 	}
			 	else{
			 		$cordovaToast.showLongBottom('Logging in failed, unexpected error. Error code:'+response.status).then(function(success) {
				    // success
				  }, function (error) {
				    // error
				  });
			 	}

			 	
			 	
			 })	
	};

	this.Register = function(Email,Fname,Lname,pass,cnfpass){
		var regData={
		  email: Email,
		  Password: pass,
		  ConfirmPassword: cnfpass,
		  fname: Fname,
		  type: "customer",
		  lname: Lname
		}
		$http.post("http://ec2-52-32-172-4.us-west-2.compute.amazonaws.com/account/Register/Customer",regData)
		.then(function(response){
			self.login(Email,pass);

		},function(response){

			if(response.status==400){
			 		$cordovaToast.showLongBottom('Registration failed, email exists already').then(function(success) {
				    // success
				  }, function (error) {
				    // error
				  });
			 	}
			else{
			 		$cordovaToast.showLongBottom('Registration failed, unexpected error. Error code:'+response.status).then(function(success) {
				    // success
				  }, function (error) {
				    // error
				  });
			 	}

		});
		
	};

}]);

