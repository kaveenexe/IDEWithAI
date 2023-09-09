const OpenAI = require("openai");
const HttpStatusCode = require("axios").HttpStatusCode;
const CONSTANTS = require("../CONSTANTS");

const openAIApiHandler = async (messageList) => {
  console.log(messageList);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: messageList,
    model: "gpt-3.5-turbo",
  });

  console.log(await chatCompletion);
  return chatCompletion;
};

const getAiChatResponse = async (req, res) => {
  //* get the messages from the request body
  const { userContent } = req.body;

  console.log(userContent);

  //* check if the messages length is greater than 0 and not null
  if (userContent !== null) {
    //* create a message list with the system prompt
    const messageList = [{ role: "system", content: CONSTANTS.SYSTEM_PROMPT }];

    messageList.push(userContent);
    //* push the messages to the message list

    const responseFromOpenAi = await openAIApiHandler(messageList);

    // messageList.push({ role: "assistant", content: responseFromOpenAi.choices[0].message.content });

    const responseFromServer = {
      text: responseFromOpenAi.choices[0].message.content,
    };

    return res.status(HttpStatusCode.Created).send(responseFromServer);
  } else {
    return res.status(HttpStatusCode.BadRequest).send("Invalid Request");
  }
};

module.exports = getAiChatResponse;
