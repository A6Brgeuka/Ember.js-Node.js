import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showModal(){
      this.sendAction('action', 'modals/create-edit-product', this.get('product'));
    },
    openModalConfirm(){
      this.sendAction('action', 'modals/delete-product', this.get('product'));
    }
  }
});
