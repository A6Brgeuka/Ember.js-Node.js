import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from '../../../config/environment';
const {inject} = Ember;

export default Ember.Controller.extend({
  notify: inject.service('notify'),
  newPath: '',
  file: null,
  url: ENV.apiHost + '/api/upload',
  baseUrl: Ember.computed(function () {
    return ENV.apiHost + this.model.get('path');
  }),
  isNew: Ember.computed('model', function () {
    return Ember.isEmpty(this.model.get('id'));
  }),
  actions:{
    close() {
      if(this.get('model.isNew')){
        this.store.deleteRecord(this.model);
      } else {
        this.get('model').rollbackAttributes();
      }
      return this.send('closeModal');
    },
    send(){
      const File = Ember.$('input#file')[0].files[0];

      const uploader = EmberUploader.Uploader.create({
        url: this.get('url')
      });

      if(this.model.get('id')){
        if(File !== undefined){
          //edit with image
          uploader.upload(File)
            .then(data=>{
              this.get('model').set('path', data.path);

              this.get('model').save()
                .then(()=>{
                  return this.send('closeModal');
                })
                .catch((error)=>{
                  this.get('notify').alert(error.errors.message);
                });
            })
            .catch((error)=>{
              this.get('notify').alert(error.errors.message);
            });
        } else {
        //  edit without images
          this.get('model').save()
            .then(() => {
              return this.send('closeModal');
            })
            .catch((error) => {
              this.get('notify').alert(error.errors.message);
            });
        }
      } else {
        //create
        uploader.upload(File)
          .then(data=>{
            this.get('model').set('path', data.path);
            this.get('model').save()
              .then(()=>{
                return this.send('closeModal');
              })
              .catch((error)=>{
                this.get('notify').alert(error.errors.message);
              });
          })
          .catch((error)=>{
            this.get('notify').alert(error.errors.message);
          });
      }
    }
  }
});
