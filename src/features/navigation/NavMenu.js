import React from "react"
import PropTypes from "prop-types"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"

const NavMenu = ({ items, onClick }) => {
  return (
    <List>
      {items.map(({ icon, ...props }, index) => (
        <ListItem key={index} button {...props} onClick={onClick}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText {...props} />
        </ListItem>
      ))}
    </List>
  )
}

NavMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string,
      icon: PropTypes.element,
    })
  ),
}

export default NavMenu
