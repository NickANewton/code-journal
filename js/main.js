/* global data */
/* exported data */

var $form = document.querySelector('form');
var $placeHolderImage = document.querySelector('img');
var $inputImage = document.querySelector('#photo');
var $inputTitle = document.querySelector('#title');
var $inputNotes = document.querySelector('#notes');
var $divElementNoEntries = document.querySelector('.no-entries');
var $ul = document.querySelector('ul');
var $h1NewEntry = document.querySelector('.new-entry');
var $viewNodeList = document.querySelectorAll('.view');
var $bodyElement = document.querySelector('body');

$form.addEventListener('input', handleInputEvent);

function handleInputEvent(event) {
  if (event.target !== $inputImage) {
    return;
  }
  $placeHolderImage.setAttribute('src', $inputImage.value);
}

$form.addEventListener('submit', handleSubmitEvent);

function handleSubmitEvent(event) {
  event.preventDefault();
  if (event.target !== $form) {
    return;
  }
  if (!data.editing) {

    var form = {
      title: $inputTitle.value,
      imageUrl: $inputImage.value,
      notes: $inputNotes.value,
      id: data.nextEntryId
    };
    data.nextEntryId++;

    data.entries.unshift(form);
    $ul.prepend(renderEntries(form));

  } else {
    data.editing.title = $inputTitle.value;
    data.editing.imageUrl = $inputImage.value;
    data.editing.notes = $inputNotes.value;
    data.editing = null;
  }

  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
  $form.reset();
}

function renderEntries(form) {
  /*
            <li class="mb-25">
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" class="column-half" alt="pika">
              <div class="column-half">
                <h2>
                  Pikachu
                  <i class="fas fa-pen" data-view="entry-form"></i>
                </h2>
                <p>Pikachu is a fictional species in the Pokémon media franchise. Designed by Atsuko Nishida and Ken Sugimori, Pikachu
                first appeared in the 1996 Japanese video games Pokémon Red and Green created by Game Freak and Nintendo, which were
                released outside of Japan in 1998 as Pokémon Red and Blue.</p>
              </div>
            </li>
  */

  var $li = document.createElement('li');
  $li.setAttribute('class', 'mb-25');
  $li.setAttribute('data-entry-id', (data.nextEntryId - 1));

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

window.addEventListener('DOMContentLoaded', handelUnloadEvent);

function handelUnloadEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var final = renderEntries(data.entries[i]);
    $ul.appendChild(final);
  }
  viewSwap(data.view);
}

$bodyElement.addEventListener('click', handleAnchorClickEvent);

function handleAnchorClickEvent(event) {
  var $anchorDataViewAttribute = event.target.getAttribute('data-view');
  if (event.target.matches('a')) {
    viewSwap($anchorDataViewAttribute);
  }
}

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

$ul.addEventListener('click', handleIconCLickEvent);

function handleIconCLickEvent(event) {
  var $iconDataViewAttribute = event.target.getAttribute('data-view');
  var $liDataEntryId = event.target.closest('li').getAttribute('data-entry-id');
  $liDataEntryId = Number($liDataEntryId);
  if (event.target.matches('i')) {
    viewSwap($iconDataViewAttribute);
    getEntryData($liDataEntryId);
  }
}

function getEntryData(entryId) {
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].id) {
      data.editing = data.entries[i];
      renderEditForm(data.editing);
    }
  }
}

function renderEditForm(entry) {
  $h1NewEntry.textContent = 'Edit Entry';
  $inputImage.value = entry.imageUrl;
  $placeHolderImage.setAttribute('src', entry.imageUrl);
  $inputTitle.value = entry.title;
  $inputNotes.value = entry.notes;
}
