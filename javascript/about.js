// Fetch navbar.html content and insert it into the navbarContainer div
fetch('navbar.php')
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

// Fetch XML data using AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'xml/developer.xml', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var xml = xhr.responseXML;
        var developer = xml.getElementsByTagName('developer')[0];
        
        // Populate data from XML
        document.getElementById('developerName').textContent = developer.getElementsByTagName('name')[0].textContent;
        document.getElementById('developerAge').textContent = developer.getElementsByTagName('age')[0].textContent + ' years of age';
        document.getElementById('developerEducation').textContent = developer.getElementsByTagName('education')[0].textContent;
        document.getElementById('developerImage').src = developer.getElementsByTagName('image')[0].textContent;

        // Load map iframe
        var mapEmbed = developer.getElementsByTagName('map')[0].innerHTML;
        document.getElementById('mapContainer').innerHTML = mapEmbed;
    }
};
xhr.send();

function toggleMap() {
    var map = document.getElementById('mapContainer');
    map.style.display = (map.style.display === 'none') ? 'block' : 'none';
}

// Fetch footer.html content and insert it into the footerContainer div
fetch('footer.php')
.then(response => response.text())
.then(data => {
    document.getElementById('footerContainer').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching footer:', error);
});

// Function to toggle map visibility
function toggleMap() {
    var mapContainer = document.getElementById('mapContainer');
    if (mapContainer.style.display === 'none' || mapContainer.style.display === '') {
        mapContainer.style.display = 'block';
    } else {
        mapContainer.style.display = 'none';
    }
}