import React from "react"

import { useAuthActions, useAuthState } from "../auth"

function PokemonInfo({ pokemonName }) {
  const [status, setStatus] = React.useState("idle")
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const { updateUser } = useAuthActions()
  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus("pending")

    updateUser({ username: pokemonName }).then(
      (pokemonData) => {
        setStatus("resolved")
        setPokemon(pokemonData)
      },
      (errorData) => {
        setStatus("rejected")
        setError(errorData)
      }
    )
  }, [pokemonName])

  if (status === "idle") {
    const idleStatus = "Submit a pokemon"
    return "Submit a pokemon"
  }

  if (status === "rejected") {
    return "oh nooo... that username is already in use"
  }

  if (status === "pending") {
    return "..."
  }
  if (status === "resolved") {
    return <pre>{JSON.stringify(pokemon, null, 2)}</pre>
  }
}

function PokePony(status) {
  const [pokemonName, setPokemonName] = React.useState("")

  function handleSubmit(event) {
    event.preventDefault()
    setPokemonName(event.target.elements.pokemonName.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Pokemon Name</label>
        <div>
          <input disabled={status === "resolved"} id="pokemonName" />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <PokemonInfo pokemonName={pokemonName} />
    </div>
  )
}

export default PokePony
//disabled={status === "rejected" || status === "pending"}
//function fetchPokemon(pokemonName) {
// const pokemonQuery = `
//       query ($name: String) {
//         pokemon(name: $name) {
//           id
//           number
//           name
//           attacks {
//             special {
//               name
//               type
//               damage
//             }
//           }
//         }
//       }
//     `
// return window
//   .fetch("https://graphql-pokemon.now.sh", {
//     // learn more about this API here: https://graphql-pokemon.now.sh/
//     method: "POST",
//     headers: {
//       "content-type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify({
//       query: pokemonQuery,
//       variables: { name },
//     }),
//   })
//   .then((r) => r.json())
//   .then((response) => response.data.pokemon)
//}
