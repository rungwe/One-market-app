angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('Broadcast', ['$http','$window',function($http,$window){
	this.getBroadcasts=function(){
		var token = JSON.parse($window.localStorage.getItem("User")).data.access_token;
		var config ={headers:
				{"Authorization": "bearer "+token,
				 'Accept': 'application/json',
				}
		}
		var promise= $http.get("http://ec2-52-32-172-4.us-west-2.compute.amazonaws.com/customer/get-broadcasts?page=1&amount=20",config)
		.then(function(response){
			return response.data;
		},function(response){
			///alert(response.status);
		});

		return promise;
	}

}])

.service('Shop', [function(){
	this.getProducts = function(){
		
		var data = [{title:"Hisense 40 inch", price:"R12 000", image:"img/tv.png"},
					{title:"Samsung tablet", price:"R4 999", image:"img/tablet.jpg"},
					{title:"Philips Iron", price:"R700", image:"img/iron.jpg"},
					{title:"Microwave", price:"R2 000", image:"img/microwave.jpg"}
		]
		return data;
	}

}])

.service('Ads', [function(){
	this.getAds = function(){
	var data = [{name: "Chaddy Rungwe",title:"Court Bed", profile_pic: "img/babe.jpg",price:"R900",time: "20 min",likes:23,views:102,comments:13, ad_image:"img/bed.jpg", details:"I am selling a court bed for toddlers in a very good condition." },
				{name: "Tshepo Ndlovu",title:"Food Mixer", profile_pic: "img/seller1.jpg",price:"R450",time:"2 hours",likes:29,views:112,comments:43, ad_image:"img/foodmixer.jpg", details:" Food mixer barley used, in a very good condition" },
				{name: "Kevin Barret",title:"Samsung Galaxy", profile_pic: "img/seller3.jpg",price:"R1560",time:"3 hours",likes:45,views:206,comments:26, ad_image:"img/galaxy.jpg", details:"Samsung galaxy phone, it comes with accessories" }
				
	]
	return data;
	}

}])

.service('User',['$http','$window',function($http,$window){
	this.getProfile=function(){
		var token = JSON.parse($window.localStorage.getItem("User")).data.access_token;
		var config ={headers:
				{"Authorization": "bearer "+token,
				 'Accept': 'application/json',
				}
		}
		var promise= $http.get("http://ec2-52-32-172-4.us-west-2.compute.amazonaws.com/customer/get-user-profile",config)
		.then(function(response){
			return response.data;
		},function(response){
			alert(response.status);
		});

		return promise;
	}

}])


