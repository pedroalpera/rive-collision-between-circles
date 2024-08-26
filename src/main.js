// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp

const riveInstance = new rive.Rive({
  src: "collision_detection_distance.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard 1",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();

    // Inputs in the Rive File
    const inputs = riveInstance.stateMachineInputs("State Machine 1");

    let collision_Boolean = inputs.find((i) => i.name === "Collision");

    // Explanation text
       riveInstance.setTextRunValue("Explanation_Run", "We have a collision if the distance is less than the sum of both circles radius. So if radius are 50 then 50 + 50 = 100.  Less than 100 px means they are colliding. ");

    // Set Circles from the Rive file 
    const circleA = riveInstance.artboard.node("CircleA");
    const circleB = riveInstance.artboard.node("CircleB");

    // Canvas position in the document
    let rect = canvas.getBoundingClientRect();

    // Radius of the circles
    let radiusA = 50;
    let radiusB = 50;

    let sumOfRadius = radiusA + radiusB;

    // On Mouse Move
    document.addEventListener("mousemove", function (event) {

      // Calculate distance between circles
      let distanceBetweenPoints = calculateDistanceBetweenPoints(circleA.x, circleA.y, circleB.x, circleB.y) 

      // If the distance between circles is less than the sum of the radius, there is a collision
      if ( distanceBetweenPoints < sumOfRadius) {
        collision_Boolean.value = true;
      } else {
        collision_Boolean.value = false;
      }

      // Update text with the distance number
      riveInstance.setTextRunValue("Info_Run", "Distance between circles: "+ Math.ceil(distanceBetweenPoints));
      
    });

    // NOTE: For more optimized ways to calculate the distance visit this link:
    // https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics

    // Calculate the distance thanks to Pithagoras :)
    // We are just calculating the hypotenuse, that's the distance
    function calculateDistanceBetweenPoints(x1, y1, x2, y2) {
      // Calculate the distance between the two circles
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    
  },
});
