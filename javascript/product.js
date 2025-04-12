// Fetch navbar.html content and insert it into the navbarContainer div
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbarContainer').innerHTML = data;

    // Function to add 'active' class to the current link based on the page URL
    var currentPath = window.location.pathname.split('/').pop();
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
})
.catch(error => {
    console.error('Error fetching navbar:', error);
});

// Fetch and display products from product.xml
document.addEventListener("DOMContentLoaded", function() {
    fetch('xml/product.xml')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        let products = xml.getElementsByTagName('product');
        let productContainer = document.getElementById('productContainer');

        function displayProducts(products) {
            productContainer.innerHTML = "";
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                let image = product.getElementsByTagName('image')[0].textContent;
                let name = product.getElementsByTagName('name')[0].textContent;
                let price = product.getElementsByTagName('price')[0].textContent;
                let availability = product.getElementsByTagName('availability')[0].textContent;

                let productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${image}" alt="${name}">
                    <h3>${name}</h3>
                    <p>Price: ${price}</p>
                    <p>Availability: ${availability}</p>
                    <div class="button-container">
                        <button class="heart-button"><i class="fas fa-heart"></i></button>
                        <button class="view-details-button" data-toggle="modal" data-target="#detailsModal" data-name="${name}" data-price="${price}" data-availability="${availability}" data-image="${image}">View Details</button>
                    </div>
                `;

                productContainer.appendChild(productCard);
            }

            // Add event listeners for the view details buttons
            document.querySelectorAll('.view-details-button').forEach(button => {
                button.addEventListener('click', function() {
                    let name = this.getAttribute('data-name');
                    let price = this.getAttribute('data-price');
                    let availability = this.getAttribute('data-availability');
                    let image = this.getAttribute('data-image');

                    let modalBodyContent = `
                        <img src="${image}" alt="${name}" class="img-fluid">
                        <h3>${name}</h3>
                        <p>Price: ${price}</p>
                        <p>Availability: ${availability}</p>
                    `;

                    document.getElementById('modalBodyContent').innerHTML = modalBodyContent;
                });
            });
        }

        // Display all products initially
        displayProducts(products);

        // Filter button functionality
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                let filter = this.getAttribute('data-filter');
                let filteredProducts = Array.from(products);

                if (filter !== 'none') {
                    filteredProducts = filteredProducts.filter(product => {
                        let availability = product.getElementsByTagName('availability')[0].textContent.toLowerCase();
                        return availability.includes(filter);
                    });
                }

                displayProducts(filteredProducts);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
});

// Fetch footer.html content and insert it into the footerContainer div
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footerContainer').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching footer:', error);
});
