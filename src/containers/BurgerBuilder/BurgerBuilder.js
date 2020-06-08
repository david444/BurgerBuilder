import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {   //modern approach
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngridients();
        //Only components loaded by route, will have the this.props.match properties,nested dont have them. If you wrap the component with the function 'withRoute', the properties will appear.
        // axios.get('https://react-my-burger-a36b6.firebaseio.com/ingridients.json')
        //     .then(response => {
        //         this.setState({ ingridients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    updatePurchaseState(ingridients) {
        const sum = Object.keys(ingridients)
            .map(igkey => {
                return ingridients[igkey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingridients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingridients can't be loaded</p> : <Spinner />
        if (this.props.ingridients) {
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ingridients} />
                    <BuildControls
                        ingridientAdded={this.props.onIngridientAdded}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingridients)}
                        price={this.props.totalPrice}
                        order={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingridients={this.props.ingridients}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice}
            />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.ingridients,
        totalPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngridientAdded: (ingridient) => dispatch(burgerBuilderActions.addIngridient(ingridient)),
        onIngridientRemoved: (ingridient) => dispatch(burgerBuilderActions.removeIngridient(ingridient)),
        onInitIngridients: ()=> dispatch(burgerBuilderActions.initIngridients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));