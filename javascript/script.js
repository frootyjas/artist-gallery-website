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

    // Initialize theme toggle button
    var themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.navbar').classList.toggle('dark-theme');
        document.querySelector('footer').classList.toggle('dark-theme');
        
        var navbarLogo = document.getElementById('navbar-logo');
        if (document.body.classList.contains('dark-theme')) {
            navbarLogo.src = 'images/logo-white.png';
        } else {
            navbarLogo.src = 'images/logo-black.png';
        }

        
    });
})
.catch(error => {
    console.error('Error fetching navbar:', error);
});


function loadFAQs() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "xml/faqs.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            const faqs = xml.getElementsByTagName("faq");
            const faqList1 = document.getElementById("faq-list-1");
            const faqList2 = document.getElementById("faq-list-2");
            
            for (let i = 0; i < faqs.length; i++) {
                const question = faqs[i].getElementsByTagName("question")[0].textContent;
                const answer = faqs[i].getElementsByTagName("answer")[0].textContent;
                const li = document.createElement("li");
                const div = document.createElement("div");
                div.className = "question-arrow";
                const span = document.createElement("span");
                span.className = "question";
                span.textContent = question;
                const icon = document.createElement("i");
                icon.className = "fas fa-chevron-down arrow";
                div.appendChild(span);
                div.appendChild(icon);
                const p = document.createElement("p");
                p.textContent = answer;
                const line = document.createElement("span");
                line.className = "line";
                
                li.appendChild(div);
                li.appendChild(p);
                li.appendChild(line);
                
                if (i % 2 === 0) {
                    faqList1.appendChild(li);
                } else {
                    faqList2.appendChild(li);
                }

                div.addEventListener("click", function() {
                    li.classList.toggle("showAnswer");
                });
            }
        }
    };
    xhr.send();
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
