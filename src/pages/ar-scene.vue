<template>
  <div id="container"></div>
</template>

<script>
  var scene, camera, renderer, clock, deltaTime, totalTime;
  var arToolkitSource, arToolkitContext;
  var markerRoot1, markerRoot2;
  var mesh1;
  var maquina = {
    titulo: "Impressora 001",
    atributos:[
      { tipo: "percentagem", nome: "Tinta Preta", valor: 53 },
      { tipo: "absoluto", nome: "Papel", valor: 13, maximo: 50 }
    ]
  }

  export default {
    data() {
      return{
      }
    },
    methods: {
      initialize: async function(){

        scene = new THREE.Scene();

        let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
        scene.add( ambientLight );
              
        camera = new THREE.Camera();
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({
          antialias : true,
          alpha: true
        });
        renderer.setClearColor(new THREE.Color('lightgrey'), 0)
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0px'
        renderer.domElement.style.left = '0px'
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild( renderer.domElement );

        clock = new THREE.Clock();
        deltaTime = 0;
        totalTime = 0;
        
        ////////////////////////////////////////////////////////////
        // setup arToolkitContext
        ////////////////////////////////////////////////////////////	

        // create atToolkitContext
        arToolkitContext = new THREEx.ArToolkitContext({
          cameraParametersUrl: 'data/camera_para.dat',
          detectionMode: 'mono'
        });
        
        // copy projection matrix to camera when initialization complete
        function onCompleted(){
          camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
        }
        arToolkitContext.init( () =>{
          onCompleted() 
        });

        ////////////////////////////////////////////////////////////
        // setup arToolkitSource
        ////////////////////////////////////////////////////////////

        arToolkitSource = new THREEx.ArToolkitSource({
          sourceType : 'webcam',
        });

        function onResize()
        {
          arToolkitSource.onResizeElement()
          arToolkitSource.copyElementSizeTo(renderer.domElement)	
          console.log("need ar controller")
          if ( arToolkitContext.arController !== null )
          {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
          }	
        }

        arToolkitSource.init(() => {
          onResize();
        });
        
        // handle resize event
        window.addEventListener('resize', () => {
          onResize()
        });
        

        ////////////////////////////////////////////////////////////
        // setup markerRoots
        ////////////////////////////////////////////////////////////

        // build markerControls
        markerRoot1 = new THREE.Group();
        scene.add(markerRoot1);
        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
          type: 'pattern', patternUrl: "data/hiro.patt",
        })

        // let geometry1	= new THREE.CubeGeometry(1,1,1);
        // let material1	= new THREE.MeshNormalMaterial({
        //   transparent: true,
        //   opacity: 0.5,
        //   side: THREE.DoubleSide
        // }); 
        
        // mesh1 = new THREE.Mesh( geometry1, material1 );
        // mesh1.position.y = 0.5;

        let sprite = spriteDeMaquina(maquina);

        sprite.position.y = 1;
        
        markerRoot1.add( sprite );
      },

      update: function(){
        // update artoolkit on every frame
        if ( arToolkitSource.ready !== false )
          arToolkitContext.update( arToolkitSource.domElement );
      },

      render: function(){
        renderer.render( scene, camera );
      },

      animate: function(){
        requestAnimationFrame(this.animate);
        deltaTime = clock.getDelta();
        totalTime += deltaTime;
        this.update();
        this.render();
      }
    },
    mounted() {
      this.initialize();
      this.animate();
    }
  }
  function spriteDeMaquina (maquina){
    var fontface = "Arial";
    var fontsize = 18;
    var borderThickness =  4;
    var backgroundColor = { r:255, g:255, b:255, a:0.8 };
    var borderColor = { r:0, g:0, b:0, a:0.8 };
    var textColor = { r:0, g:0, b:0, a:1.0 };

    var message = maquina.titulo;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, canvas.width/2 - textWidth/2 - borderThickness, 0, textWidth + borderThickness, fontsize + borderThickness * 3, 8);

    context.textAlign = "center";
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( message, canvas.width/2, fontsize + borderThickness);

    for(var i = 0; i < maquina.atributos.length; i++){
      var atributo = maquina.atributos[i];
      var text = atributo.nome + ": " + atributo.valor;

      switch(atributo.tipo){
        case "percentagem":
          text += "%";
          break;
        case "absoluto":
          text += " de " + atributo.maximo;
      }

      context.fillText( text, canvas.width/2, (fontsize + borderThickness) * (i+2));
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false, depthTest: false } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(0.01 * canvas.width, 0.01 * canvas.height);
    return sprite;  
  }

  function roundRect(ctx, x, y, w, h, r) { 
    ctx.beginPath(); 
    ctx.moveTo(x + r, y); 
    ctx.lineTo(x + w - r, y); 
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); 
    ctx.lineTo(x + w, y + h - r); 
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); 
    ctx.lineTo(x + r, y + h); 
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); 
    ctx.lineTo(x, y + r); 
    ctx.quadraticCurveTo(x, y, x + r, y); 
    ctx.closePath(); 
    ctx.fill(); 
    ctx.stroke(); 
  }
</script>