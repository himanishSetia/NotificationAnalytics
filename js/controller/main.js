notificationSample.controller('mainController',function($scope,$location,notificationService,$filter){
	App42.setEventBaseUrl("https://in-analytics.shephertz.com/cloud/1.0/");
	App42.initialize("b9eb670c3d1c4e666982dcccd58515f82a1096879849a6c76bada4b388c3af96", "1c1d184fdcf33ae29c24cffdf653b8e69e8c89eeb6813791f3785c6278f291ed");  
	App42.enableEventService(true);  
	App42.enableAppStateEventTracking(true);
	var eventService = new App42Event();  
	

	var modal
	var btn
	var span

$scope.init = function(){

// Get the modal
modal = document.getElementById('usernameDialog');
// Get the button that opens the modal
btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];
$scope.notificationType = "success"
modal.style.display = "block";

}

$scope.init();





// When the user clicks on <span> (x), close the modal and track the event
span.onclick = function() {
	var eventName = "Skip_Login"
	var date = new Date();
	var currDate = $filter('date')(new Date(), 'dd, MMMM yyyy');
	var currTime = $filter('date')(new Date(), 'hh:mm:ss a');
	var dateTime = currDate +" "+ currTime

	var properties = { "Email":"Guest User",
	"Creation Date":dateTime }  
	App42.setLoggedInUser("Guest"); 


	eventService.setLoggedInUserProperties(properties, {  
    success: function (object) {  
        var eventObj = JSON.parse(object)  
        console.log("Success is : " , eventObj);  
    },  
    error: function (error) {  
        console.log("Exception is : " , error);  
    }  
}); 

	$scope.trackEvent(eventName,properties)

    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






$scope.submitUsername = function(){

	var eventName = "Login"
	var user

	var date = new Date();
	var currDate = $filter('date')(new Date(), 'dd, MMMM yyyy');
	var currTime = $filter('date')(new Date(), 'hh:mm:ss a');
	var dateTime = currDate +" "+ currTime

	var properties = { "Email":$scope.username,
	"Creation Date":dateTime }  


	if($scope.userName != '' && $scope.userName != undefined && $scope.userName != null){
		user = $scope.userName
	}
	else{
		user = "Guest"
	}



	App42.setLoggedInUser(user); 


	eventService.setLoggedInUserProperties(properties, {  
    success: function (object) {  
        var eventObj = JSON.parse(object)  
        console.log("Success is : " , eventObj);  
    },  
    error: function (error) {  
        console.log("Exception is : " , error);  
    }  
});  

$scope.trackEvent(eventName,properties)

  modal.style.display = "none";
}

$scope.notify = function(){

console.log("$scope.notificationType ",$scope.notificationType)

notificationService.notify({
	title: $scope.title?$scope.title:"",
	title_escape: false,
	text: $scope.message?$scope.message:"",
	text_escape: false,
	styling: "bootstrap3",
	type: $scope.notificationType,
	icon: true
});


var properties = { "Title":$scope.title?$scope.title:"",
	"Message":$scope.message?$scope.message:"",
	"Notification Type":$scope.notificationType }  
	
	var eventName = "Notification"
	

	$scope.trackEvent(eventName,properties)
	$scope.notificationType = "success"
	$scope.title = ""
	$scope.message = ""
	
}


$scope.confirmDialog = function() {

notificationService.notify({
	title: $scope.title?$scope.title:"",
	text: $scope.message?$scope.message:"",
	hide: false,
	confirm: {
		confirm: true
	},
	buttons: {
		closer: false,
		sticker: false
	},
	history: {
		history: false
	}
}).get().on('pnotify.confirm', function() {
	alert('Ok, cool.');
}).on('pnotify.cancel', function() {
	alert('Oh ok. Chicken, I see.');
});

var properties = { "Title":$scope.title?$scope.title:"",
	"Message":$scope.message?$scope.message:"",
"Notification Type" : "Confirm_Dialog"}  

	
	var eventName = "Confirm_Dialog"
	

	$scope.trackEvent(eventName,properties)
	$scope.notificationType = "success"
	$scope.title = ""
	$scope.message = ""
}



$scope.trackEvent = function(eventName,properties){ 
	eventService.trackEvent(eventName, properties, {        
    success: function (object) {  
        var eventObj = JSON.parse(object)  
        console.log("Success is : " , eventObj);  
    },  
    error: function (error) {  
        console.log("Exception is : " , error);  
    }  
});  

}   

})