import React, { Component } from 'react';
import classes from './Ingredient.module.css';
import PropTypes from 'prop-types';

class Ingridient extends Component {
    render() {
        let ingridient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                ingridient = <div className={classes.BreadBottom}></div>
                break;
            case ('bread-top'):
                ingridient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds1}></div>
                    </div>
                )
                break;
            case ('meat'):
                ingridient = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingridient = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingridient = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingridient = <div className={classes.Bacon}></div>
                break;
            default:
                ingridient = null;
        }

        return ingridient;
    }
}

Ingridient.propTypes={
    type: PropTypes.string.isRequired
}

export default Ingridient;