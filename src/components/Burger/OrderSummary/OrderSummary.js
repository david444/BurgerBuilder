import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    //this could be a functional component.
    componentWillUpdate(){
        console.log('[Order summary]: will update')
    }

    render() {
        const ingridientSummary = Object.keys(this.props.ingridients)
        .map(igKey => {
            return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingridients[igKey]}
            </li>);
        });
        return(
            <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p><strong> Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        )
    }
    
};

export default OrderSummary;
