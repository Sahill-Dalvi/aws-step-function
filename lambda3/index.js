const bcrypt = require("bcryptjs");
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const valueToHash = event.value;
    const saltRounds = 12;
    const hashedValue = await bcrypt.hash(valueToHash, saltRounds);

    const dataToSend = {
      banner: "B00939343",
      result: hashedValue,
      arn: context.invokedFunctionArn,
      action: "bcrypt",
      value: event.value,
    };

    const response = await axios.post(event.course_uri, dataToSend);
    console.log(response.data);
  } catch (error) {
    console.error("Error in bcrypt Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
