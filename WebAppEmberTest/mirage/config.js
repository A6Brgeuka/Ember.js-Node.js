export default function() {

  //this.passthrough("http://localhost:3000");

  this.get('/api/products');

  this.post('/api/products');

  this.put('/api/products/:id');

  this.delete('/api/products/:id');

  this.post('/api/upload', ()=>{
    return { path: '/images/images.png' };
  });
}
