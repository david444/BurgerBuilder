import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingridients = [];
    for (let ingridientName in props.ingridients) {
        ingridients.push({
            name: ingridientName,
            amount: props.ingridients[ingridientName]
        })
    }

    const ingridientOutput = ingridients.map(ig => {
        return <span key={ig.name} style={{ 
            textTransform: 'capitalize', 
            display: 'inline-block', 
            margin: '0 8px', 
            border: '1px solid #ccc', 
            padding: '5px' }}>
                {ig.name} ({ig.amount}) </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingridients: {ingridientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong> </p>
        </div>
    );
};

export default order;