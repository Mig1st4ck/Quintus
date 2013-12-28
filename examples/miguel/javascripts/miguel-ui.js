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
        type: Q.SPRITE_FRIENDLY
      });
      this.on('step', this, this.step);
    },
    health: 100,
    Shooting: {
      last: 0,
      count: 0,
      max: 400
    },
    Shoot: function(st){
      //override this
    },
    OnHit: function(st, enemy){
      //override this
      console.log(enemy.className);
    },
    step: function(st){
      var collided = this.stage.search(this, Q.SPRITE_ENEMY);
      if (collided){
        this.OnHit(st, collided.obj);
      }
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
        type: Q.SPRITE_NONE,
        collisionMask: Q.SPRITE_ENEMY
      });
      this.add("2d");
    },
    health: 10
  },{});

  Q.BasicObject.extend("Zombie",{
    init: function(p1, p2){
      this._super(Q._extend(p2, p1),{
        vx: -10,
        type: Q.SPRITE_ENEMY,
        collisionMask: Q.SPRITE_FRIENDLY
      });
      this.add("2d");
      this.on("hit.sprite", function(collision){
        this.p.vx = this.Speed;
      })
    },
    Speed: -10,
    health: 100
  },{});

  Q.Plant.extend("Shooter",{
    init: function(p) {
      this._super(p,{
        x: 280,
        y: 150,
        asset: 'actors/Shoot.png'
      });
    },
    Shoot: function(st){
      //Need to Shoot now
      console.log("Shoot....");
      this.stage.insert(new Q.Ball({ 
        x: this.p.x + 20, 
        y: this.p.y - 15,
        z: 0
      }));
    }
  });

  Q.Zombie.extend("Walker",{
    init: function(p) {
      this._super(p,{
        x: Q.width -600,
        y: 150,
        asset: 'actors/Zombie.png'
      });
      /*
      this.on("hit.sprite", function(collision){
        if(collision.obj instanceof Q.Plant) {
          console.log("Hit Plant...");
          this.Speed = -1;
          this.p.vx = this.Speed;
          collision.obj.health -= this.Hit;
          if (collision.obj.health < 0){
            collision.obj.destroy();
            this.Speed = -10;
            this.p.vx = this.Speed;
          }
        }
      });
      */
    },
    Hit: 1
  });

  Q.Weapon.extend("Ball",{
    init: function(p) {
      this._super(p,{
        asset: 'actors/Ball.png'
      });
      this.on("hit.sprite",function(collision) {
        // Check the collision, if it's the Tower, you win!
        if(collision.obj instanceof Q.Zombie) {
          console.log("Hit Zombie....");
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


  Q.UI.Button.extend("Place", {
    init: function (p,callback) {
      this._super(Q._extend({
        label: 'Here',
        w: 100,
        h: 100,
        type : Q.SPRITE_UI
      }, p), callback);
    },
    border: 2,
  });
};
