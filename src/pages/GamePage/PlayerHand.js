import React,{useState, useEffect} from 'react'
import {Card} from '../../components/Card';

function PlayerHand(currentHand) {
    return (
        <>
            {
                currentHand.currentHand.map((card, index) => (
                    <Card key={index} aversImage={card.image}/>
                ))
            }
        </>
    )
}

export default PlayerHand
