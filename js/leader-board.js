var app = angular.module('leaderboard', ['firebase']);

app.constant('FIREBASE_URI', 'https://steeplechase-f161a.firebaseio.com/');

app.controller('MainCtrl', function (ContestantsService) {
    var main = this;
    main.newContestant = {lane: '', name: '', score: 0, color: ''};
    main.currentContestant = null;
    main.contestants = ContestantsService.getContestants();


    // turn contestant.score into integers
    // loop through contesntants and convert to integers


    main.addContestant = function () {
        ContestantsService.addContestant(angular.copy(main.newContestant));
        main.newContestant = {lane: '', name: '', score: 0, color: ''};
    };

    main.updateContestant = function (contestant) {
        ContestantsService.updateContestant(contestant);
    };

    main.removeContestant = function (contestant) {
        ContestantsService.removeContestant(contestant);
    };

    main.incrementScore = function () {
        main.currentContestant.score = main.currentContestant.score + 1;
        main.updateContestant(main.currentContestant);
    };

    main.decrementScore = function () {
        main.currentContestant.score = main.currentContestant.score - 1;
        main.updateContestant(main.currentContestant);
    };


    main.steeplechase = function () {
        
    }



});

app.service('ContestantsService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var contestants = $firebaseArray(ref);

    service.getContestants = function () {
        return contestants;
    };

    service.addContestant = function (contestant) {
        contestants.$add(contestant);
    };

    service.updateContestant = function (contestant) {
        contestants.$save(contestant);
    };

    service.removeContestant = function (contestant) {
        contestants.$remove(contestant);
    };


});
