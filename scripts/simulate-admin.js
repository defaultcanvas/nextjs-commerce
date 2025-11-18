const fs = require('fs');
const path = require('path');
const file = path.resolve(process.cwd(), '.local_admin_store.json');

function read() {
  if (!fs.existsSync(file)) return {};
  try { return JSON.parse(fs.readFileSync(file,'utf8')||'{}'); } catch(e){ return {}; }
}
function write(data){ fs.writeFileSync(file, JSON.stringify(data,null,2),'utf8'); }

console.log('Using storage file:', file);
let store = read();

// bootstrap initial state if not present
store['nextjs-commerce-admin'] = store['nextjs-commerce-admin'] || {
  categories: ['men','women','kids','accessories'],
  subcategories: {
    men: ['hoodies','tees','joggers','trainers'],
    women: ['hoodies','leggings','trainers'],
    kids: ['hoodies','jackets','trainers'],
    accessories: ['bags','caps','fragrance']
  },
  products: []
};

write(store);
console.log('Initialized admin store.');

// 1) Create a product
const id = 'prod-' + Date.now();
const product = {
  id,
  title: 'Simulated Hoodie',
  price: 49.99,
  category: 'men',
  subcategory: 'hoodies',
  images: []
};
store = read();
store['nextjs-commerce-admin'].products.push(product);
write(store);
console.log('Created product', id);

// 2) Upload several mock images (mock upload returns /mock-storage/<filename>)
const mockImages = ['one.jpg','two.jpg','three.jpg'].map((n, i) => `/mock-storage/${Date.now()}-${i}-${n}`);
store = read();
const p = store['nextjs-commerce-admin'].products.find(p=>p.id===id);
if (!p) throw new Error('product not found');
p.images.push(...mockImages);
write(store);
console.log('Uploaded mock images:', mockImages);

// 3) Reorder via drag: move last image to first
store = read();
const p2 = store['nextjs-commerce-admin'].products.find(p=>p.id===id);
if (p2 && p2.images.length>=2) {
  const moved = p2.images.splice(p2.images.length-1,1)[0];
  p2.images.splice(0,0,moved);
  write(store);
  console.log('Reordered images — moved last to first');
}

// 4) Delete an image: remove index 1
store = read();
const p3 = store['nextjs-commerce-admin'].products.find(p=>p.id===id);
if (p3 && p3.images.length>1) {
  const removed = p3.images.splice(1,1);
  write(store);
  console.log('Deleted image at index 1:', removed);
}

// 5) Save product — already saved by writing file
store = read();
console.log('Final product images:', store['nextjs-commerce-admin'].products.find(p=>p.id===id).images);

console.log('Simulation complete.');
