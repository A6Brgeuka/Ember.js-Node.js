import Ember from 'ember';
import wait from '../../utils/wait';

export default Ember.Route.extend({
  model(){
    let product = this.store.findAll('product');
    return wait(product, 3*1000);
  }
});
