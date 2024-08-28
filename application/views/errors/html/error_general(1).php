<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        @keyframes neonGlow {
            0% {
                text-shadow: 0 0 5px #00ffe7, 0 0 10px #00ffe7, 0 0 20px #00ffe7, 0 0 40px #00ffe7, 0 0 80px #00ffe7, 0 0 120px #00ffe7;
            }
            50% {
                text-shadow: 0 0 10px #00ffe7, 0 0 20px #00ffe7, 0 0 30px #00ffe7, 0 0 50px #00ffe7, 0 0 100px #00ffe7, 0 0 150px #00ffe7;
            }
            100% {
                text-shadow: 0 0 5px #00ffe7, 0 0 10px #00ffe7, 0 0 20px #00ffe7, 0 0 40px #00ffe7, 0 0 80px #00ffe7, 0 0 120px #00ffe7;
            }
        }

        @keyframes slideIn {
            from {
                transform: translateY(100vh);
            }
            to {
                transform: translateY(0);
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
            background-color: #0d0d0d;
            color: #00ffe7;
            overflow: hidden;
        }

        .container {
            text-align: center;
            animation: slideIn 1.5s ease-out;
        }

        .error {
            padding: 30px;
            border-radius: 8px;
        }

        .error h1 {
            font-size: 120px;
            margin: 0;
            color: #00ffe7;
            animation: neonGlow 1.5s infinite alternate;
        }

        .error p {
            font-size: 20px;
            margin: 20px 0;
            color: #fff;
        }

        .btn {
            display: inline-block;
            padding: 15px 30px;
            font-size: 18px;
            color: #0d0d0d;
            background-color: #00ffe7;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.3s;
        }

        .btn:hover {
            background-color: #00ccbe;
            transform: scale(1.1);
        }

        .neon-border {
            padding: 20px;
            border: 2px solid #00ffe7;
            border-radius: 10px;
            box-shadow: 0 0 10px #00ffe7, 0 0 20px #00ffe7, 0 0 40px #00ffe7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error neon-border">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <a href="<?php echo base_url();?>"class="btn">Go Back Home</a>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('404 Error Page Loaded');
        });
    </script>
</body>
</html>
