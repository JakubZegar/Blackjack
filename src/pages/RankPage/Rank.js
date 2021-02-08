import React,{useEffect, useState} from 'react'
import { Button } from '../../components/Button';
import { HeaderText, RankHeaders, Points, RankListContainer, BackButtonContainer } from './RankElements';

function Rank() {

    const [rank, setRank] =  useState(JSON.parse(localStorage.getItem("rank")));
    const [sortedRank, setSortedRank] = useState([])

    useEffect(() => {
        setSortedRank(rank.points.sort(function(a, b) {
            return b - a;
          }))
    }, [rank])

    useEffect(() => {
        console.log(sortedRank);
    }, [sortedRank])

    return (
        <>
            <BackButtonContainer>
                <Button to="/">Back</Button>
            </BackButtonContainer>
            <RankListContainer>
                <RankHeaders>
                    <HeaderText>Ranking: </HeaderText>
                    {
                        sortedRank.map((points, index) => {
                            return <Points key={index}>{index + 1}.  {points} points</Points>
                        })
                    }
                </RankHeaders>
            </RankListContainer>
        </>
    )
}

export default Rank
