const initDatabases = ({ user, databases, dispatch, userbase }) => {
  databases.forEach(({ databaseName }) => {
    dispatch({ type: "open", databaseName })
    userbase
      .openDatabase({
        databaseName,
        changeHandler: (items) => {
          console.log("Database changed", databaseName)
          dispatch({ type: "changed", databaseName, items })
        },
      })
      .then(() => {
        console.log("Database opened", databaseName)
        dispatch({ type: "openFulfilled", databaseName })
      })
      .catch((error) => {
        console.log("Database failed to opened", databaseName, error.message)
        dispatch({ type: "openFailed", databaseName, error })
      })
  })
}

export default initDatabases
