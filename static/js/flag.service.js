( function() {

    var myApp = angular.module('myApp')
  
    myApp.factory('FlagService', FlagService)
    
    FlagService.$inject = ['$resource']
    
    function FlagService($resource) {

	    var flagResource = $resource('api/flags')

        return {
            getFlags : getFlags
        }

        function getFlags(round) {
            return flagResource.get().$promise
        }
    }
       
})();