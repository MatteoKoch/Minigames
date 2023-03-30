<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minispiele</title>
    <style>
        body {
            padding: 0;
            margin: 0;
            height: 100vh;
            background: #f7e11e;
        }
        
        main {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 30px;
            height: 100%;
        }
        
        main a,
        main button {
            width: 50%;
            height: 130px;
            color: #fff;
            text-decoration: none;
            /* background: red; */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            font-weight: bold;
            text-transform: uppercase;
            border-radius: 40px;
            box-shadow: 4px 4px;
            transition: all 200ms ease-in-out;
            position: relative;
            left: 0;
            top: 0;
            border: none;
            font-family: system-ui;
        }
        
        main a:hover,
        main a:focus,
        main button:hover,
        main button:focus {
            box-shadow: 1px 1px;
            left: 3px;
            top: 3px;
        }
        
        #select {
            display: none;
            grid-template-columns: 1fr 1fr 1fr;
            justify-items: center;
            width: 100%;
        }
        
        #select.active {
            display: grid;
        }
        
        #select a {
            height: 70px;
            background: #b432cd;
        }
        
        @media (max-width: 700px) {
            main a,
            main button {
                font-size: 40px;
                width: 80%;
            }
        }
    </style>
    
</head>

<body>
    
    <main>
        
        <h1 style="color: #fff; font-size: 55px; text-align: center; font-family: monospace; margin-top: 60px;">Minispiele</h1>
        
        <button onclick="document.getElementById('select').classList.toggle('active')" style="background: hsl(0deg, 100%, 50%);">15 Puzzle</button>
        <div id="select">
            <a href="./15puzzle?size=3">3x</a>
            <a href="./15puzzle?size=4">4x</a>
            <a href="./15puzzle?size=5">5x</a>
        </div>
        
        <?php
            $dir = scandir(".");
            $hue = 0;
            for($i = 0; $i < count($dir); ++$i) {
                if($dir[$i] != "." && $dir[$i] != ".." && $dir[$i] != "index.php" && $dir[$i] != "15puzzle" && $dir[$i] != "libs") {
                    $hue += 120;
                    $huestr = $hue."deg";
                    echo "<a style='background: hsl($huestr, 100%, 50%);' href='./$dir[$i]'>$dir[$i]</a>\n";
                }
            }
        ?>
        
    </main>
    
</body>

</html>