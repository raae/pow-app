import fetch from "node-fetch"

export default async function postNewPersonHandler(req, res) {
  // POST data to an authenticated API
  const url = "https://example.com/people"

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
  }

  const data = {
    name: req.body.name,
    occupation: req.body.occupation,
    age: req.body.age,
  }

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    }).then(res => {
      return res.json()
    })

    res.json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}