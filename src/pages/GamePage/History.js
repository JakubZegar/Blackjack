import React from 'react'
import { SmallCard } from '../../components/Card'
import { HistoryLabel, PlayerHandSmall, CroupierHandSmall, Round, SmallHandLabel, RoundLabel } from './HistoryElements'

function History({history}) {
    return (
        <>
            <HistoryLabel>Game history</HistoryLabel>
            {
                history.map((round, index) =>{
                    return <Round>
                        <RoundLabel>Round {index + 1}</RoundLabel>
                        <PlayerHandSmall>
                            {
                                round[0].map((card) => {
                                    return <SmallCard aversImage={card.image} />
                                })
                            }
                            <SmallHandLabel>P</SmallHandLabel>
                        </PlayerHandSmall>

                        <CroupierHandSmall>
                            {
                                round[1].map((card) => {
                                    return <SmallCard aversImage={card.image} />
                                })
                            }
                            <SmallHandLabel>C</SmallHandLabel>
                        </CroupierHandSmall>
                    </Round>
                })
            }
        </>
    )
}

export default History
