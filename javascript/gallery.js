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

    // Add event listener for theme toggle button
    var themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });
    }
})
.catch(error => {
    console.error('Error fetching navbar:', error);
});

async function fetchImages(file) {
    const response = await fetch(`xml/${file}`);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const images = Array.from(xml.querySelectorAll('image')).map(img => ({
        src: img.getAttribute('src'),
        title: img.getAttribute('title'),
        description: img.getAttribute('description')
    }));
    return images;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function loadGallery() {
    const files = [
        'galleryArtists.xml',
        'galleryPhotographers.xml',
        'galleryDesigners.xml'
    ];
    let images = [];
    for (const file of files) {
        const imgs = await fetchImages(file);
        images = images.concat(imgs);
    }
    images = shuffle(images);
    const gallery = document.getElementById('gallery');
    images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <div class="overlay">
                <h4>${img.title}</h4>
                <p>${img.description}</p>
                <div class="social-icons">
                    <a href="https://www.facebook.com" class="fab fa-facebook-f"></a>
                    <a href="https://www.instagram.com" class="fab fa-instagram"></a>
                    <a href="mailto:example@example.com" class="fas fa-envelope"></a>
                </div>
            </div>
            <img src="${img.src}" alt="${img.title}">
        `;
        gallery.appendChild(div);
    });
}

loadGallery();

// Fetch footer.html content and insert it into the footerContainer div
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footerContainer').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching footer:', error);
});
