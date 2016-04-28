import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('product-listing', 'Integration | Component | product listing', {
  integration: true
});

test('Render product title and description', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let product = Ember.Object.create({
    title: 'superTitle',
    description: 'superDesc',
    path: '/images/images.png'
  });

  this.set('product', product);

  this.render(hbs`{{product-listing  product=product action="openModal"}}`);

  assert.equal(this.$('.thumbnail .caption a:first').text().trim(), product.get('title'), 'Check title');
  assert.equal(this.$('.thumbnail .caption p:first').text().trim(), product.get('description'), 'Check desc');
});
