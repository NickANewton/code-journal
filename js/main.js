/* global data */
/* exported data */

var $form = document.querySelector('form');
var $photoUrl = document.querySelector('#photo');
var $image = document.querySelector('img');

function handleInputEvent(event) {
  if (event.target !== $photoUrl) {
    return;
  }
  $image.setAttribute('src', $photoUrl.value);
}

$form.addEventListener('input', handleInputEvent);
