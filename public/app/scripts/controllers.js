"use strict";
angular.module('confusionApp')
.controller('menuController', ['$scope' , 'menuFactory', function($scope, menuFactory) {

  $scope.showDetails = false;
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showMenu = false;
  $scope.message = "Loading ...";
  $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

   $scope.select = function(setTab) {
     $scope.tab = setTab;

     if (setTab === 2){
         $scope.filtText = "appetizer";}
     else if (setTab === 3){
         $scope.filtText = "mains";}
     else if (setTab === 4){
         $scope.filtText = "dessert";}
     else{
         $scope.filtText = "";}
 };
 $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
  };
  $scope.toggleDetails = function(){
    $scope.showDetails = !$scope.showDetails;
  };
}]).controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            var channels = [{value:"tel", label:"Tel."}, {value:"Email", label:"Email"}];
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
          $scope.sendFeedback = function() {
          console.log($scope.feedback);
              if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                  console.log('incorrect');
                  }
                  else {
                  $scope.invalidChannelSelection = false;
                  $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                     agree:false, email:"" };
                  $scope.feedback.mychannel="";

                  $scope.feedbackForm.$setPristine();
                  console.log($scope.feedback);
                  }
                };
        }])
        .controller('dishDetailController',[ '$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        //  var noscope = "i am noscope";
        //  this.noscope = noscope;
          $scope.hack = "i am hack";

          $scope.showDish = false;
          $scope.message="Loading ...";
          $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
          .$promise.then(
                        function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                        },
                        function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                        });
        }])
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.dishComment = {rating: "", comment: "", author: "", date: ""};

            $scope.submitComment = function () {

                //Step 2: This is how you record the date
                $scope.dishComment.date = new Date().toISOString();

                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.dishComment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();

                $scope.dishComment = {rating: "", comment: "", author: "", date: ""};
            }
        }])
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){

                $scope.showDish = false;
                $scope.message="Loading ...";
                $scope.dish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            });
                $scope.promotion = menuFactory.getPromotion(parseInt(0));
                $scope.leader = corporateFactory.getLeader(parseInt(3));
        }])
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
                $scope.leadership = corporateFactory.getLeaders();
        }]);
