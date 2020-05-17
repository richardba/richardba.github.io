$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
          event.preventDefault();
          contactForm = getElementById('contactForm');
          var response = grecaptcha.getResponse();
          if(response.length == 0) {
          }
          else
          {
            $.ajax({
                type: "POST",
                url: 'https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify',
                data: {"secret" : keyring(key), "response" : response, "remoteip":"localhost"},
                contentType: 'application/x-www-form-urlencoded',
                success: function(data) {
                  contactForm.setAttribute('action',keyring(formAction));
                  contactForm.submit();
                  contactForm.reset();
                  $('#overlay').toggle();
               }
            });
          }
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    $( "#overlay button" ).click(function() {
      $('#overlay').toggle();
    });

});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

$("#contactForm").submit(function(e) {
  e.preventDefault();
});

$(document).on('submit', '#contactForm', function(event){
    event.preventDefault();
});
