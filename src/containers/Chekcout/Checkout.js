import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingridients: null,
        totalPrice: 0

    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingridients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = +param[1];
            }
            else {
                ingridients[param[0]] = +param[1];
            }
        }
        this.setState({ ingridients, totalPrice });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingridients={this.state.ingridients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingridients={this.state.ingridients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;