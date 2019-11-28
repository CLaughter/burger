// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newBurger")
        .val()
        .trim(),
        price: 0,
    };

    // Send the POST request
    console.log("/api/burgers/");
    $.ajax("/api/burgers/", {
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

  $(".devoured").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: { devoured: 1 }
    }).then(
      function() {
        console.log("changed to", 1);
        location.reload();
      }
    );
  });

  $(".deleteBurger").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    
    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});