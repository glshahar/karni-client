'use strict';

// var appUrl = "http://localhost:3000/";
var appUrl = "https://karni-server.herokuapp.com/";

var app = angular.module('app', []);

app.controller('appCtrl', function($scope, $http, $anchorScroll) {

    console.log("Karni - Client Ctrl");
    $scope.formSuccess = false;

    $scope.sendForm = function(){
        console.log("sendForm function");
        // console.log($scope.fName+" "+$scope.lName+" "+$scope.idNo+" "+document.getElementById("bDate").value);
        if(($scope.fName)&&($scope.lName)&&($scope.idNo)&&(document.getElementById("bDate").value)){
            console.log("validate - done");

            var userDetails = {
                'fName': $scope.fName,
                'lName': $scope.lName,
                'idNo': $scope.idNo,
                'bDate': document.getElementById("bDate").value,

                'school': $scope.school,
                'langs': $scope.langs,
                'address': $scope.address,
                'tel': $scope.tel,
                'email': $scope.email,

                'motherName': $scope.motherName,
                'mJob': $scope.mJob,
                'mTel': $scope.mTel,
                'fatherName': $scope.fatherName,
                'fJob': $scope.fJob,
                'fTel': $scope.fTel,

                'siblings': [
                    {
                        'name': $scope.name1,
                        'age': $scope.age1,
                        'gender': $scope.gender1,
                        'probSpeach': $scope.probSpeach1,
                        'speach': $scope.speach1,
                        'school': $scope.school1
                    },{
                        'name': $scope.name2,
                        'age': $scope.age2,
                        'gender': $scope.gender2,
                        'probSpeach': $scope.probSpeach2,
                        'speach': $scope.speach2,
                        'school': $scope.school2
                    },{
                        'name': $scope.name3,
                        'age': $scope.age3,
                        'gender': $scope.gender3,
                        'probSpeach': $scope.probSpeach3,
                        'speach': $scope.speach3,
                        'school': $scope.school3
                    },{
                        'name': $scope.name4,
                        'age': $scope.age4,
                        'gender': $scope.gender4,
                        'probSpeach': $scope.probSpeach4,
                        'speach': $scope.speach4,
                        'school': $scope.school4
                    },{
                        'name': $scope.name5,
                        'age': $scope.age5,
                        'gender': $scope.gender5,
                        'probSpeach': $scope.probSpeach5,
                        'speach': $scope.speach5,
                        'school': $scope.school5
                    },{
                        'name': $scope.name6,
                        'age': $scope.age6,
                        'gender': $scope.gender6,
                        'probSpeach': $scope.probSpeach6,
                        'speach': $scope.speach6,
                        'school': $scope.school6
                    },{
                        'name': $scope.name7,
                        'age': $scope.age7,
                        'gender': $scope.gender7,
                        'probSpeach': $scope.probSpeach7,
                        'speach': $scope.speach7,
                        'school': $scope.school7
                    }
                ],

                'ans1': $scope.ans1,
                'ans2': $scope.ans2,
                'ans3': $scope.ans3,

                'ans4': $scope.ans4,
                'ans5': $scope.ans5,
                'ans6': $scope.ans6,
                'ans7': $scope.ans7,
                'ans8': $scope.ans8,
                'ans9': $scope.ans9,
                'ans10': $scope.ans10,
                'ans11': $scope.ans11,
                'ans12': $scope.ans12,

                'ans13': $scope.ans13,
                'ans14': $scope.ans14,
                'ans15': $scope.ans15,
                'ans16': $scope.ans16,

                'ans17': $scope.ans17,
                'ans18': $scope.ans18,
                'ans19': $scope.ans19,
                'ans20': $scope.ans20,
                'ans21': $scope.ans21,

                'ans22': $scope.ans22,
                'ans23': $scope.ans23,
                'ans24': $scope.ans24
            };

            var siblingsCounter = 0;
            for (var i = 0; i < userDetails.siblings.length; i++) {
                if(userDetails.siblings[i].name!=null)
                    siblingsCounter++;
                if(i==userDetails.siblings.length-1)
                    userDetails.siblings.splice(siblingsCounter);
            }
            console.log("Request: "+JSON.stringify(userDetails, null, 4));

            $scope.formSuccess = true;
            // scroll to top
            var elmnt = document.getElementsByClassName("logo");
            elmnt[0].scrollIntoView();

            // // Post - Form
            $http({
                url: appUrl+"saveForm",
                method: "POST",
                data: {userDetails: userDetails},
                headers: {"Content-Type": "application/json"}  
            }).then(function(response) {
                // success
                console.log("POST - sendForm successfully");
                console.log("response: "+JSON.stringify(response.data, null, 4));
            }, 
            function(response) { // optional
                // failed
                console.log("Error POST");
            });
        }
        else console.log("validate - error");
    }

});
