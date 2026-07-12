 let masterProducts = [];

const container = document.getElementById('dataContainer');
const filterSelect = document.getElementById('filterDropdown');
const sortSelect = document.getElementById('sortDropdown');
const searchBar = document.getElementById('searchBar');

async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        masterProducts = await response.json();
        applyFilterAndSort(); // Initial render
    } catch (error) {
        container.innerHTML = '<p>Error loading API data.</p>';
    }
}

function applyFilterAndSort() {
    const filterValue = filterSelect.value;
    const sortValue = sortSelect.value;
    const searchValue = searchBar.value.toLowerCase().trim();

    let processedItems = [...masterProducts];

    // Filter by category
    if (filterValue !== 'all') {
        processedItems = processedItems.filter(
            item => item.category === filterValue
        );
    }

    // Search by title or category
    if (searchValue !== '') {
        processedItems = processedItems.filter(item =>
            item.title.toLowerCase().includes(searchValue) ||
            item.category.toLowerCase().includes(searchValue)
        );
    }

    // Sort results
    if (sortValue === 'price-asc') {
        processedItems.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        processedItems.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'title-asc') {
        processedItems.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderDOM(processedItems);
}

function renderDOM(items) {
    if (items.length === 0) {
        container.innerHTML = '<p>No items match your criteria.</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.title}" class="product-image">

            <h4>${item.title.substring(0, 30)}...</h4>

            <p>Category: ${item.category}</p>

            <strong>$${item.price}</strong>
        </div>
    `).join('');
}

// Event listeners
filterSelect.addEventListener('change', applyFilterAndSort);
sortSelect.addEventListener('change', applyFilterAndSort);
searchBar.addEventListener('input', applyFilterAndSort);

// Load products
fetchData();
  
        filterSelect.addEventListener('change', applyFilterAndSort);
        sortSelect.addEventListener('change', applyFilterAndSort);

     
        fetchData();