// ===============================================
// Question #4 Class Definition (Outside IIFE)
// ===============================================

class Car {

    // Constructor with parameters for 2 properties
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    // Method 1
    drive() {
        console.log(`${this.make} ${this.model} is now driving.`);
    }

    // Method 2
    stop() {
        console.log(`${this.make} ${this.model} is now stopping. `);
    }
}

// ==============================================
// IIFE (Immediately Invoked Function Expression)
// ==============================================
(() => {
    // --- Question #1 ----
    function question1() {
        console.log("--- Question #1 ---");
        const myArray = ["Apple", "Bannana", "Cherry", 10, 25];
        for (let i = 0; i < myArray.length; i++) {
            console.log(myArray[i]);
        }
    }


// --- Question #2 ---
function question2() {
    console.log("\n--- Question #2 ---");
    const myName = "Alex";
    const favFood = "Pizza";
    const stuff = [];


stuff.push(myName);
stuff.push(favFood);

for (let i = 0; i < stuff.length; i++) {
    console.log(stuff[i]);
}
}

// --- Question #3 ---
function question3() {
    console.log("\n--- Question #3 ---");
    const myChoiceArray = ["JavaScript", "HTML", "CSS", "React", "Node"];

    myChoiceArray.forEach((item) => {
        console.log(item);
    });
}

// --- Question #4 ---
function question4() {
    console.log("\n--- Question #4 ---");
    const myCar = new Car("Ford", "Mustang");

    // Display properties
    console.log(`Make: ${myCar.make}`);
    console.log(`Model: ${myCar.model}`);

    // Call Methods
    myCar.drive();
    myCar.stop();
}

// --- Question #5 ---
function question5() {
    console.log("\n--- Question #5 ---");
    const testArray = [1, 2, 5, 6, 9, 10, 14, 15];
    const results = [];

    const getEvenNumbers = (array) => {
        for (let i = 0; i < array.lenght; i++) {
            if (array[i] % 2 === 0) {
                results.push(array[i]);
            }
        }
        return results;
    };

    const evenNumbers = getEvenNumbers(testArray);
    console.log(evenNumbers);
}


// =========================================
// Function Calls
// =========================================
question1();
question2();
question3();
question4();
question5();
})();