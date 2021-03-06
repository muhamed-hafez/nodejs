var rect = require("./rectangle-2");

function solveRect(l, b) {
  console.log("Solving for rectangle with l = " + l + "and b = " + b);

  rect(l, b, function(err, rectangle) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("The area of the rectangle of dimensions length = " +
      l + " and breadth of " + b + " is " + rectangle.area(l, b));
      console.log("The perimeter of a rectangle of dimensions length = "
      + l + " and breadth of " + b + " is " + rectangle.perimeter(l, b) );
    }
  });
}

solveRect(-1, 2);
solveRect(3, 4);
solveRect(3, 7);
