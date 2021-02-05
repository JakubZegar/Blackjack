import React,{useState, useEffect} from 'react'
import Spinner from '../../components/Spinner'
import {mainLink, newDeckShuffledLink, drawOneCardLink, drawTwoCardsLink, decksCount, reshuffleDeckLink} from '../../assets/const'
import { ActionButtonContainer, CroupierHandContainer, HandsContainer, PointsContainer, PointsValue, UserHandContainer } from './GameElements';
import CroupierHand from './CroupierHand';
import PlayerHand from './PlayerHand';
import { DivButton } from '../../components/Button'

function Game(loadSavedGame) {
    const [isDeckLoaded, setIsDeckLoaded] = useState(false);
    const [deck, setDeck] = useState({});

    const [playerHand, setPlayerHand] = useState([]);
    const [croupierHand, setCroupierHand] = useState([]);

    const [playerPoints, setPlayerPoints] = useState(0);
    const [croupierPoints, setCroupierPoints] = useState(0);

    const [playerOptionalPoints, setPlayerOptionalPoints] = useState(0);
    const [showPlayerOptionalPoints, setShowPlayerOptionalPoints] = useState(false);

    const [croupierOptionalPoints, setCroupierOptionalPoints] = useState(0);
    const [showCroupierOptionalPoints, setShowCroupierOptionalPoints] = useState(false);

    const [enableDrawingCardsForPlayer, setEnableDrawingCardsForPlayer] = useState(true);

    const [playerCurrentBalance, setPlayerCurrentBalance] = useState(1000);
    const [currentBet, setCurrentBet] = useState(0);

    useEffect(() => {
        createNewDeck();
        console.log("Jestem w pierwszym useEffect");
        return () => {
            //Save current progress
        }
    }, [])

    useEffect(() => {
        if (isDeckLoaded === true) {
            console.log("Talia: ", deck);
            draw(true, drawTwoCardsLink);
            draw(false, drawTwoCardsLink);
        }
    }, [deck])

    useEffect(() => {
        setPlayerPoints(() => {return 0})
        setPlayerOptionalPoints(() => {return 0})

        playerHand.map((card) => (
            card.value === "JACK" || card.value === "KING" || card.value === "QUEEN" ? (
                setPlayerPoints((points) => { return points + 10 }),
                setPlayerOptionalPoints((points) => {return points + 10})
            ):
            card.value === "ACE" ? (
                setPlayerPoints((points) => { return points + 11 }), 
                setPlayerOptionalPoints((points) => {return points + 1 }),
                setShowPlayerOptionalPoints(() => {return true})
            ):(
                setPlayerPoints((points) => { return points + parseInt(card.value) }),
                setPlayerOptionalPoints((points) => {return points + parseInt(card.value)})
            )
        ))
    }, [playerHand])

    useEffect(() => {
        setCroupierPoints(() => {return 0})
        setCroupierOptionalPoints(() => {return 0})

        if (croupierHand.length === 2) {
            if(croupierHand[0].value === "JACK" || croupierHand[0].value === "KING" || croupierHand[0].value === "QUEEN" ) {
                setCroupierPoints((points) => { return points + 10 })
                setCroupierOptionalPoints((points) => { return points + 10 }) 
            } else if ( croupierHand[0].value === "ACE" ) {
                setCroupierPoints((points) => { return points + 11 })
                setCroupierOptionalPoints((points) => { return points + 1 })
                setShowCroupierOptionalPoints(() => {return true})
            } else {
                setCroupierPoints((points) => { return points + parseInt(croupierHand[0].value) })
                setCroupierOptionalPoints((points) => {return points + parseInt(croupierHand[0].value)})
            }
        } else {
            croupierHand.map((card) => (
                card.value === "JACK" || card.value === "KING" || card.value === "QUEEN" ? (
                    setCroupierPoints((points) => { return points + 10 }),
                    setCroupierOptionalPoints((points) => {return points + 10})
                ):
                card.value === "ACE" ? (
                    setCroupierPoints((points) => { return points + 11 }), 
                    setCroupierOptionalPoints((points) => {return points + 1 }),
                    setShowCroupierOptionalPoints(() => {return true})
                ):(
                    setCroupierPoints((points) => { return points + parseInt(card.value) }),
                    setCroupierOptionalPoints((points) => {return points + parseInt(card.value)})
                )
            ))
        }
    }, [croupierHand])

    useEffect(() => {
        if (playerPoints >= 21 && playerOptionalPoints >= 21) {
            setEnableDrawingCardsForPlayer(() => {return false})
        }
    }, [playerPoints])

    const createNewDeck = async () => {
        fetch(mainLink + newDeckShuffledLink + decksCount, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(responseData => {
                setIsDeckLoaded(() => { return true; })
                setDeck( () => { return {...responseData}; })
            })
            .catch(err => {
              console.log('error : ' + err);
            });    
    }

    const draw = async (forUser, howManyCards) => {
        fetch(mainLink + deck.deck_id + howManyCards, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(responseData => {
                if (forUser === true) {
                    setPlayerHand((currentPlayerHand) => { return [...currentPlayerHand, ...responseData.cards]; })
                } else {
                    setCroupierHand((currentCroupierHand) => { return [...currentCroupierHand, ...responseData.cards]; })
                }
            })
            .catch(err => {
              console.log('error : ' + err);
            });    
    }

    return (
        <>
            {
                isDeckLoaded === true ? (
                    <>
                        <HandsContainer>
                            <CroupierHandContainer>
                                {
                                    croupierHand.length > 0 ? (<CroupierHand currentHand={croupierHand}/>) : (<></>)
                                }
                            </CroupierHandContainer>
                            <PointsContainer>
                                <PointsValue>
                                {showCroupierOptionalPoints === false ? croupierPoints :
                                showCroupierOptionalPoints === true && croupierPoints > 21 ?
                                croupierOptionalPoints :
                                croupierPoints +'/'+ croupierOptionalPoints}
                                </PointsValue>
                            </PointsContainer>
                            <ActionButtonContainer>
                                <DivButton smallMargin={true} isEnabled={enableDrawingCardsForPlayer} onClick={() => {
                                    enableDrawingCardsForPlayer === true && draw(true, drawOneCardLink)
                                }}>Hit</DivButton>
                                <DivButton smallMargin={true}>Stand</DivButton>
                                <DivButton smallMargin={true}>Double</DivButton>
                                <DivButton smallMargin={true}>Bet</DivButton>
                            </ActionButtonContainer>
                            <PointsContainer>
                                <PointsValue>
                                    {showPlayerOptionalPoints === false ? playerPoints :
                                    showPlayerOptionalPoints === true && playerPoints > 21 ?
                                    playerOptionalPoints :
                                    playerPoints +'/'+ playerOptionalPoints}
                                </PointsValue>
                            </PointsContainer>
                            <UserHandContainer>
                                {
                                    playerHand.length > 0 ? (<PlayerHand currentHand={playerHand}/>) : (<></>)
                                }
                            </UserHandContainer>
                        </HandsContainer>
                    </>
                ) 
                : (<Spinner/>)
            }
        </>
    )
}

export default Game