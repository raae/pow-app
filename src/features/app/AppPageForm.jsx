import React from "react"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import AppPage from "./AppPage"
import AppEditToolbar from "./AppEditToolbar"

const AppPageForm = ({
  className,
  title,
  onSubmit,
  onReset,
  disabled,
  children,
}) => {
  return (
    <form className={className} onSubmit={onSubmit} onReset={onReset}>
      <AppPage withPaper>{children}</AppPage>
      <AppEditToolbar disabled={disabled}>
        <Typography variant="h6">{title}</Typography>
      </AppEditToolbar>
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
