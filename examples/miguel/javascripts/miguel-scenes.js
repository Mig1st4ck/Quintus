;Quintus.MiguelScenes = function(Q) {

  Q.scene("title",function(stage) {
      var bg = stage.insert(new Q.Background());
      var shoot = stage.insert(new Q.Shooter());
      var zoombie = stage.insert(new Q.Walker({ }));
  });
};

