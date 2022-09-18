import React, { useEffect } from 'react'
import 'assets/css/captcha.css';

const Captcha = ({setCaptchaPassStatus}) => {
    useEffect(() => {
        const cellCount = 25;
        const imgBasePath = "/images/image_part_";

        /*
          ------------------------------------------------
          VARIABLES
          ------------------------------------------------
        */
        var targetObj = {};
        var missingId = 12;
        var trueCoordinates;
        var cellPointer;

        /*
          ------------------------------------------------
          DOM ELEMENTS
          ------------------------------------------------
        */
        const grid = document.querySelector("#puzzle-grid");
        const slider = document.querySelector("#slider-input");
        const sliderFill = document.querySelector("#slide-fill");
        const successButton = document.querySelector("#success");

        successButton.disabled = true;

        /*
          ------------------------------------------------
          SCRIPT
          ------------------------------------------------
        */

        // 1.0 Programmatically append cells to the grid.
        for (let i = 0; i < [...Array(cellCount)].length; i++) {
            let cell = document.createElement("div");
            cell.id = `${i + 1}`;
            cell.classList.add("cell");
            cell.style.backgroundImage = `url(${imgBasePath}${i + 1}.png)`;
            grid.appendChild(cell);
        }

        // 2.0 Query for all cells
        const cells = grid.querySelectorAll("div.cell");

        createPuzzle();

        /*
          ------------------------------------------------
          VARIABLE LISTENER
          ------------------------------------------------
        */

        // We use a targetProxy to watch when a variable changes
        const targetProxy = new Proxy(targetObj, {
            set: function (target, key, value) {
                evaluateSuccess(value);
                target[key] = value;
                return true;
            },
        });

        /*
          ------------------------------------------------
          EVENT LISTENERS
          ------------------------------------------------
        */

        slider.addEventListener("input", (event) => {
            const sliderValue = event.target.value;
            cellPointer.style.left = `${sliderValue}%`;
            sliderFill.style.width = `calc(${sliderValue}% + 15px)`;
            const isPositioned = evaluateCoordinates(cellPointer, trueCoordinates, 15);

            if (isPositioned) {
                successButton.disabled = false;
                cellPointer.classList.add("positioned");
            } else {
                successButton.disabled = true;
                cellPointer.classList.remove("positioned");
            }
        });

        successButton.addEventListener("click", () => {
            targetProxy.isSuccess = true;
        });


        /*
          ------------------------------------------------
          FUNCTIONS
          ------------------------------------------------
        */

        /* 
          @desc calculates the coordinates of an HTML element. 
          @param  {HTMLElement}  element The DOM object of the element
          @return {Object}               An object that specifies the element's left, right, bottom, top coordinates.      
        */
        function calculateCoordinates(element) {
            let rect = element.getBoundingClientRect();

            const bounding = {
                left: rect.left,
                right: rect.right,
            };

            return bounding;
        }

        /* 
          @desc generates a random number from a range excluding a specified set of numbers
          @param  {Number}          floor             The minimum number that this function will generate
          @param  {Number}          ceiling           The maximum number that this function will generate
          @param  {Array<Number>}   notAcceptedArray  An array of numbers that will not be randomly generated.
          @return {Number}                            Randomized number || 12
        */
        function generateRandom(floor, ceiling, notAcceptedArray) {
            // If bad input, just return 12
            if (typeof floor !== "number" || typeof ceiling !== "number") return 12;

            let random = Math.floor(Math.random() * ceiling) + floor;

            while (notAcceptedArray.includes(random)) {
                random = Math.floor(Math.random() * ceiling) + floor;
            }

            return random;
        }

        /* 
          @desc evaluates an element's coordinates to see if it matches the target coordinates. 
          @param  {HTMLElement}     element             The element whose coordinates are being evaluated
          @param  {Object}          targetCoordinates   The coordinates object we will evaluate against
          @param  {Number}          offset              Allowance for mismatched coordinates
          @return {Boolean}                             Returns true if coordinates are equal (with offset)
        */
        function evaluateCoordinates(element, targetCoordinates, offset) {
            const elmCoordinates = calculateCoordinates(element);
            if (
                Object.keys(elmCoordinates).length === Object.keys(targetCoordinates).length
            ) {
                return Object.keys(elmCoordinates).every(
                    (key) =>
                        elmCoordinates[key] > targetCoordinates[key] - offset &&
                        elmCoordinates[key] < targetCoordinates[key] + offset
                );
            }

            return false;
        }

        /* 
          @desc evaluates the isSuccess variable, and show/hides modal. 
          @param  {Booelan}   boolean  Either true or false
          @return () => void                             
        */
        function evaluateSuccess(boolean) {
            if (boolean) {
                setCaptchaPassStatus(true);
            } else {
                setCaptchaPassStatus(false);
            }
        }

        /* 
          @desc creates the puzzle by selecting a random puzzle piece, and creating a pointer. 
          @return () => void                             
        */
        function createPuzzle() {
            resetPuzzle();

            // Randomly "pick" a cell
            missingId = generateRandom(1, cellCount, [1, 6, 11, 16, 21]) - 1;
            cells[missingId].classList.add("missing");

            // Store value of coordinates for "picked" cell -- this is what we will use to evaluate
            trueCoordinates = calculateCoordinates(cells[missingId]);

            // Create cell pointer
            cellPointer = document.createElement("div");
            cellPointer.id = "pointer";
            cellPointer.style.top = `${cells[missingId].offsetTop}px`;
            cellPointer.style.backgroundImage = `url(${imgBasePath}${missingId + 1}.png)`;
            cellPointer.classList.add("cell");

            // Append cell pointer to grid
            grid.appendChild(cellPointer);
        }

        /* 
          @desc resets UI components
          @return () => void                             
        */
        function resetPuzzle() {
            if (cellPointer) cellPointer.remove();
            slider.value = 0;
            sliderFill.style.width = `calc(${0}% + 5px)`;
            successButton.disabled = true;

            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("missing");
            }
        }
    }, [setCaptchaPassStatus])

    return (
        <div className="puzzle__card">           
            <div id="puzzle-container">
                <div id="puzzle-grid"></div>
                <div className="slide-container">
                    <span id="slide-fill"></span>
                    <span id="call-action">Slide {'>'}{'>'}{'>'}{'>'}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        className="slider"
                        id="slider-input"
                    />
                </div>
                <div className="button-container">
                    <button className="button" id="success">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Captcha