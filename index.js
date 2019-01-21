#!/usr/bin/env node


// Initiate npm modules
const axios = require('axios')
const markdown = require('markdown-js')
const validator = require('email-validator')
const ora = require('ora');
const chalk = require('chalk');
const figlet = require('figlet');

const [, , ...args] = process.argv
const email = validator.validate(`${args}`)


const url = `https://haveibeenpwned.com/api/v2/breachedaccount/${args}`


console.log(chalk.white.bold(figlet.textSync('Email   Breach   Checker! \n', {
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));



if (email == true) {
    const spinner = ora(`Checking for Breach : ` + chalk.red(`${args}`));
    spinner.start();

    setTimeout(() => {
        spinner.color = 'red';
        spinner.text = chalk.red(`\nBreach found for : \n`) + chalk.yellow(`${args}\n`);


        axios({
            method: 'get',
            url: url,
            data: '',
            headers: {
                'User-Agent': 'mailcheckercli'
            }
        }).then(res => {

            res.data.forEach(function (breach) {

                console.log(chalk.red.bold('\nDomaine : ') +
                    chalk.italic(breach.Domain + '\n' ));

                console.log(chalk.red.bold('Breach Date : ') +
                    chalk.italic(breach.BreachDate));

                console.log(chalk.red.bold('Description : \n') +
                    chalk.yellow.italic(breach.Description));

                console.log(chalk.green('-----------------------------------\n'))

            })

            console.log(chalk.green('Github : ') + 'https://github.com/badouuuuuu\nby badouuuuuu for Becode.Org\n')
       
       
        }).catch(err => {

            if(err.response.status == 404) {

                console.log("\n-> No Breach Found, " +  chalk.green("Youhou!\n"));
                console.log(chalk.italic('by badouuuuuu for Becode.Org\n'));
                console.log('Github : https://github.com/badouuuuuu');
            }
       
        })

        spinner.stop();

    }, 2000);






}