import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardContent, CardHeader, Typography} from "@material-ui/core"

const DangerCard = () => {
  return (
     <Card>
       <CardHeader title="Danger Zone"/>
      <CardContent>
        <Typography gutterBottom>Add some explanatory text!</Typography>
        <Button variant="outlined" color="primary">Delete data</Button></CardContent>
    </Card>
  );
};

DangerCard.propTypes = {};

export default DangerCard;