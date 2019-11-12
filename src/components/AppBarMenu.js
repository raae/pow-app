import React from "react"
import { Button, IconButton } from "@material-ui/core"

const AppBarMenu = ({ items = [], ...props }) => (
  <>
    {items.map(({ label, icon, ...itemProps }, key) =>
      !icon ? (
        <Button key={key} color="inherit" {...itemProps}>
          {label}
        </Button>
      ) : (
        <IconButton key={key} color="inherit" {...itemProps}>
          {icon}
        </IconButton>
      )
    )}
  </>
)

export default AppBarMenu
