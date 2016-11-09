var rect = require("./rectangle");

function solveRect(l, b) {
  console.log("Solving for rectangle with l = " + l + "and b = " + b);

  if (l < 0 || b < 0) {
    console.log("Rectangle dimensions should be greater than zero");
  }
  else {
    console.log("The area of the rectangle of dimensions length = " +
    l + " and breadth of " + b + " is " + rect.area(l, b));
    console.log("The perimeter of a rectangle of dimensions length = "
    + l + " and breadth of " + b + " is " + rect.perimeter(l, b) );
  }
}

solveRect(-1, 2);
solveRect(3, 4);
solveRect(3, 7);
