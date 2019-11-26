// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
  $(".change-cheese").on("click", function(event) {
    var id = $(this).data("id");
    var newBurger = $(this). data("newburger");

    var newBurgerState = {
      order: newBurger
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(
      function() {
        console.log("changed to",newBurger);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newBurger")
        .val()
        .trim(),
        price: "",
      devoured: 0
    };

    // Send the POST request
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

  $(".eatBurger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
      devoured: 1
    };
  });

  $(".delete-burger").on("click", function(event) {
    event.preventDefault();
console.log("devoure burger with id: " + id);
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});