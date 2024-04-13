#! /usr/bin/env node

import inquirer from "inquirer";  // Inquirer for CLI prompts

import chalk from "chalk";     // Chalk for styling CLI output



// Display welcome message with styled text

console.log(chalk.gray("\n\n*****************************"), chalk.bold.cyan.underline("Welcome to the currency convertor!"), chalk.gray("*****************************\n\n"))


// Define currency conversion rates

let currencyConvertor = {

    "PKR": {
        "USD": 0.0036,
        "GBP": 0.0029,
        "EUR": 0.0034,
        "JPY": 0.55,
        "AUD": 0.0056,
        "CAD": 0.0050,
        "CHF": 0.0033,
        "PKR": 1,
    },

    "USD": {
        "PKR": 277.83,
        "GBP": 0.80,
        "EUR": 0.94,
        "JPY": 152.93,
        "AUD": 1.55,
        "CAD": 1.38,
        "CHF": 0.91,
        "USD": 1,
    },

    "GBP": {
        "PKR": 345.45,
        "USD": 1.24,
        "EUR": 1.17,
        "JPY": 190.17,
        "AUD": 1.92,
        "CAD": 1.71,
        "CHF": 1.13,
        "GBP": 1,
    },

    "EUR": {
        "PKR": 295.30,
        "USD": 1.06,
        "GBP": 0.85,
        "JPY": 162.65,
        "AUD": 1.64,
        "CAD": 1.46,
        "CHF": 0.97,
        "EUR": 1,
    },

    "JPY": {
        "PKR": 1.82,
        "USD": 0.0065,
        "GBP": 0.0053,
        "AUD": 0.0010,
        "CAD": 0.0090,
        "CHF": 0.0060,
        "EUR": 0.0061,
        "JPY": 1,
    },

    "AUD": {
        "PKR": 179.75,
        "USD": 0.65,
        "GBP": 0.52,
        "EUR": 0.61,
        "JPY": 98.95,
        "CAD": 0.89,
        "CHF": 0.59,
        "AUD": 1,
    },

    "CAD": {
        "PKR": 201.90,
        "USD": 0.73,
        "GBP": 0.58,
        "EUR": 0.68,
        "JPY": 111.10,
        "CHF": 0.66,
        "AUD": 1.12,
        "CAD": 1,
    },

    "CHF": {
        "PKR": 305.53,
        "USD": 1.10,
        "GBP": 0.88,
        "EUR": 1.03,
        "JPY": 167.85,
        "AUD": 1.70,
        "CAD": 1.51,
        "CHF": 1,
    },
}


// Function to handle currency conversion

async function convertCurrencyAmount() {

    const answer: {
        from: "PKR" | "USD" | "GBP" | "EUR" | "JPY" | "AUD" | "CAD" | "CHF",
        to: "PKR" | "USD" | "GBP" | "EUR" | "JPY" | "AUD" | "CAD" | "CHF",
        amount: number,
    } = await inquirer.prompt([
        {
            type: "list",
            name: "from",
            message: chalk.yellow.bgBlack.bold("Please select your currency? \n\n"),
            choices: ["PKR", "USD", "GBP", "EUR", "JPY", "AUD", "CAD", "CHF"],
        },
        {
            type: "list",
            name: "to",
            message: chalk.yellow.bgBlack.bold("To which currency would you like to convert? \n\n"),
            choices: ["PKR", "USD", "GBP", "EUR", "JPY", "AUD", "CAD", "CHF"],
        },
        {
            type: "number",
            name: "amount",
            message: chalk.black.bgWhite.bold("Enter the amount to convert:"),
        },
    ]
    );


    const { from, to, amount } = answer;
    if (from && to && amount) {

        // Perform currency conversion

        let result = currencyConvertor[from][to] * amount;

        // Display converted amount

        console.log(chalk.greenBright(`\n\nYour ${amount} ${from} is converted to ${to}. The converted amount is ${result}`));
    }
    else {
        console.log(chalk.red.bgBlack("Please enter valid input"));
    }
};

// Function to handle repeated conversions

async function startAgain() {

    let continueConversion = true;


    while (continueConversion) {

        await convertCurrencyAmount();

        const continueous = await inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: chalk.black("Would you like to convert another amount?\n\n"),
            },
        ]);

        continueConversion = continueous.continue;
    }

    console.log(chalk.yellow.bgBlack("Thank you for using the currency convertor!"));

};

// Start the currency converter application

startAgain();

