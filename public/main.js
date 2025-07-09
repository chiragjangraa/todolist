const API_URL = '/api/products';

// NOTE: Removed auto-fetch on page load

async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayProducts(data);
}

async function searchProduct() {
  const q = document.getElementById('searchInput').value.trim();
  const res = await fetch(`${API_URL}/search?q=${q}`);
  const data = await res.json();
  displayProducts(data);
}

async function addProduct() {
  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const category = document.getElementById('category').value.trim();

  if (!name || !price || !category) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category })
  });

  if (res.ok) {
    alert("✅ Product added!");
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    fetchProducts();
  } else {
    alert("❌ Error adding product.");
  }
}

function displayProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <strong>${p.name}</strong> - ₹${p.price}<br/>
      <small>Category: ${p.category}</small>
    `;
    container.appendChild(div);
  });
}