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

// Function to add 'active' class to filter buttons
document.addEventListener("DOMContentLoaded", function() {
    var filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.filter-buttons button');
    const profileCardsContainer = document.getElementById('profile-cards-filter');
    const searchBar = document.getElementById('search-bar');
    const suggestionsContainer = document.getElementById('suggestions');
    const noResultMessage = document.getElementById('no-result-message');
    const savedFilter = localStorage.getItem('selectedFilter');

    if (!profileCardsContainer) {
        console.error("Element with ID 'profile-cards-filter' not found.");
        return;
    }

    // Load the saved filter if available
    if (savedFilter) {
        fetchProfiles(savedFilter);
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log(`Fetching profiles for: ${filter}`);
            fetchProfiles(filter);
            // Save the selected filter to local storage
            localStorage.setItem('selectedFilter', filter);
        });
    });

    searchBar.addEventListener('keyup', function() {
        showSuggest(this.value);
    });

    function fetchProfiles(filter) {
        console.log(`Requesting xml/${filter}.xml`);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `xml/${filter}.xml`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(`Received data for: ${filter}`);
                    try {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
                        const parseError = xmlDoc.getElementsByTagName("parsererror");
                        if (parseError.length > 0) {
                            console.error(`Error parsing XML: ${parseError[0].textContent}`);
                            return;
                        }
                        const profiles = xmlDoc.getElementsByTagName(filter.slice(0, -1)); // singular form
                        console.log(`Profiles length: ${profiles.length}`);
                        if (!profiles || profiles.length === 0) {
                            console.error(`No profiles found for: ${filter}`);
                            return;
                        }
                        displayProfiles(profiles);
                    } catch (e) {
                        console.error('Exception while parsing XML:', e);
                    }
                } else {
                    console.error(`Failed to fetch profiles for: ${filter}, Status: ${xhr.status}`);
                }
            }
        };
        xhr.onerror = function() {
            console.error(`Network error while fetching profiles for: ${filter}`);
        };
        xhr.send();
    }

    function displayProfiles(profiles) {
        profileCardsContainer.innerHTML = ''; // Clear previous profiles
        profileCardsContainer.style.display = 'flex';
        noResultMessage.style.display = 'none'; // Hide the no result message
        console.log(`Displaying ${profiles.length} profiles`);

        Array.from(profiles).forEach(profile => {
            const image = profile.getElementsByTagName('image')[0].textContent;
            const name = profile.getElementsByTagName('name')[0].textContent;
            const description = profile.getElementsByTagName('description')[0].textContent;
            const genre = profile.getElementsByTagName('genre')[0].textContent; // Added genre
            const portfolioElement = profile.getElementsByTagName('portfolio')[0];
            const portfolioLink = portfolioElement ? portfolioElement.textContent : '#'; // Default link if none is provided

            const profileCard = document.createElement('div');
            profileCard.classList.add('profile-card');

            profileCard.innerHTML = `
                <img src="${image}" alt="${name}">
                <h2>${name}</h2>
                <p>${description}</p>
                <p><strong>Genre:</strong> ${genre}</p>
                <a href="${portfolioLink}" class="view-portfolio-button" target="_blank">View Portfolio</a>
            `;

            profileCardsContainer.appendChild(profileCard);
        });
    }

    function showSuggest(query) {
        if (query.length == 0) {
            suggestionsContainer.innerHTML = "";
            profileCardsContainer.style.display = 'block';
            noResultMessage.style.display = 'none';
            return;
        }

        const filters = ["artists", "musicians", "photographers", "designers"];
        suggestionsContainer.innerHTML = "";
        profileCardsContainer.style.display = 'none'; // Hide the main profile cards

        let hasResults = false;

        filters.forEach(filter => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `xml/${filter}.xml`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
                    const profiles = xmlDoc.getElementsByTagName(filter.slice(0, -1)); // singular form
                    Array.from(profiles).forEach(profile => {
                        const name = profile.getElementsByTagName('name')[0].textContent;
                        if (name.toLowerCase().includes(query.toLowerCase())) {
                            hasResults = true;
                            const image = profile.getElementsByTagName('image')[0].textContent;
                            const description = profile.getElementsByTagName('description')[0].textContent;
                            const genre = profile.getElementsByTagName('genre')[0].textContent;
                            const portfolioElement = profile.getElementsByTagName('portfolio')[0];
                            const portfolioLink = portfolioElement ? portfolioElement.textContent : '#';

                            const profileCard = document.createElement('div');
                            profileCard.classList.add('profile-card');

                            profileCard.innerHTML = `
                                <img src="${image}" alt="${name}">
                                <h2>${name}</h2>
                                <p>${description}</p>
                                <p><strong>Genre:</strong> ${genre}</p>
                                <a href="${portfolioLink}" class="view-portfolio-button" target="_blank">View Portfolio</a>
                            `;

                            suggestionsContainer.appendChild(profileCard);
                        }
                    });

                    // Display no result message if no profiles match
                    if (!hasResults) {
                        noResultMessage.style.display = 'block';
                    } else {
                        noResultMessage.style.display = 'none';
                    }
                }
            };
            xhr.send();
        });
    }

    function performSearch() {
        const query = searchBar.value.toLowerCase();
        const filters = ["artists", "musicians", "photographers", "designers"];
        profileCardsContainer.innerHTML = "";
        suggestionsContainer.innerHTML = "";
        profileCardsContainer.style.display = 'none'; // Hide the main profile cards

        let hasResults = false;

        filters.forEach(filter => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `xml/${filter}.xml`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
                    const profiles = xmlDoc.getElementsByTagName(filter.slice(0, -1)); // singular form
                    Array.from(profiles).forEach(profile => {
                        const name = profile.getElementsByTagName('name')[0].textContent.toLowerCase();
                        if (name.includes(query)) {
                            hasResults = true;
                            const image = profile.getElementsByTagName('image')[0].textContent;
                            const description = profile.getElementsByTagName('description')[0].textContent;
                            const genre = profile.getElementsByTagName('genre')[0].textContent;
                            const portfolioElement = profile.getElementsByTagName('portfolio')[0];
                            const portfolioLink = portfolioElement ? portfolioElement.textContent : '#';

                            const profileCard = document.createElement('div');
                            profileCard.classList.add('profile-card');

                            profileCard.innerHTML = `
                                <img src="${image}" alt="${name}">
                                <h2>${name}</h2>
                                <p>${description}</p>
                                <p><strong>Genre:</strong> ${genre}</p>
                                <a href="${portfolioLink}" class="view-portfolio-button" target="_blank">View Portfolio</a>
                            `;

                            profileCardsContainer.appendChild(profileCard);
                        }
                    });

                    // Display no result message if no profiles match
                    if (!hasResults) {
                        noResultMessage.style.display = 'block';
                    } else {
                        noResultMessage.style.display = 'none';
                    }
                }
            };
            xhr.send();
        });
    }

    // Fetch footer.html content and insert it into the footerContainer div
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footerContainer').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching footer:', error);
    });
});
