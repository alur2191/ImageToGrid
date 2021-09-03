const sharp = require('sharp')
var sizeOf = require('image-size');
// original image
let originalImage = 'test.jpeg';

(async function () {
  try {
    var dimensions = sizeOf('test.jpeg');
    let width = Math.floor(dimensions.width);
    let height = Math.floor(dimensions.height);
    let peiceWidth = Math.floor(width / 3);
    let peiceHeight = Math.floor(height / 4);

    let count = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        // NEED TO SAVE TO BUFFER TO PASS TO IPFS

        await sharp(originalImage).extract({ width: peiceWidth, height: peiceHeight, left: j * peiceWidth, top: i * peiceHeight }).toFile(`croppedImage${count}.jpg`)
        count++;

        const buffer = await sharp(originalImage)
          .extract({ width: peiceWidth, height: peiceHeight, left: j * peiceWidth, top: i * peiceHeight })
          .toBuffer()
          .then(data => { })
          .catch(err => { });
      }
    }
  } catch (error) {
    console.log(error)
  }
})()

