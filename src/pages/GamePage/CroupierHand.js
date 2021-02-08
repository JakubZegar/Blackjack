import React from 'react'
import {Card} from '../../components/Card';
import ReversableCard from '../../components/ReversableCard';

function CroupierHand({currentHand, isReversed}) {

    return (
        <>
            {
                currentHand.length === 2 ? (
                    <>
                        <Card aversImage={currentHand[0].image}/>
                        <ReversableCard aversImage={currentHand[1].image} isReversed={isReversed}/>
                    </>
                ) : (
                    currentHand.map((card, index) => (
                        <Card key={index} aversImage={card.image}/>
                    ))
                )
            }
        </>
    )
}

export default CroupierHand