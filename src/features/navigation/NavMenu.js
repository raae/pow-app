import React from "react"
import PropTypes from "prop-types"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"

const NavMenu = ({ items, disabled, onClick }) => {
  return (
    <List>
      {items.map(({ icon, ...props }, index) => (
        <ListItem
          key={index}
          {...props}
          onClick={onClick}
          disabled={disabled}
          button
        >
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
