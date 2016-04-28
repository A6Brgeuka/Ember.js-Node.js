import { test } from 'qunit';
import page from '../../tests/pages/products';
import moduleForAcceptance from 'web-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | products');

test("I can view the products", function(assert) {

  page
    .visit()
    .then(() => {
      andThen(() => {
        assert.equal( find('.thumbnail').length, 10, 'Count product' );
        assert.equal( find('.thumbnail .caption a:first').text(), 'Product 0', 'Title first product');
      });
    });
});

test('Sort product by title asc', assert => {

  page
    .visit()
    .clickToDesc();

  andThen(() => {
    assert.equal( find('.thumbnail .caption a:first').text(), 'Product 0', 'Title first product after button');
  });
});

test('Sort product by title desc', assert => {

  page
    .visit()
    .clickToDesc()
    .clickToAsc();

  andThen(() => {
    assert.equal( find('.thumbnail .caption a:first').text(), 'Product 9', 'Title first product after button asc');
  });
});

test('Create new product', assert => {

  page
    .visit()
    .clickToCreate()
    .title('new-title')
    .description('new-desc')
    .clickToSend()
      .then(()=>{
        andThen(() => {
          assert.equal( find('.thumbnail .caption a:first').text().trim(), 'new-title', 'Create product title');
          assert.equal( find('.thumbnail .caption p:first').text().trim(), 'new-desc', 'Create product desc');
        });
      });
});

test('Update in first product', assert => {

  page
    .visit()
    .clickToTitle()
    .title('update-title')
    .description('update-desc')
    .clickToSend()
      .then(()=>{
        andThen(() => {
          assert.equal( find('.thumbnail .caption a:last').text().trim(), 'update-title', 'Update product title');
          assert.equal( find('.thumbnail .caption p:last').text().trim(), 'update-desc', 'Update product desc');
        });
      });
});

test('Delete product', assert => {

  page
    .visit()
    .clickDelete()
      .then(() => {
        click('.delete-confirm')
          .then(()=>{
            andThen(() => {
              assert.equal( find('.thumbnail .caption a:first').text().trim(), 'Product 1', 'Delete product');
              assert.equal( find('.thumbnail .caption p:first').text().trim(), 'Description 1', 'Delete product');
            });
          });
      });
});


