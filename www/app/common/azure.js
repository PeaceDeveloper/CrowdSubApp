(function () {
    'use strict';
    angular.module('app')
      .factory('AzureMobileClient', AzureMobileClient);
    function AzureMobileClient(API_ENDPOINT) {
        //extract for http://stackoverflow.com/questions/16673003/integrating-the-mobileserviceclient-with-angularjs

        var azureMobileClient = {};
        azureMobileClient.isLoggedIn = false;
        azureMobileClient.azureError = "";
        azureMobileClient.azureMSC =
            new WindowsAzure.MobileServiceClient(
            API_ENDPOINT.url);

        azureMobileClient.login = function (callback, socialMediaService) {

            azureMobileClient.azureMSC.login(socialMediaService).then(function (user) {
                azureMobileClient.isLoggedIn = user != null;
                $cookieStore.put("azureUser", user);
                callback(azureMobileClient.isLoggedIn);
            }
            , function (error) {
                alert(error);

                azureMobileClient.azureError = error;
            });
        };

        azureMobileClient.logout = function () {
            azureMobileClient.getUser();
            azureMobileClient.azureMSC.logout();
            $cookieStore.remove("azureUser");
        };

        azureMobileClient.getStuff = function (callback) {
            azureMobileClient.getUser();

            var stuffTable = azureMobileClient.azureMSC.getTable("stuff");

            stuffTable.read().then(function (items) {
                callback(items);
            });
        };

        azureMobileClient.addStuff = function (scope) {
            azureMobileClient.getUser();
            var stuffTable = azureMobileClient.azureMSC.getTable("stuff");
            stuffTable.insert({ stuffname: scope.stuffname });
        };

        azureMobileClient.getUser = function () {
            if (azureMobileClient.azureMSC.currentUser === null) {
                azureMobileClient.azureMSC.currentUser = $cookieStore.get("azureUser");
            }
        };

        return azureMobileClient;
    };
})();