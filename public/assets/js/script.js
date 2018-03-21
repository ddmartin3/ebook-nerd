$(function() {

    $(".save").on("click", function(event) {
        var id = $(this).data("id");
        // Send the PUT request.
        $.ajax("/article/" + id, {
            type: "PUT",
      }).then(
        function() {
          alert("Article Saved");
        });
    });


    $("#good-e-reader").on("click", function(event) {
        // Send the PUT request.
        $.ajax("/good-ereader", {
            type: "GET",
      }).then(
        function() {
          // Reload the page to get the updated list
    //      location.reload();
        });
    });

    $("#ebook-reader").on("click", function(event) {
        // Send the PUT request.
        $.ajax("/the-ebook-reader", {
            type: "GET",
      }).then(
        function() {
          // Reload the page to get the updated list
    //      location.reload();
        });
    });


    
});