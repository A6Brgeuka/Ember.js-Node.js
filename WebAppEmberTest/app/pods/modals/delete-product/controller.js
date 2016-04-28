import Ember from 'ember';
const {inject} = Ember;

export default Ember.Controller.extend({
  notify: inject.service('notify'),
  actions: {
    close() {
      return this.send('closeModal');
    },
    deleteProduct(){
      this.model.destroyRecord()
        .then(()=>{
            return this.send('closeModal');
        })
        .catch((error)=>{
          this.get('notify').alert(error.errors.message);
        });
    }
  }
});
