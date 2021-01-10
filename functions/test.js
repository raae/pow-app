exports.handler = async (event, context) => {
  const { payload } = JSON.parse(event.body)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello TEST" }),
  }
}
