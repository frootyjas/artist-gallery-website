<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us</title>
    <style>
        body {
            font-family: Segoe UI, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif;    
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            background-color: #fff;
            color: #2B2B2B;
        }

        .wrapper {
            padding: 70px;
            display: flex;
            flex-direction: column;
            align-items: center; 
        }

        .container {
            width: 100%;
            margin-top: -40px;
        }

        .about-container {
            padding: 5px;
            height: auto;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            display: flex;
            align-items: center;
        }

        .left-section {
            flex: 2;
            padding: 15px;
        }

        .left-section h2 {
            margin-top: 0;
        }

        .right-section {
            flex: 1;
            padding: 15px;
        }

        .right-section img {
            width: 100%;
            max-width: 200px;
            border-radius: 10px;
        }

        .map-container {
            display: none;
            margin-top: 15px;
        }

        .view-location-btn {
            margin-top: 15px;
            padding: 10px 15px;
            background-color: #76ABAE;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .view-location-btn:hover {
            background-color: #5b8a8c; 
        }

        h1 {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div id="navbarContainer"></div>

    <div class="wrapper">
        <div class="container">
            <h1>About the Developer</h1>
            <div class="about-container">
                <div class="right-section">
                    <img id="developerImage" src="" alt="Developer Image">
                </div>
                <div class="left-section">
                    <h2 id="developerName"></h2>
                    <p id="developerAge"></p>
                    <p id="developerEducation"></p>
                    <button class="view-location-btn" onclick="toggleMap()">View Location</button>
                    <div class="map-container" id="mapContainer">
                        <!-- Map iframe will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="footerContainer"></div>

    <script src="javascript/about.js"></script>

</body>