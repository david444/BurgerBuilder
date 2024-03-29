import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong> {props.price.toFixed(2)} </strong></p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingridientAdded(ctrl.type)}
                removed={() => props.ingridientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        })}
        <button
            disabled={!props.purchaseable}
            className={classes.OrderButton}
            onClick={props.order}>{props.isAuth? 'Order now': 'Sign up to order'}
        </button>
    </div>
)

export default buildControls;