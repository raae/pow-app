import React from "react"
import PropTypes from "prop-types"
import { Box, Card, CardContent, Typography } from "@material-ui/core"
import AppPage from "./AppPage"
import AppEditToolbar from "./AppEditToolbar"

const AppPageForm = ({
  className,
  title,
  description,
  onSubmit,
  onReset,
  disabled,
  children,
}) => {
  return (
    <form className={className} onSubmit={onSubmit} onReset={onReset}>
      <AppPage>
        <Card elevation={1} variant="elevation">
          <CardContent>{children}</CardContent>
        </Card>

        {description && (
          <Box marginX={5} marginY={3}>
            {description}
          </Box>
        )}

        <AppEditToolbar disabled={disabled}>
          <Typography variant="h6">{title}</Typography>
        </AppEditToolbar>
      </AppPage>
    </form>
  )
}

AppPageForm.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default AppPageForm
