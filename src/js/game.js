function Game(n) {

    this.n = n;

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.startX = 20;
    this.startY = 20;
    this.width = 50;
    this.height = 50;

    this.player = {
        x: 0,
        y: 0,
        direction: 'none'
    }


    this.drawPlayer = function() {
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y-25, 15, 0, 2*Math.PI);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.stroke();
    }

    this.drawSquares = function() {
        this.ctx.beginPath();
        this.canvas.width = this.width * this.n + this.startX * 2;
        this.canvas.height = this.width * this.n + this.startX * 2;


        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.n; j++) {
              this.drawTile(i*this.width + this.startX, j*this.width + this.startY, this.field[i][j])
            }
        }
        this.ctx.stroke();
    }

    this.drawTile = function(x, y, type) {
      var image = document.getElementById(type);
      this.ctx.drawImage(image, x, y, this.width, this.width);
    }

    this.drawFlag = function() {
        var base_image = new Image();
        base_image.src = 'src/images/flag.png';
        var game = this;
        base_image.onload = function() {
            game.ctx.drawImage(base_image, game.startX + 2, game.startY + 2, game.width - 5, game.height - 5);
        }
    }

    this.throwDice = function() {
        var min = 1;
        var max = 6;
        var num = Math.floor(Math.random() * (max - min + 1)) + min
        document.getElementById('diceNum').innerText = num;
        return num;
    }

    this.movePlayer = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var num = this.throwDice();

        this.drawSquares();
        this.drawFlag();

        if (this.player.direction == 'left') {
            this.player.x = this.player.x - num * this.width;

            if (this.player.x < this.startX) {
                alert('dead');
            } else if (this.player.x > this.startX && this.player.x < this.startX + this.width) {
                this.player.direction = 'right';
                this.drawPlayer();
            } else {
                this.drawPlayer();
            }
        } else if (this.player.direction == 'right') {
            this.player.x = this.player.x + num * this.width;

            if (this.player.x > this.startX + this.width * this.n) {
                alert('dead');
            } else if (this.player.x < this.startX + this.width * this.n && this.player.x > this.startX + this.width * (this.n - 1)) {
                this.drawPlayer();
                alert('win');
            } else {
               this.drawPlayer();
            }
        }
    }

    this.startGame = function() {
      this.player.x = this.startX + (this.n/2) * this.width;
      this.player.y = this.startY + this.n * this.width;
      this.generateField();
      this.drawSquares();
      this.drawPlayer();
    }

    this.endGame = function(status) {
        alert(status);
    }


    this.generateField = function() {
      this.field = new Array(this.n);
      for (var i=0; i<this.n;i++) {
        this.field[i] = new Array(this.n);
        for (var j=0; j<this.n; j++) {
          if (i == Math.round((this.n-1)/2) && j == 0) {
            this.field[i][j] = 'finish';
          } else if (i ==  Math.round((this.n-1)/2) && j == n-1) {
            this.field[i][j] = 'start';
          } else {
            this.field[i][j] = this.randomTile(i, j);
          }
        }
      }
    }

    this.randomTile = function(i, j) {
      var variants = []
      if (i > 0) {
        variants.push('left');
      }
      if (i < this.n - 1) {
        variants.push('right');
      }
      if (j > 0) {
        variants.push('up');
      }
      if (j < this.n - 1) {
        variants.push('down');
      }
      return variants[Math.floor(Math.random()*variants.length)];
    }
}

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function start() {
   var a = new Game(17);
   a.startGame();
   window.a = a;
}

ready(start);
