'use strict';

// var appUrl = "http://localhost:3000/";
var appUrl = "https://karni-server.herokuapp.com/";

var app = angular.module('app', []);

app.controller('appCtrl', function($scope, $http, $anchorScroll) {

    var today = new Date();
    var currYear = today.getFullYear();
    $scope.currYear = currYear;

    console.log("Karni - Admin Ctrl "+currYear);

    $scope.patients;
    $scope.currPatient;
    $scope.filter = "-dateReg";

    // get all patients
    $http({
        method : "GET",
        url : appUrl+"getAllPatients"
    }).then(function (response) {
        console.log("get all patients Done successfully !");
        // console.log("JSON: "+JSON.stringify(response.data, null, 4));
        $scope.patients = response.data;
    }, function (response) {
        console.log("get patients Error !");
    });
    $scope.getPatient = function(patientId){
        if($scope.currPatient==patientId)
            $scope.currPatient = null;
        else $scope.currPatient = patientId;
    }

});
