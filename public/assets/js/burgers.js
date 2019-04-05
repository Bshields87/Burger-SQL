$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).data("devoured");
  
      var newDevouredState = {
        devoured: newDevoured
      };
  
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("Was I eaten", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newBurger = {
          name: $("#burg").val().trim(),
          devoured: $("[name=devoured]:checked").val().trim()
        };
        
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
          }).then(
            function() {
              console.log("created new burger");
              // Reload the page to get the updated list
              location.reload();
            }
          );
        });

});