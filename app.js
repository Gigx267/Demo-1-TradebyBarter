document.addEventListener('DOMContentLoaded', function() {
    const itemForm = document.getElementById('item-form');
    const itemsList = document.getElementById('items-list');
  
    async function fetchItems() {
      const response = await fetch('http://localhost:3000/items');
      const items = await response.json();
      itemsList.innerHTML = '';
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <p>$${item.price}</p>
          <p>Contact: ${item.contactNumber}</p>
        `;
        itemsList.appendChild(li);
      });
    }
  
    itemForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const contactNumber = document.getElementById('contactNumber').value;
  
      const newItem = { title, description, price, contactNumber };
  
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
  
      const item = await response.json();
      fetchItems();
  
      itemForm.reset();
    });
  
    fetchItems();
  });