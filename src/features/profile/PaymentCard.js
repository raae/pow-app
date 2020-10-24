import React from "react"

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from "@material-ui/core"
import { Payment as PaymentIcon } from "@material-ui/icons"

import { PaymentForm } from "../payment"

const useStyles = makeStyles((theme) => ({
  avatar: {},
  listItem: {
    display: "flex",
    flexWrap: "wrap",
  },
}))

const PaymentCard = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <PaymentIcon />
          </Avatar>
        }
        title="Payment"
      />
      <CardContent>
        <PaymentForm />
      </CardContent>
    </Card>
  )
}

PaymentCard.propTypes = {}

export default PaymentCard
