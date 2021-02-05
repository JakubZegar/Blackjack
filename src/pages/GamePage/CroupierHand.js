import React,{useState, useEffect} from 'react'
import {Card} from '../../components/Card';
import ReversableCard from '../../components/ReversableCard';

function CroupierHand(currentHand) {

    useEffect(() => {
        console.log("Długość: ", currentHand.currentHand.length);

        console.log("Przekazana ręka: ", currentHand);
    }, [currentHand])

    return (
        <>
            {
                currentHand.currentHand.length === 2 ? (
                    <>
                        <Card aversImage={currentHand.currentHand[0].image}/>
                        <ReversableCard aversImage={currentHand.currentHand[1].image} />
                    </>
                ) : (
                    currentHand.currentHand.map((card) => (
                        <Card aversImage={card.image}/>
                    ))
                )
            }
        </>
    )
}

export default CroupierHand