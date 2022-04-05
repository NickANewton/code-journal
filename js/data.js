/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = JSON.parse(localStorage.getItem('form-user-data'));

if (previousDataJSON !== null) {
  data = previousDataJSON;
}

function beforeUnloadHandler(event) {
  localStorage.setItem('form-user-data', JSON.stringify(data));
}

window.addEventListener('beforeunload', beforeUnloadHandler);
