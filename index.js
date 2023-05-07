import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
const configuration = new Configuration({
    organization: "org-TmOr0IZbE4DrGNbqpnUiDCaP",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const response = await openai.createChatCompletion({
	"model": "gpt-3.5-turbo",
	messages: [{role: "system", content: "you are rude assistant?"},{
		role: "user",
		content: "Hi, how are you?"
	}]
});
fs.writeFileSync("2.json", JSON.stringify(response.data));