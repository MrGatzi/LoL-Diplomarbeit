sampleApp.directive("change", function() {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function() {
            $('#champIcon').popover({
				trigger: "hover",
				html: true,
				content: "Hallo",
				placement:'right'
			});
        });
    };
});