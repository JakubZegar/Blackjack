import React,{useState, useEffect} from 'react'
import {Card} from '../../components/Card';
import ReversableCard from '../../components/ReversableCard';

function CroupierHand({currentHand, isReversed}) {

    useEffect(() => {
        console.log("Przekazana ręka: ", currentHand);
        console.log("długość: ", isReversed);
    }, [currentHand])

    return (
        <>
            {
                currentHand.length === 2 ? (
                    <>
                        <Card aversImage={currentHand[0].image}/>
                        <ReversableCard aversImage={currentHand[1].image} isReversed={isReversed}/>
                    </>
                ) : (
                    currentHand.map((card) => (
                        <Card aversImage={card.image}/>
                    ))
                )
            }
        </>
    )
}

export default CroupierHand