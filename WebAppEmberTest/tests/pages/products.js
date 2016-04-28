import {
  create,
  visitable,
  fillable,
  /*text,*/
  clickable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/products'),
  title: fillable('#title'),
  description: fillable('#body'),
  clickToDesc: clickable('.sorting-button:first'),
  clickToAsc: clickable('.sorting-button:last'),
  clickToCreate: clickable('#create-button'),
  clickToSend: clickable('#send-product'),
  clickToTitle: clickable('a.title:first'),
  clickDelete: clickable('.btn-xs:first')
});
