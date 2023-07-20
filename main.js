let TheItems = [
    "Apple", "Chair", "Dog", "Sun", "Moon", "Car", "Computer", "Table",
    "Pen", "Coffee mug", "Bicycle", "Mobile phone", "House", "Cloud", "Mountain", "River", "Boat", "Guitar",
    "Cat", "Laptop", "Flower", "Desk", "Shirt", "Television", "Bed", "Ball", "Glass", "Wallet",
    "Clock", "Plane", "Picture frame", "Shoes", "Headphones", "Keyboard", "Mirror", "Cup", "Camera", "Hat",
    "Pencil", "Door", "Sofa", "Painting", "Lamp", "Watch", "Key", "Globe", "Bottle",
    "Microwave", "Knife", "Plant", "Bowl", "Helmet", "Basketball", "Plate", "Spoon", "Piano", "Backpack",
    "Scissors", "Towel", "Dress", "Toothbrush", "Umbrella", "Fork", "Fan", "Printer", "Calculator", "Glasses",
    "Pencil case", "Speaker", "Vase", "Radio", "Envelope", "Tablet", "Charger", "Stove", "Paintbrush", "Headset",
    "Calendar", "Doorbell", "Mouse", "Earrings", "Toaster", "Pot", "Hammer", "Drum", "Dice", "Teapot",
    "Scarf", "Suitcase", "Marker", "Violin", "Candle", "Broom", "Phone" , "Toothpaste", "Couch",
    "Monitor", "Shoe", "Bike", "Bag", "Screwdriver"
  ];
  let random_number = Math.floor(Math.random() * TheItems.length);
  let Sketch = TheItems[random_number];
  document.getElementById('sketch2').innerHTML = 'Sketch To be Drawn: ' + Sketch;
  
  let scoreValue = 0;
  let timerValue = 0;
  let timerInterval;
  
  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    timerValue++;
    document.getElementById('timer-value').textContent = timerValue;
  }
  
  function increaseScore() {
    scoreValue++;
    document.getElementById('score-value').textContent = scoreValue;
  }
  
  function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
    startTimer(); // Start the timer
  }
  
  function clearCanvas() {
    background("white");
  }
  
  function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
  }
  
  function draw() {
    // Set stroke weight to 13
    strokeWeight(13);
    // Set stroke color to black
    stroke(0);
    // If mouse is pressed, draw line previous and current mouse positions
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  
  function classifyCanvas() {
    classifier.classify(canvas, gotResult);
    clearInterval(timerInterval); // Clear the previous timer interval
    timerValue = 0; // Reset the timer value
    document.getElementById('timer-value').textContent = timerValue;
    startTimer(); // Start the timer again
  }
  
  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
  
    document.getElementById('sketch-value').innerHTML = results[0].label;
    document.getElementById('confidence-value').innerHTML = Math.round(results[0].confidence * 100);

  
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
  
    if (results[0].label.toLowerCase() === Sketch.toLowerCase()) {
      increaseScore();
      clearCanvas();
      document.getElementById('sketch2').innerHTML = 'Sketch To be Drawn: ' + TheItems[Math.floor(Math.random() * TheItems.length)];
    }
    
  }
  