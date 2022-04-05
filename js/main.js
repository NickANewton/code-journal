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
  form.Id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(form);
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
  $img.setAttribute('src', form.photoUrl);

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

for (var i = 0; i < data.entries.length; i++) {
  var final = renderEntries(data.entries[i]);
  $journalRow.appendChild(final);
}
