/* global data */
/* exported data */

var $form = document.querySelector('form');
var $placeHolderImage = document.querySelector('img');
var $inputImage = document.querySelector('#photo');
var $inputTitle = document.querySelector('#title');
var $inputNotes = document.querySelector('#notes');
var $pElementNoEntries = document.querySelector('.no-entries');

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

  $journalContainer.insertBefore(renderEntries(form), document.querySelector('ul'));
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

  var $ul = document.createElement('ul');
  $ul.setAttribute('class', 'mb-25');

  var $li = document.createElement('li');
  $li.setAttribute('class', 'column-half first');

  var $li2 = document.createElement('li');
  $li2.setAttribute('class', 'column-half second');

  var $img = document.createElement('img');
  $img.setAttribute('src', form.imageUrl);

  var $h2 = document.createElement('h2');
  $h2.textContent = form.title;

  var $p = document.createElement('p');
  $p.textContent = form.notes;

  $ul.appendChild($li);
  $li.appendChild($img);
  $ul.appendChild($li2);
  $li2.appendChild($h2);
  $li2.appendChild($p);

  $pElementNoEntries.className = 'no-entries hidden';

  return $ul;
}

var $journalContainer = document.querySelector('#journal');

function handelUnloadEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var final = renderEntries(data.entries[i]);
    $journalContainer.appendChild(final);
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
