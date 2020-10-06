import { Link } from "gatsby"
import React from "react"

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/beers">🍻</Link>
        </li>
      </ul>
    </nav>
  )
}
