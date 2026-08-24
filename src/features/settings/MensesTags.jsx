import React from "react"
import PropTypes from "prop-types"

import { useSettings } from "./useSettings"

export const MensesTags = ({ withMainTag }) => {
  const { mainMensesTag, mensesTags } = useSettings()
  return mensesTags
    .filter((tag) => tag !== mainMensesTag || withMainTag)
    .map((tag, index, restTags) => {
      const tagJsx = <strong key={index}>{tag}</strong>
      if (index === 0) {
        return tagJsx
      } else if (index < restTags.length - 1) {
        return [", ", tagJsx]
      } else {
        return [" and ", tagJsx]
      }
    })
}

MensesTags.propTypes = {
  withMainTag: PropTypes.bool,
}

MensesTags.defaultProps = {
  withMainTag: false,
}
