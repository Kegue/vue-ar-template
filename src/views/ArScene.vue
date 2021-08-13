<template>
  <f7-page name="ArScene">
    <f7-navbar title="AR" back-link="Back">
      <p id="machineIdentifier" v-if="seenMachine !== 'null'" class="right">
        Máquina detetada:<br>{{seenMachine}}
      </p>
      <a class="right" @click="callAssistant">Falar com o assistente</a>
    </f7-navbar>
    <div id="m-container">
      <video id="video"></video>
      <div id="ar-renderer"></div>
    </div>
  </f7-page>
</template>


<script>
  import { f7 } from 'framework7-vue';

  var scene, camera, renderer, clock, deltaTime, totalTime, sheet;
  var arToolkitSource, arToolkitContext;
  var markerRoots = [];

  var machines = [
    {
      markerPath: "assets/data/hiro.patt",
      nome: "Impressora",
      atributos:[
        { tipo: "percentagem", nome: "Tinta Preta", valor: 53 },
        { tipo: "percentagem", nome: "Tinta Vermelha", valor: 46 },
        { tipo: "percentagem", nome: "Tinta Azul", valor: 97 },
        { tipo: "percentagem", nome: "Tinta Amarela", valor: 68 },
        { tipo: "absoluto", nome: "Papel", valor: 13, maximo: 50 }
      ]
    },
    {
      markerPath: "assets/data/kanji.patt",
      nome: "Fax",
      atributos:[
        { tipo: "percentagem", nome: "Tinta Preta", valor: 32 },
        { tipo: "absoluto", nome: "Papel", valor: 45, maximo: 50 }
      ]
    }
  ]

  export default {
    data() {
      return{
        seenMachine: "null",
      }
    },
    props: {
      f7router: Object,
    },
    methods: {
      initialize: function(){

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
        renderer.setPixelRatio(window.devicePixelRatio);

        document.getElementById("ar-renderer").appendChild( renderer.domElement );

        clock = new THREE.Clock();
        deltaTime = 0;
        totalTime = 0;
        
        ////////////////////////////////////////////////////////////
        // setup arToolkitContext
        ////////////////////////////////////////////////////////////	

        // create atToolkitContext
        arToolkitContext = new THREEx.ArToolkitContext({
          cameraParametersUrl: 'assets/data/camera_para.dat',
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
          sourceWidth: 640,
	        sourceHeight: 480,  
        });

        function onResize()
        {
          arToolkitSource.onResizeElement()
          arToolkitSource.copyElementSizeTo(renderer.domElement)	
          if ( arToolkitContext.arController !== null )
          {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
          }	
        }

        arToolkitSource.init(() => {
          onResize();
          // arToolkitContext.arController.addEventListener('getMarker', function (ev) {
          //   if(ev.data.marker.area > 500){
          //     console.log(ev);
          //     openSheet();
          //   }
          // });
        });
        
        // handle resize event
        window.addEventListener('resize', () => {
          onResize()
        });
        

        ////////////////////////////////////////////////////////////
        // setup markerRoots
        ////////////////////////////////////////////////////////////

        for(let i = 0; i < machines.length; i++){
          let machine = machines[i];

          let markerRoot = new THREE.Group();
          scene.add(markerRoot);

          let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
            type: 'pattern', patternUrl: machine.markerPath,
          })

          machine.sprite = spriteDemachine(machine, { r:0, g:0, b:0, a:0.8 });
          markerRoot.add(machine.sprite);

          markerRoots.push(markerRoot);
        }
      },

      update: function(){
        // update artoolkit on every frame
        if ( arToolkitSource.ready !== false )
          arToolkitContext.update( arToolkitSource.domElement );

        for(let i = 0; i < markerRoots.length; i++){
          if(markerRoots[i].visible){
            this.seenMachine = machines[i].nome;
            machines[i].sprite.position.y = 0.5 - Math.sin(totalTime*4)/10;
          }
        }
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
      },

      callAssistant: function(){
        this.f7router.navigate(`/chat/${this.seenMachine}`);
      }
    },
    mounted() {
      markerRoots = [];
      this.initialize();
      this.animate();
    }
  }

  function spriteDemachine (machine, border){
    var fontface = "Sans-Serif";
    var fontsize = 18;
    var borderThickness =  4;
    var backgroundColor = { r:1, g:96, b:114, a:0.4 };
    var borderColor = border;
    var textColor = { r:0, g:0, b:0, a:1.0 };

    var message = machine.nome;

    var canvas = document.createElement('canvas');
    canvas.height = 256;
    canvas.width = 256;

    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    rect(context, canvas.width/2 - textWidth/2 - borderThickness, 0, textWidth + borderThickness * 2, fontsize + borderThickness * 3, 8);

    let maxWidth = 0;

    for(var i = 0; i < machine.atributos.length; i++){
      var atributo = machine.atributos[i];
      var text = atributo.nome + ": " + atributo.valor;

      switch(atributo.tipo){
        case "percentagem":
          text += "%";
          break;
        case "absoluto":
          text += " de " + atributo.maximo;
      }

      let thisWidth = context.measureText( text ).width;
      maxWidth = thisWidth > maxWidth ? thisWidth : maxWidth;
    }

    rect(context, canvas.width/2 - maxWidth/2 - borderThickness, fontsize + borderThickness * 3, maxWidth + borderThickness * 2, (fontsize + borderThickness * 3) * machine.atributos.length, 8);

    context.textAlign = "center";
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( message, canvas.width/2, fontsize + borderThickness);

    for(var i = 0; i < machine.atributos.length; i++){
      var atributo = machine.atributos[i];
      var text = atributo.nome + ": " + atributo.valor;

      switch(atributo.tipo){
        case "percentagem":
          text += "%";
          break;
        case "absoluto":
          text += " de " + atributo.maximo;
      }

      context.fillText( text, canvas.width/2, (fontsize + borderThickness*2) * (i+2));
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, depthTest: false } );
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
    // ctx.stroke(); 
  }

  function rect(ctx, x, y, w, h) { 
    ctx.beginPath(); 
    ctx.moveTo(x, y); 
    ctx.lineTo(x + w, y); 
    ctx.lineTo(x + w, y + h); 
    ctx.lineTo(x, y + h); 
    ctx.lineTo(x, y); 
    ctx.closePath();
    ctx.fill(); 
    // ctx.stroke(); 
  }
</script>

<style scoped>
  #m-container{
    width: 100%;
    height: 100%;
    position: relative;
  }
  #ar-renderer{
    position: absolute;
    top: 0;
    left: 0;
  }
  #video{
    position: absolute;
    top: 0;
    left: 0;
  }
  #machineIdentifier{
    text-align: center;
  }
</style>