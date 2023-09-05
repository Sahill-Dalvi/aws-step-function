const crypto = require("crypto");
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const valueToHash = event.value;
    const hashedValue = crypto
      .createHash("md5")
      .update(valueToHash, "utf8")
      .digest("hex");

    const dataToSend = {
      banner: "B00939343",
      result: hashedValue,
      arn: context.invokedFunctionArn,
      action: "md5",
      value: event.value,
    };

    const response = await axios.post(event.course_uri, dataToSend);
  } catch (error) {
    console.error("Error in md5 Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
