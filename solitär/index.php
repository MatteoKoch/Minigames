<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Solit&auml;r</title>
    <style>
        body {
            padding: 0;
            margin: 0;
        }
        
        #home {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 30px 0;
        }
        
        #home a {
            width: 50%;
            height: 150px;
            color: #fff;
            text-decoration: none;
            background: red;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            font-weight: bold;
            text-transform: uppercase;
            border-radius: 40px;
            box-shadow: 4px 4px #222;
            transition: all 200ms ease-in-out;
            position: relative;
            left: 0;
            top: 0;
        }
        
        #home a:hover,
        #home a:focus {
            box-shadow: 1px 1px;
            left: 3px;
            top: 3px;
        }
        
        @media (max-width: 700px) {
            #home a {
                font-size: 40px;
            }
        }
    </style>
    <script src="../libs/p5.js"></script>
    <script src="sketch.js"></script>
</head>

<body>
  <main>
      <div id="root"></div>      
  </main>
    
    <div id="home">
        <h2 id="punkte" style="text-align: center;"></h2>
        <h2 id="gameover" style="color: red; text-align: center;"></h2>
        <a href="..">zur&uuml;ck</a>
    </div>
    
    <script>
        setTimeout(function() {
            document.querySelector("#home").style.width = `${document.querySelector("canvas").clientWidth}px`;
        }, 2000)
    </script>
  
</body>

</html>