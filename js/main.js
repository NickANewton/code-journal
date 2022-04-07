/* global data */
/* exported data */

var $form = document.querySelector('form');
var $placeHolderImage = document.querySelector('img');
var $inputImage = document.querySelector('#photo');
var $inputTitle = document.querySelector('#title');
var $inputNotes = document.querySelector('#notes');
var $divElementNoEntries = document.querySelector('.no-entries');
var $ul = document.querySelector('ul');

function handleInputEvent(event) {
  if (event.target !== $inputImage) {
    return;
  }
  $placeHolderImage.setAttribute('src', $inputImage.value);
}

function handleSubmitEvent(event) {
  event.preventDefault();
  if (event.target !== $form) {
    return;
  }
  var form = {
    title: $inputTitle.value,
    imageUrl: $inputImage.value,
    notes: $inputNotes.value
  };

  form.id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(form);

  $ul.prepend(renderEntries(form));
  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
  $form.reset();
}

$form.addEventListener('submit', handleSubmitEvent);
$form.addEventListener('input', handleInputEvent);

function renderEntries(form) {
  /*
          <ul class="mb-25">
            <li class="column-half first">
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" alt="pika">
            </li>
            <li class="column-half second">
              <h2>Pikachu</h2>
              <p>Pikachu is a fictional species in the Pokémon media franchise. Designed by Atsuko Nishida and Ken Sugimori, Pikachu
              first appeared in the 1996 Japanese video games Pokémon Red and Green created by Game Freak and Nintendo, which were
              released outside of Japan in 1998 as Pokémon Red and Blue.</p>
            </li>
          </ul>
          <ul>
  */

  var $li = document.createElement('li');
  $li.setAttribute('class', 'mb-25');

  var $img = document.createElement('img');
  $img.setAttribute('src', form.imageUrl);
  $img.setAttribute('class', 'column-half');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'display-flex justify-between');
  $h2.textContent = form.title;

  var $createIcon = document.createElement('i');
  $createIcon.setAttribute('class', 'fas fa-pen');
  $createIcon.setAttribute('data-view', 'entry-form');

  var $p = document.createElement('p');
  $p.textContent = form.notes;

  $li.appendChild($img);
  $div.appendChild($h2);
  $h2.appendChild($createIcon);
  $div.appendChild($p);
  $li.appendChild($div);

  $divElementNoEntries.className = 'no-entries hidden';

  return $li;
}

function handelUnloadEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var final = renderEntries(data.entries[i]);
    $ul.appendChild(final);
  }
  viewSwap(data.view);
}

window.addEventListener('DOMContentLoaded', handelUnloadEvent);

var $viewNodeList = document.querySelectorAll('.view');
var $bodyElement = document.querySelector('body');

function handleAnchorClickEvent(event) {
  var $anchorDataViewAttribute = event.target.getAttribute('data-view');
  if (event.target.matches('a')) {
    viewSwap($anchorDataViewAttribute);
  }
}

function handleIconCLickEvent(event) {
  var $iconDataViewAttribute = event.target.getAttribute('data-view');
  if (event.target.matches('i')) {
    for (var i = 0; i < data.entries.length; i++) {
      if (event.target.closest('h2').textContent === data.entries[i].title) {
        data.editing = data.entries[i].id;
      }
    }
  }
  viewSwap($iconDataViewAttribute);
}

$ul.addEventListener('click', handleIconCLickEvent);

$bodyElement.addEventListener('click', handleAnchorClickEvent);

function viewSwap(viewName) {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if (viewName === $viewNodeList[i].getAttribute('data-view')) {
      $viewNodeList[i].setAttribute('class', 'container');
      data.view = $viewNodeList[i].getAttribute('data-view');
    } else {
      $viewNodeList[i].setAttribute('class', 'contianer hidden');
    }
  }
}

/* function renderEditForm() {

  $inputImage = document.querySelector('#photo');
  $inputTitle = document.querySelector('#title');
  $inputNotes = document.querySelector('#notes');

} */
