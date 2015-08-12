sampleApp.directive("change", function() {
    return function(scope, element, attrs) {
            $("#champIcon").popover({
                trigger: 'click',
                html: true,
                content: "Hallo",
                placement: right
            });
        
    };
});