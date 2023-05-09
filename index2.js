import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import {createInterface} from 'readline';
import {json} from './csvjson.js'
const readline = createInterface({
	input: process.stdin,
	output: process.stdout
  });
const sevicesName = json.map((item, index) => {
	return `{name:${item.NAME}}`});
const configuration = new Configuration({
    organization: "org-TmOr0IZbE4DrGNbqpnUiDCaP",
    apiKey: '',
});
const openai = new OpenAIApi(configuration);
const userData = `
google Serach Key Worlds: divorce lawyer center
presonal info:{"location":"Texas","whatMatterRelated":"A contested divorce (both partners do not agree)","additionalQuestion":"Just want to know what to expect here in Texas with a divorce.  I get SSDI and work part-time.  All our assets are held jointly.  What can I use money-wise to get a fresh start."}`;
let messages1 =[{role: "system", content: `you are an intake manager in a law firm who tries to understand witch services in Texas is the bast for the user.
the services names is the value in property "name" in the flowing array: 
${sevicesName}
the user inseted these data to help you:
${userData}
ask the user questions to understand better which of the services is the batter for the user and print the service name only.
`},
{
	role: "user",
	content: "Hi?"
}];
let messages =[{role: "system", content: `you are an intake manager in a law firm who tries to understand witch services in Texas is the bast for the user.
the services names is the value in property "name" in the flowing array: 
${sevicesName}
give the user list of 4 yes/no questions in a simplified language to understand which of the services is the batter for the user.
`},
{
	role: "user",
	content: "Hi?"
}];
const x =  async () =>{
	const {data}  = await openai.createChatCompletion({
		"model": "gpt-3.5-turbo",
		messages: messages
	});
	messages.push(data.choices[0].message);
	return data.choices[0].message;
}
const readLineAsync = msg => {
	return new Promise(resolve => {
	  readline.question(msg, userRes => {
		resolve(userRes);
	  });
	});
  }
const startApp = async() => {
	while(1){
	const assistantMes = await x();
	const userRes = await readLineAsync(`${assistantMes.role}:\n ${assistantMes.content}\n----\nuser: `);
	messages.push({role:"user",content:userRes})
	}
}
startApp()
