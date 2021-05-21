import React from "react"
import PropTypes from "prop-types"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"

const NavMenu = ({ items, disabled, onClick }) => {
  return (
    <List>
      {items.map(({ icon, onClick: itemOnClick, ...item }, index) => (
        <ListItem
          key={index}
          {...item}
          onClick={() => {
            onClick && onClick()
            itemOnClick && itemOnClick()
          }}
          disabled={disabled}
          button
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText {...item} />
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
