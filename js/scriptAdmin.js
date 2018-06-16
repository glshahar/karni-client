'use strict';

var appUrl = "http://localhost:3000/";
// var appUrl = "https://karni-server.herokuapp.com/";
var statusServer;

var app = angular.module('app', ['LocalStorageModule']);

app.run(function($http){   // Server Check
    statusServer = "Checking..";
    $http.post(appUrl+"serverCheck").then(function(data){
        console.log("Server is On");
        statusServer = "Server is On";
    },
    function(data, status) {
        console.log("Server is Off");
        statusServer = "Server is Off";
    });
})


app.controller('appCtrl', function($scope, $http, $timeout, $anchorScroll, localStorageService) {
    console.log("Karni - Admin Ctrl");
    $scope.email = localStorageService.get('email') || ""; 
    $scope.patients = localStorageService.get('patients') || [];
    $scope.token = localStorageService.get('token') || "";

    var today = new Date();
    var currYear = today.getFullYear();
    $scope.currYear = currYear;

    $scope.statusServer = statusServer;

    $scope.patients;
    $scope.currPatient;
    $scope.filter = "-dateReg";

    if(($scope.email!="")&&($scope.token!="")) {
        var user = {
            'email': $scope.email,
            'token': $scope.token
        };
        // get all patients
        $http({
            method : "POST",
            url : appUrl+"getAllPatients",
            data: {user: user},
            headers: {"Content-Type": "application/json"}  
        }).then(function (response) {
            console.log("get all patients Done successfully !");
            // console.log("JSON: "+JSON.stringify(response.data, null, 4));
            $scope.patients = response.data;
        }, function (response) {
            console.log("get patients Error !");
        });
    }

    var updateStatus = function() {
        if(statusServer=="Checking..")
            $timeout(updateStatus, 500);
        else $scope.statusServer = statusServer;
    }
    $timeout(updateStatus, 500);

    $scope.getPatient = function(patientId){
        if($scope.currPatient==patientId)
            $scope.currPatient = null;
        else $scope.currPatient = patientId;
    }

    $scope.adminLogin = function(){
        if($scope.email=="")
            return $scope.errorMsg = "Please Enter Valid Email";
        if($scope.password=="")
            return $scope.errorMsg = "Please Enter Valid Password";

        console.log("Admin User "+$scope.email+" logged in");
        var user = {
            'email': $scope.email,
            'password': $scope.password
        };

        // // Post - Form
        $http({
            url: appUrl+"adminLogin",
            method: "POST",
            data: {user: user},
            headers: {"Content-Type": "application/json"}  
        }).then(function(response) {
            // success
            console.log("POST - sendForm successfully");
            console.log("response: "+JSON.stringify(response.data, null, 4));

            localStorageService.set('email', response.data.email);
            localStorageService.set('token', response.data.token);
            localStorageService.set('connected', true);
            localStorageService.set('patients', response.data.patients);
            $scope.patients = response.data.patients;

            return console.log("Connected successfully");
        }, 
        function(response) { // optional
            // failed
            console.log("Error POST");
            $scope.errorMsg = "Password / Email Incorrect";
        });
    };

    $scope.showPassword = function(){
        var myEl = angular.element( document.querySelector( '#inputPassword' ) );
        myEl.attr('type',"text");
    };

    $scope.logOut = function(){
        console.log("Admin logged out");
        localStorage.clear();
        location.reload();
        console.log("Logout Successfully");
    };


});
