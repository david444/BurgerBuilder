import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGRIDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    state = {   //modern approach
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4
    }

    addIngridientHandler=(type)=>{
        const oldCount = this.state.ingridients[type];
        const updateCount = oldCount+1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type]= updateCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingridients:updatedIngridients});
    }

    removeIngridientHandler=(type)=>{
        const oldCount = this.state.ingridients[type];
        if(oldCount<=0)
            return;
        const updateCount = oldCount-1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type]= updateCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingridients:updatedIngridients});
    }

    render() {
        const disabledInfo={
            ...this.state.ingridients
        }
        for (const key in disabledInfo) {
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls 
                ingridientAdded={this.addIngridientHandler} 
                ingridientRemoved={this.removeIngridientHandler}
                disabled={disabledInfo} 
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;