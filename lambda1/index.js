const crypto = require("crypto");
const axios = require("axios");

exports.handler = async (event, context) => {
  console.log(event);
  try {
    const valueToHash = event.value;
    const hashedValue = crypto
      .createHash("sha256")
      .update(valueToHash, "utf8")
      .digest("hex");

    const dataToSend = {
      banner: "B00939343",
      result: hashedValue,
      arn: context.invokedFunctionArn,
      action: "sha256",
      value: event.value,
    };

    const response = await axios.post(event.course_uri, dataToSend);
    console.log(response.data);
  } catch (error) {
    console.error("Error in sha256 Lambda:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
};
