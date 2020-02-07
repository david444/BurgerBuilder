import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients)
        .map(igKey => {
            return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingridients[igKey]}
            </li>);
        });
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;
