'use strict';
const uniqueKeywordArray = [];
const hornedBeastArray = [];
$.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
  .then(animals => {
    animals.forEach(hornedBeast => {
      const beast = new Unicorn(hornedBeast);
    })
  })
  .then(() => {
    generateUniqueKeywords();
    generateDropdown();
    animalRender();
  });
function Unicorn(object) {
  this.image = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  hornedBeastArray.push(this);
}
Unicorn.prototype.createHTML = function () {
  let template = $('#photo-template').html();
  let html = Mustache.render(template, this);
  return html;
}
const animalRender = () => {
  hornedBeastArray.forEach(beast => {
    $('main').append(beast.createHTML());
  })
}
function generateUniqueKeywords() {
  hornedBeastArray.forEach(beast => {
    if (!uniqueKeywordArray.includes(beast.keyword)) {
      uniqueKeywordArray.push(beast.keyword);
    }
  })
}
function generateDropdown() {
  uniqueKeywordArray.forEach(keyword => {
    const $newDropdownItem = $('<option></option>');
    $newDropdownItem.attr('value', keyword);
    $newDropdownItem.text(keyword);
    $('select').append($newDropdownItem);
  })
}
function handleChange() {
  console.log(this.value);
  $('div').hide();
  $(`div[class=${this.value}]`).show();
}
$('select').on('change', handleChange);