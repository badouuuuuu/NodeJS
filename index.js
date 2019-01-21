#!/usr/bin/env node

// Initiate npm modules
const axios = require('axios')
const validator = require('email-validator')
const ora = require('ora');
const chalk = require('chalk');
const figlet = require('figlet');

// Processing args for CLI
const [, , ...args] = process.argv
const email = validator.validate(`${args}`)


const url = `https://haveibeenpwned.com/api/v2/breachedaccount/${args}`


// ASCII Message
console.log(chalk.white.bold(figlet.textSync('Email   Breach   Checker! \n', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));



// Check if email enter in args is a valide email adress
if (email == true) {
    const spinner = ora(`Checking for Breach : ` + chalk.red(`${args}`));
    spinner.start();

    setTimeout(() => {
        spinner.color = 'red';
        spinner.text = chalk.red(`\nBreach found for : \n`) + chalk.yellow(`${args}\n`);


        axios({ // Axios request to haveibeenpwned.com
            method: 'get',
            url: url,
            headers: {
                'User-Agent': 'mailchecker-cli' // CLI name
            }
        }).then(res => {

            res.data.forEach(function (breach) { // Loop for each breach information

                console.log(chalk.red.bold('\nDomaine : ') +
                    chalk.italic(breach.Domain + '\n'));

                console.log(chalk.red.bold('Breach Date : ') +
                    chalk.italic(breach.BreachDate));

                console.log(chalk.red.bold('Description : ') +
                    chalk.yellow.italic(breach.Description));

                console.log(chalk.green('-----------------------------------\n'))

            })

            console.log(chalk.green('Github : ') + 'https://github.com/badouuuuuu\nCode by badouuuuuu for Becode.Org\n')


        }).catch(err => { //  Error logged
         
            if (err.response.status == 404) {
                console.log("\n-> No Breach Found, " + chalk.green("Youhou!\n"));
                console.log(chalk.italic('by badouuuuuu for Becode.Org\n'));
                console.log('Github : https://github.com/badouuuuuu');
            } else if (err.response.status == 403) {
                console.log(chalk.red('Api Error ') + 'contact @badouuuuuu on twitter \n');
            }

        })

        spinner.stop();

    }, 1000);






}