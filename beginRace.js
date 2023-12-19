const Gpio = require('pigpio').Gpio;

const redLampPins = [2, 3, 4, 5, 6];
const greenLampPins = [7, 8, 9, 10, 11];

const redLamps = redLampPins.map(pin => new Gpio(pin, { mode: Gpio.OUTPUT }));
const greenLamps = greenLampPins.map(pin => new Gpio(pin, { mode: Gpio.OUTPUT }));


function activateLamp(lamp, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      lamp.digitalWrite(1); // Tänd lampan
      resolve();
    }, delay);
  });
}

function turnOffLamp(lamp, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      lamp.digitalWrite(0); // Släck lampan
      resolve();
    }, delay);
  });
}

async function beginRace() {
  // Tänd de röda lamporna en efter en med 1 sekunds fördröjning
  let delay = 1000;
  for (const redLamp of redLamps) {
    await activateLamp(redLamp, delay);
  }

  // Släck de röda lamporna en efter en med 1 sekunds fördröjning
  for (const redLamp of redLamps.reverse()) {
    await turnOffLamp(redLamp, 500); // Släck den röda lampan
  }

  // Tänd alla gröna lamporna samtidigt
  const greenLampPromises = greenLamps.map(greenLamp => activateLamp(greenLamp, 0));
  await Promise.all(greenLampPromises);
}

// Anropa funktionen för att börja racet
beginRace();