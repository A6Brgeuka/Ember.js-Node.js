import Ember from 'ember';

export default Ember.Controller.extend({
  canCreateProduct: Ember.computed.or('model.length'),
  sortBy: 'titleAsc',
  searchTerm: '',
  matchingSongs: Ember.computed('model.@each.title', 'searchTerm', function () {
    return this.get('model').filter((product)=>{
      const searchTerm = this.get('searchTerm').toLowerCase();
      return product.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),
  sortProperties: Ember.computed('sortBy', function(){
    let options = {
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc'
    };
    return options[this.get('sortBy')].split(',');
  }),
  sortedProducts: Ember.computed.sort('matchingSongs', 'sortProperties'),
  actions: {
    showModal(){
      let product = this.store.createRecord('product');
      product.set('title', '');
      product.set('path', '');
      this.send('openModal', 'modals/create-edit-product', product);
    },
    sortProduct(sortBy){
      this.set('sortBy', sortBy);
    }
  }
});
