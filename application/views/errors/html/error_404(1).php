<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #6e45e2, #88d3ce);
            color: #fff;
            overflow: hidden;
        }

        .container {
            text-align: center;
            animation: fadeIn 1.5s ease-in-out;
        }

        .circle {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .circle::before {
            content: '';
            position: absolute;
            top: -15px;
            left: -15px;
            right: -15px;
            bottom: -15px;
            border-radius: 50%;
            border: 5px solid rgba(255, 255, 255, 0.2);
            animation: rotate 10s linear infinite;
        }

        .circle h1 {
            font-size: 72px;
            margin: 0;
            color: #fff;
        }

        .circle p {
            font-size: 18px;
            margin: 20px 0;
            color: #fff;
        }

        .btn {
            display: inline-block;
            padding: 15px 30px;
            font-size: 18px;
            color: #6e45e2;
            background-color: #fff;
            border: none;
            border-radius: 50px;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.3s;
        }

        .btn:hover {
            background-color: #88d3ce;
            transform: scale(1.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="circle">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="<?php echo base_url();?>" class="btn">Go Back Home</a>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('404 Error Page Loaded');
        });
    </script>
</body>
</html>
