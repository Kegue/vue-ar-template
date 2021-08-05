<template>
    <div id="canvas">

    </div>
</template>

<script>
  var scene, camera, renderer, clock, deltaTime, totalTime;
  var arToolkitSource, arToolkitContext;
  var markerRoot1, markerRoot2;
  var mesh1;

  export default {
    data() {
      return{
      }
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
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0px'
        renderer.domElement.style.left = '0px'
        document.body.appendChild( renderer.domElement );

        clock = new THREE.Clock();
        deltaTime = 0;
        totalTime = 0;
        
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
        // setup markerRoots
        ////////////////////////////////////////////////////////////

        // build markerControls
        markerRoot1 = new THREE.Group();
        scene.add(markerRoot1);
        let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
          type: 'pattern', patternUrl: "data/hiro.patt",
        })

        let geometry1	= new THREE.CubeGeometry(1,1,1);
        let material1	= new THREE.MeshNormalMaterial({
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide
        }); 
        
        mesh1 = new THREE.Mesh( geometry1, material1 );
        mesh1.position.y = 0.5;
        
        markerRoot1.add( mesh1 );
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
</script>

<style>
  #canvas {
    background-color: #000;
    width: 200px;
    height: 200px;
    border: 1px solid black;
    margin: 100px;
    padding: 0px;
    position: static; /* fixed or static */
    top: 100px;
    left: 100px;
  }
</style>