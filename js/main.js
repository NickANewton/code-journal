/* global data */
/* exported data */

var $form = document.querySelector('form');
var $placeHolderImage = document.querySelector('img');
var $inputImage = document.querySelector('#photo');
var $inputTitle = document.querySelector('#title');
var $inputNotes = document.querySelector('#notes');
var $divElementNoEntries = document.querySelector('.no-entries');

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

  /* $li.insertBefore(renderEntries(form), document.querySelector('li')); */
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

  var $img = document.createElement('img');
  $img.setAttribute('src', form.imageUrl);
  $img.setAttribute('class', 'column-half');

  var $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'display-flex justify-between');
  $h2.textContent = form.title;

  var $anchor = document.createElement('a');
  $anchor.setAttribute('href', '#');
  $anchor.setAttribute('data-view', 'edit');

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pen');

  var $p = document.createElement('p');
  $p.textContent = form.notes;

  $li.appendChild($img);
  $div.appendChild($h2);
  $anchor.appendChild($icon);
  $h2.appendChild($anchor);
  $div.appendChild($p);
  $li.appendChild($div);

  $divElementNoEntries.className = 'no-entries hidden';

  return $li;
}

var $ul = document.querySelector('ul');

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

function handleClickEvent(event) {
  var $targetdataViewAttribute = event.target.getAttribute('data-view');
  if (event.target.matches('a')) {
    viewSwap($targetdataViewAttribute);
  }
}

$bodyElement.addEventListener('click', handleClickEvent);

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
