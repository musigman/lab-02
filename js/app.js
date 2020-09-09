'use strict'
const unicornArray = [];
// const keywordArray = [];   
function Unicorn(object) {
  this.image = object.image_url;
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  unicornArray.push(this);
}
Unicorn.readJSON = () => {
  $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
    .then(data => {
      data.forEach(item => {
        let horns = new Unicorn(item);
        horns.render();
        console.log(horns);
      })
      console.log(unicornArray);
    })
}
$(() => Unicorn.readJSON());
Unicorn.prototype.render = function () {
  const myTemplate = $('#unicorn-template').html();
  const $newSection = $(`<section>${myTemplate}</section>`);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
}