/* global data */
/* exported data */

var $form = document.querySelector('form');
var $image = document.querySelector('img');
var $photo = document.querySelector('#photo');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

function handleInputEvent(event) {
  if (event.target !== $photo) {
    return;
  }
  $image.setAttribute('src', $photo.value);
}

function handleSubmitEvent(event) {
  if (event.target !== $form) {
    return;
  }
  var form = {
    title: $title.value,
    photoUrl: $photo.value,
    notes: $notes.value
  };

  var previousDataJSON = JSON.parse(localStorage.getItem('form-user-data'));

  if (previousDataJSON === null) {
    form.id = data.nextEntryId;
    data.nextEntryId++;
    data.entries.push(form);
    localStorage.setItem('form-user-data', JSON.stringify(data));
  } else {
    form.id = previousDataJSON.nextEntryId;
    previousDataJSON.nextEntryId++;
    previousDataJSON.entries.push(form);
    localStorage.setItem('form-user-data', JSON.stringify(previousDataJSON));
  }
}

$form.addEventListener('submit', handleSubmitEvent);
$form.addEventListener('input', handleInputEvent);
