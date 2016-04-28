import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:products', 'Unit | Controller | products', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();

  assert.ok(controller);
});

test('Can create product',  function(assert) {

  let controller = this.subject();

  controller.set('model', []);

  let products = [
    Ember.Object.create({title: "title", description: "desc", path: "path"}),
    Ember.Object.create({title: "title1", description: "desc1", path: "path1"}),
    Ember.Object.create({title: "title2", description: "desc2", path: "path2"})
  ];

  controller.set('canCreateProduct', false);

  assert.ok(!controller.get('canCreateProduct'), "Can't create product");

  controller.set('canCreateProduct', true);

  assert.ok(controller.get('canCreateProduct'), "Can create product");

  controller.set('canCreateProduct', false);

  controller.set('model', products);

  assert.ok(!controller.get('canCreateProduct'), "Can create product");

});
