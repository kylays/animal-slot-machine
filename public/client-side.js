/**
 * NAME: Kyla Yu-Swanson
 * DATE: June 2, 2022
 * 
 * This is the client side JS file for the animal slot machine. It handles button 
 * click events, web page load events, and win/lose events.
 */

(function () {
  "use strict";

  const BASE_URL = '/';
  const NUM_IMAGES = 3;

  /**
   * Runs the needed functions for the website upon starting.
   */
  function init() {
    qs('main > button').addEventListener("click", newGame);
    newGame();
  }

  /**
   * This function removes all child nodes from a DOM parent node.
   * @param {DOMElement} parent - the parent node to remove all children from
   */
    function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  /**
   * Displays an error message on the page using the message given to the Error.
   * @param {Error} - error object with error message.
   */
    function handleError(err) {
      id('msg').textContent = "Something went wrong: " + err.message;
  }

  /**
   * Fetches JSON data from the given URL.
   * @param {string} url - the URL to fetch
   * @returns {JSON} - the data obtained
   */
  async function getJSONData(url) {
    try {
      let resp = await fetch(url);
      resp = checkStatus(resp);
      const data = await resp.json();
      return data;
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Fetches text data from the given URL.
   * @param {string} url - the URL to fetch
   * @returns {string} - the data obtained
   */
  async function getTextData(url) {
    try {
      let resp = await fetch(url);
      resp = checkStatus(resp);
      const data = await resp.text();
      return data;
    } catch (err) {
      handleError(err);
    }
  }

  /**
    Completes a new round of the slot machine game by getting new images and 
    displaying a win/lose message.
    */
  async function newGame() {
    id('msg').textContent = '';
    removeAllChildNodes(qs('main > section'));
    let chosen = [];
    for (let i = 0; i < NUM_IMAGES; i++) {
      let animal = await getTextData(BASE_URL + 'animal/random');
      chosen.push(animal);
      let animalData = await getJSONData(`${BASE_URL}animals/${animal}`);
      let figure = gen('figure');
      let img = gen('img');
      img.src = `imgs/${animalData.image}`;
      img.alt = "picture of " + animalData.name;
      img.addEventListener('click', () => {
        id('msg').textContent = animalData.description;
      });
      figure.appendChild(img);
      let figcaption = gen('figcaption');
      figcaption.textContent = 'Genus: ' + animalData.genus + ', Common: ' + animalData.name;
      figure.appendChild(figcaption);
      qs('main > section').appendChild(figure);
    }

    if (chosen[0] === chosen[1] && chosen[2] === chosen[1]) {
      id('msg').textContent = 'Congrats! You won $1000!';
    } else {
      id('msg').textContent = 'You lost. Try again :(';
    }
  }

  init();
})();
