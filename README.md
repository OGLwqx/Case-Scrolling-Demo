# Case scrolling line | Demo

## Usage

Clone `src/Components` to your project folder to import the scrolling line frontend

Clone all functions and imports from `src/App.js` and styles from `src/App.css` to the main file of your project to control the scroll line

### Functions

```javascript
Animation(10, 5) // Start scrolling the line for 10 seconds at a speed of 5 pixels
```

### Creating a scroll line

```javascript
getBlocks(500) // Creates 500 empty blocks child to the element with the ID 'list'
getImages(500) // Adds a prize picture to each created block. Each created <img> has an id equal to "image-[prize_number]"
```
***After creating the line, you can get an array of all the items and their prize numbers in a variable named `items`***

---
Maybe I should have optimized some functions before publishing it to the opensource, sorry
