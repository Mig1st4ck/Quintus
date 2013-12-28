;Quintus.MiguelUI = function(Q) {

  
  Q.Sprite.extend("Background",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'background.jpg',
        type: 0
      });
    }
  });
  Q.Sprite.extend("BasicObject", {
    init: function(p1, p2){
      this._super(Q._extend(p2, p1),{
        gravity: 0
      });
    }
  }, {});

  Q.Sprite.extend("Plant",{
    init: function(p1, p2){
      this._super(Q._extend(p2, p1),{
      });
      this.on('step', this, this.step);
    },
    health: 100,
    Shooting: {
      last: 0,
      count: 0,
      max: 100
    },
    Shoot: function(st){
      //override this
    },
    step: function(st){
      if (this.Shooting.count > this.Shooting.max){
        //Shoot
        this.Shoot(st);
        this.Shooting.count = 0;
      }
      this.Shooting.count++;
    }
  },{});

  Q.BasicObject.extend("Weapon",{
    init: function(p1, p2){
      this._super(Q._extend(p2, p1),{
        vx: 70,
      });
      this.add("2d");
    },
    health: 10
  },{});

  Q.BasicObject.extend("Zombie",{
    init: function(p1, p2){
      this._super(Q._extend(p2, p1),{
        vx: -10,
      });
      this.add("2d");
    },
    health: 10
  },{});

  Q.Plant.extend("Shooter",{
    init: function(p) {
      this._super(p,{
        x: 280,
        y: 150,
        asset: 'actors/Shoot.png',
        type: 0
      });
    },
    Shoot: function(st){
      //Need to Shoot now
      console.log("Shoot....");
      this.stage.insert(new Q.Ball({ x: this.p.x, y: this.p.y }));
    }
  });

  Q.Zombie.extend("Walker",{
    init: function(p) {
      this._super(p,{
        x: Q.width -600,
        y: 150,
        asset: 'actors/Zombie.png',
        type: 0
      });
    }
  });

  Q.Weapon.extend("Ball",{
    init: function(p) {
      this._super(p,{
        asset: 'actors/Ball.png'
      });
      this.on("hit.sprite",function(collision) {
      // Check the collision, if it's the Tower, you win!
      if(collision.obj.isA("Zombie")) {
        // Remove the player to prevent them from moving
        this.destroy();

        collision.obj.health -= this.health;
        if (collision.obj.health < 0){
          collision.obj.destroy();
        }
      }
    });
    }
  });
};
