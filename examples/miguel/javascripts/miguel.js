window.addEventListener('load',function() {

  var Q = Quintus()
    .include("Sprites, Scenes, Input, Anim, 2D, Audio, Touch, UI")
    .include("MiguelUI, MiguelScenes")
    //.enableSound()
    .setup({ width: 1400, height: 600, downsampleWidth: 1400, downsampleHeight: 600  })
    .touch();

  //Q.input.mouseControls();
  Q.input.keyboardControls();



  Q.load([
     // Images
     "background.jpg", 
      //actores
      "actors/Shoot.png",
      "actors/Zombie.png",
      "actors/Ball.png",
      // Data
      //"bg.tmx", "sprites.json"
    ],function() { 
      
      // Go Time
      Q.stageScene("title");
  });

  window.Q = Q;

},true);
