import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Product ${i}`;
  },
  description(i){
    return "Description " + i;
  },
  path: "/images/images.png"
});
