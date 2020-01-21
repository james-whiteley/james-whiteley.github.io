window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above
    
  var form = document.getElementById("contactForm");
  var button = document.getElementById("sendMessageButton");
  var status = document.getElementById("success");

  // Success and Error functions for after the form is submitted
    
  function success() {
    status.innerHTML = "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Your message has been sent. </strong></div>";
    form.reset();
  }

  function error() {
    status.innerHTML = "<div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Sorry, it seems that my mail server is not responding. Please try again later!</strong></div>";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});
  
// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}