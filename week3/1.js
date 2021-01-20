// 1. Point

function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Point.prototype = {
    getDistance: function (point2) {
      let diffX = this.x - point2.x;
      let diffY = this.y - point2.y;
  
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    }
  }
  
  const p1 = new Point(0, 0);
  const p2 = new Point(3, 4);
  
  console.log(p1.getDistance(p2));
  
  
  // 2. Circle
  
  function Circle(x, y, r) {
    Point.apply(this, arguments);
    this.r = r;
  }
  
  Circle.prototype = {
    getCircumference: function () {
      return 2 * Math.PI * this.r;
    },
    getArea: function () {
      return Math.PI * Math.pow(this.r, 2);
    },
    intersects: function (circle2) {
      const centerDistance = Math.sqrt(Math.pow(this.x - circle2.x, 2) + Math.pow(this.y - circle2.y, 2));
      const radiusSum = this.r + circle2.r;
  
      return centerDistance < radiusSum;
    }
  }
  
  const c1 = new Circle(1, 1, 3);
  const c2 = new Circle(5, 4, 3);
  
  console.log(c1.getArea());
  console.log(c1.getCircumference());
  console.log(c1.intersects(c2));
  