import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {   //modern approach
        purchasing: false
    }

    componentDidMount() {
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
        if(this.props.isAuthenticated)
            this.setState({ purchasing: true });
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
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
                        isAuth={this.props.isAuthenticated}
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
        ingridients: state.burgerBuilder.ingridients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngridientAdded: (ingridient) => dispatch(actions.addIngridient(ingridient)),
        onIngridientRemoved: (ingridient) => dispatch(actions.removeIngridient(ingridient)),
        onInitIngridients: ()=> dispatch(actions.initIngridients()),
        onInitPurchased: ()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));