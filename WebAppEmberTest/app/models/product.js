import DS from 'ember-data';
import ENV from 'web-app/config/environment';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  path: DS.attr('string'),
  baseUrl: Ember.computed('path', function () {
    return ENV.apiHost + this.get('path');
  }),
  pathExists: Ember.computed('path', function(){
    return Ember.isEmpty(this.get('path'));
  })
});
