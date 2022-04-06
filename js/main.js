/* global data */
/* exported data */

var $form = document.querySelector('form');
var $placeHolderImage = document.querySelector('img');
var $inputImage = document.querySelector('#photo');
var $inputTitle = document.querySelector('#title');
var $inputNotes = document.querySelector('#notes');

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

  $journalRow.appendChild(renderEntries(form));
  $placeHolderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmitEvent);
$form.addEventListener('input', handleInputEvent);

function renderEntries(form) {
  /*
       <div class="row journal">
        <div class="column-full">
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
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $columnFull = document.createElement('div');
  $columnFull.setAttribute('class', 'column-full');

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

  $columnFull.appendChild($ul);
  $ul.appendChild($li);
  $li.appendChild($img);
  $ul.appendChild($li2);
  $li2.appendChild($h2);
  $li2.appendChild($p);

  $row.appendChild($columnFull);

  return $row;
}

var $journalRow = document.querySelector('.journal');

function handelUnloadEvent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var final = renderEntries(data.entries[i]);
    $journalRow.appendChild(final);
  }
}

window.addEventListener('DOMContentLoaded', handelUnloadEvent);

var $viewNodeList = document.querySelectorAll('.view');
var $bodyElement = document.querySelector('body');

function handleClickEvent(event) {
  var $dataViewAttribute = event.target.getAttribute('data-view');
  if (event.target.matches('a')) {
    for (var i = 0; i < $viewNodeList.length; i++) {
      if ($dataViewAttribute === $viewNodeList[i].getAttribute('data-view')) {
        $viewNodeList[i].className = 'container';
      } else {
        $viewNodeList[i].className = 'contianer hidden';

      }

    }
  }
}

$bodyElement.addEventListener('click', handleClickEvent);
