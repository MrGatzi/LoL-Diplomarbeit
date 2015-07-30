sampleApp.directive('championIcon', function(){
	 return {
		restrict: 'AE',
				// scope object defines the attributes that can be used in the HTML tag
				// for '@', '=', '&' syntax see http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
        scope:{
	      },
        link: function(scope, element, attrs) {
			element.bind("mouseenter", function() {
				console.log("hallo");
			});
        } 
    };
});