#!/usr/bin/env node


// Initiate npm modules
const axios = require('axios')
const markdown = require('markdown-js')
const validator = require('email-validator')
const ora = require('ora');


const [, , ...args] = process.argv
const email = validator.validate(`${args}`)


const url = `https://haveibeenpwned.com/api/v2/breachedaccount/${args}`

if (email == true) {
    const spinner = ora(`Checking for Breach :${args}`);
    spinner.start();

    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = `Checking
        for Breach on ${args}`;


        axios({
            method: 'get',
            url: url,
            data: '',
            headers: {
                'User-Agent': 'mailcheckercli'
            }
        }).then(res => {

            res.data.forEach(function(breach) {
                console.log('Domaine : \n' +
                    breach.Domain);
                console.log('Breach Date : \n' +
                    breach.BreachDate);
                console.log();
                console.log('Description : \n' +
                    breach.Description);
                console.log('----------------------------------- \n')

            })

            spinner.stop();
        }).catch(err => {
            const log = chalk.yellow(err)
            console.log(log)
        })



    }, 2000);






}