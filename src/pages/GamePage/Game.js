import React,{useState, useEffect} from 'react'
import Spinner from '../../components/Spinner'
import {mainLink, newDeckShuffledLink, drawOneCardLink, drawTwoCardsLink, decksCount, reshuffleDeckLink} from '../../assets/const'
import { ActionButtonContainer, Balance, BalanceContainer, Message, BalanceText,BetCoin,BetConiText,BetText, CroupierHandContainer,GameScreenContainer, HandsContainer, OptionsContainer, PointsContainer, PointsValue, UserHandContainer, HistoryContainer, Placeholder } from './GameElements';
import CroupierHand from './CroupierHand';
import PlayerHand from './PlayerHand';
import History from './History';
import { DivButton } from '../../components/Button'
import { Button } from '../../components/Button'

function Game() {
    const [isDeckLoaded, setIsDeckLoaded] = useState(false);
    const [deck, setDeck] = useState({});

    const [playerHand, setPlayerHand] = useState([]);
    const [croupierHand, setCroupierHand] = useState([]);

    const [gameHistory, setGameHistory] = useState([]);

    const [playerPoints, setPlayerPoints] = useState(0);
    const [croupierPoints, setCroupierPoints] = useState(0);

    const [playerOptionalPoints, setPlayerOptionalPoints] = useState(0);
    const [showPlayerOptionalPoints, setShowPlayerOptionalPoints] = useState(false);

    const [croupierOptionalPoints, setCroupierOptionalPoints] = useState(0);
    const [showCroupierOptionalPoints, setShowCroupierOptionalPoints] = useState(false);

    const [enableDrawingCardsForPlayer, setEnableDrawingCardsForPlayer] = useState(true);
    const [playerRoundEnded, setPlayerRoundEnded] = useState(false);

    const [playerCurrentBalance, setPlayerCurrentBalance] = useState(1000);
    const [currentBet, setCurrentBet] = useState(0);

    const [reverseCroupierCard, setReverseCroupierCard] = useState(false);

    const [roundCounter, setRoundCounter] = useState(1);

    const [placeBet, setPlaceBet] = useState(true);

    const [message, setMessage] = useState("Place your bet");
    const [showBetButton, setShowBetButton] = useState(true);

    const [goingForDouble, setGoingForDouble] = useState(false);

    const [winnerList, setWinnerList] = useState([])

    const [loadingSavedGame, setLoadingSavedGame] = useState(false);


    let enableHitButton = enableDrawingCardsForPlayer === true && playerRoundEnded === false && placeBet === false;
    let enableStandButton = playerRoundEnded === false && enableDrawingCardsForPlayer === true && placeBet === false;
    let enableDoubleButton = playerHand.length === 2 && playerRoundEnded === false && placeBet === false && playerCurrentBalance >= currentBet;

    useEffect(() => {
        createNewDeck();
        return () => {
            //Save current progress
        }
    }, [])

    useEffect(() => {
        console.log(deck.deck_id);
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

        if (croupierHand.length === 2 && playerRoundEnded === false) {
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
    }, [croupierHand, playerRoundEnded])

    useEffect(() => {
        
        if (playerPoints > 21 && playerOptionalPoints > 21) {
            setEnableDrawingCardsForPlayer(() => {return false})
            setMessage("You lost");
            setTimeout(() => {
                computerWon();
            }, 2000);
        } else if (playerPoints === 21 || playerOptionalPoints === 21) {
            setMessage("Blackjack!")
            setEnableDrawingCardsForPlayer(() => {return false})
            setTimeout(() => {
                stand()
            }, 2000);
        } else {
            goingForDouble === true && stand();
        }
    }, [playerPoints])

    useEffect(() => {
        if ( ((playerRoundEnded === true && croupierPoints <= 16) || (croupierPoints > 21 && croupierOptionalPoints <= 16)) && croupierPoints !== 0) {
            setMessage("Computers turn");
            draw(false, drawOneCardLink);
        } else if (playerRoundEnded === true && croupierPoints !== 0) {
            let compareUserPoints;
            let compareCroupierPoints;
            if (playerPoints > 21 && (playerOptionalPoints > 0 && playerOptionalPoints <= 21) ) {
                compareUserPoints = playerOptionalPoints;
            } else {
                compareUserPoints = playerPoints;
            }

            if( croupierPoints > 21 && croupierOptionalPoints > 21){
                compareCroupierPoints = 0;
            } else if (croupierPoints > 21 && (croupierOptionalPoints > 0 && croupierOptionalPoints <= 21)) {
                compareCroupierPoints = croupierOptionalPoints;
            } else if (croupierPoints <= 21) {
                compareCroupierPoints = croupierPoints;
            }

            if( (21 - compareUserPoints) < (21 - compareCroupierPoints) ) {
                setMessage("You won")
                setTimeout(() => {
                    playerWon();
                }, 2000);
            } else if ((21 - compareUserPoints) > (21 - compareCroupierPoints)){
                setMessage("Computer won")
                setTimeout(() => {
                    computerWon();
                }, 2000);
            } else {
                setMessage("Draw")
                setTimeout(() => {
                    noWinner();
                }, 2000);
            }
        }
    }, [croupierPoints])

    useEffect(() => {
        if (placeBet === true) {
            setMessage("Place your bet");
            setShowBetButton(true);
        }
    }, [placeBet])

    useEffect(() => {
        console.log("RUNDA ", roundCounter);
        if ( roundCounter > 5 ) {
            endGame();
        } else if (roundCounter !== 1 && loadingSavedGame === false) {
            nextRound();
        } else {
            setLoadingSavedGame(false);
        }
    }, [roundCounter])

    const createNewDeck = () => {
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

    const draw = (forUser, howManyCards) => {
        console.log(deck.deck_id);

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

    const shuffleDeck = (deckId) => {
        fetch(mainLink + deckId + reshuffleDeckLink, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(responseData => {
                console.log("TASOWANIE", responseData);
                setIsDeckLoaded(() => { return true; })
                setDeck( () => { return {...responseData}; })
            })
            .catch(err => {
              console.log('error : ' + err);
            });    
    }

    const stand = () => {
        setReverseCroupierCard(() => {return true})
        setTimeout(() => {
            setPlayerRoundEnded(() => {return true})
            setEnableDrawingCardsForPlayer(() => {return false})    
        }, 250);
    }

    const double = () => {
        setGoingForDouble(true);
        setMessage("Going for double!")
        setPlayerCurrentBalance((balance) => {return balance - currentBet})
        setCurrentBet((bet) => {return bet+bet})
        draw(true, drawOneCardLink);
    }

    const startRound = () => {
        setPlayerRoundEnded(false);
        setEnableDrawingCardsForPlayer(true);
        setPlaceBet(false);
        setShowBetButton(false);
        setMessage("Your turn");
        if (isDeckLoaded === true) {
            draw(true, drawTwoCardsLink);
            draw(false, drawTwoCardsLink);
        }
    }

    const bet = (amount) => {
        if (playerCurrentBalance - amount >= 0) {
            setPlayerCurrentBalance((balance) => { return balance - amount});
            setCurrentBet((bet) => {return bet + amount})
        }
    }

    const playerWon = () => {
        setGameHistory((history) => {
            return [...history, [playerHand, croupierHand]]
        })
        setWinnerList((winners) => {return [...winners, "player"]})
        setPlayerCurrentBalance((balance) => {return balance + (currentBet * 1.5)})
        setRoundCounter((round) => {return round + 1});
    }

    const computerWon = () => {
        setGameHistory((history) => {
            return [...history, [playerHand, croupierHand]]
        })
        setWinnerList((winners) => {return [...winners, "computer"]})

        setRoundCounter((round) => {return round + 1});
    }

    const noWinner = () => {
        setGameHistory((history) => {
            return [...history, [playerHand, croupierHand]]
        })
        setWinnerList((winners) => {return [...winners, "draw"]})
        setPlayerCurrentBalance((balance) => {return balance + currentBet})
        setRoundCounter((round) => {return round + 1});
    }

    const nextRound = () => {
        setReverseCroupierCard(false);
        setGoingForDouble(false);
        setShowCroupierOptionalPoints(false);
        setShowPlayerOptionalPoints(false);
        setPlayerPoints(0);
        setPlayerOptionalPoints(0);
        setCroupierPoints(0);
        setCroupierOptionalPoints(0);
        setPlaceBet(true);
        setShowBetButton(true);
        setCurrentBet(0);
        setPlayerHand([]);
        setCroupierHand([]);
    } 

    const endGame = () => {
        setCurrentBet(0)
        setMessage("End of game")
    }

    const reset = () => {
        setIsDeckLoaded(false);
        shuffleDeck(deck.deck_id);
        nextRound();
        setRoundCounter(1);
        setGameHistory([]);
        setWinnerList([]);
        setPlayerCurrentBalance(1000);
    }

    const save = () => {

        localStorage.setItem("savedGame", JSON.stringify(
            {
                isDeckLoaded: isDeckLoaded,
                deck: deck,
                playerHand: playerHand,
                croupierHand: croupierHand,
                gameHistory: gameHistory,
                playerPoints: playerPoints,
                croupierPoints: croupierPoints,
                playerOptionalPoints: playerOptionalPoints,
                showPlayerOptionalPoints: showPlayerOptionalPoints,
                croupierOptionalPoints: croupierOptionalPoints,
                showCroupierOptionalPoints: showCroupierOptionalPoints,
                enableDrawingCardsForPlayer: enableDrawingCardsForPlayer,
                playerRoundEnded: playerRoundEnded,
                playerCurrentBalance: playerCurrentBalance,
                currentBet: currentBet,
                reverseCroupierCard: reverseCroupierCard,
                roundCounter: roundCounter,
                placeBet: placeBet,
                message: message,
                showBetButton: showBetButton,
                goingForDouble: goingForDouble,
                winnerList: winnerList
            }
        ));
    }

    const load = () => {
        setLoadingSavedGame(true);
        let gameSave = JSON.parse(localStorage.getItem('savedGame'));
        setDeck(gameSave.deck)
        setPlayerHand(gameSave.playerHand)
        setCroupierHand(gameSave.croupierHand)
        setGameHistory(gameSave.gameHistory)
        setPlayerPoints(gameSave.playerPoints)
        setCroupierPoints(gameSave.croupierPoints)
        setPlayerOptionalPoints(gameSave.playerOptionalPoints)
        setShowPlayerOptionalPoints(gameSave.showPlayerOptionalPoints)
        setCroupierOptionalPoints(gameSave.croupierOptionalPoints)
        setShowCroupierOptionalPoints(gameSave.showCroupierOptionalPoints)
        setEnableDrawingCardsForPlayer(gameSave.enableDrawingCardsForPlayer)
        setPlayerRoundEnded(gameSave.playerRoundEnded)
        setPlayerCurrentBalance(gameSave.playerCurrentBalance)
        setCurrentBet(gameSave.currentBet)
        setReverseCroupierCard(gameSave.reverseCroupierCard)
        setRoundCounter(gameSave.roundCounter)
        setPlaceBet(gameSave.placeBet)
        setMessage(gameSave.message)
        setShowBetButton(gameSave.showBetButton)
        setGoingForDouble(gameSave.goingForDouble)
        setWinnerList(gameSave.winnerList)
        setIsDeckLoaded(gameSave.isDeckLoaded)
    }

    return (
        <GameScreenContainer>
            {
                isDeckLoaded === true ? (
                    <>
                        <BalanceContainer>
                            <Button to={'/'}>Main menu</Button>

                            <DivButton isEnabled={true} onClick={() => reset()}>{message === "End of game" ? "New game" : "Reset"}</DivButton>

                            <DivButton isEnabled={message !== "End of game"} onClick={() => save()}>Save</DivButton>

                            <DivButton isEnabled={true} onClick={() => load()}>Load</DivButton>

                            <Balance>
                                <BalanceText>
                                    Balance: {playerCurrentBalance}
                                </BalanceText>
                            </Balance>
                            
                            <BetCoin enabled={!placeBet} onClick={() => placeBet && bet(10)}>
                                <BetConiText>10</BetConiText>
                            </BetCoin>
                            <BetCoin enabled={!placeBet} onClick={() => placeBet && bet(50)}>
                                <BetConiText>50</BetConiText>
                            </BetCoin>
                            <BetCoin enabled={!placeBet} onClick={() => placeBet && bet(100)}>
                                <BetConiText>100</BetConiText>
                            </BetCoin>
                            <BetCoin enabled={!placeBet} onClick={() => placeBet && bet(500)}>
                                <BetConiText>500</BetConiText>
                            </BetCoin>

                            <Balance>
                                <BetText>
                                    Current bet: {currentBet}
                                </BetText>
                            </Balance>
                        </BalanceContainer>

                        <HandsContainer>
                            <CroupierHandContainer>
                                {
                                    croupierHand.length > 0 ? (<CroupierHand currentHand={croupierHand} isReversed={reverseCroupierCard}/>) : (<Placeholder></Placeholder>)
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
                            <Message>{message}</Message>
                            {
                                showBetButton && <DivButton onClick={() => startRound()}>Start round</DivButton>
                            }
                            <ActionButtonContainer>
                                <DivButton smallMargin={true} isEnabled={enableHitButton} onClick={() => {
                                    enableHitButton && draw(true, drawOneCardLink)
                                }}>Hit</DivButton>
                                <DivButton smallMargin={true} isEnabled={enableStandButton} onClick={() => {
                                    enableStandButton && stand()
                                }}>Stand</DivButton>
                                <DivButton smallMargin={true} isEnabled={enableDoubleButton}  onClick={() => {
                                    enableDoubleButton && double()
                                }}>Double</DivButton>
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
                                    playerHand.length > 0 ? (<PlayerHand currentHand={playerHand}/>) : (<Placeholder></Placeholder>)
                                }
                            </UserHandContainer>
                        </HandsContainer>
                        <OptionsContainer>
                            <HistoryContainer>
                                <History history={gameHistory} winners={winnerList}/>
                            </HistoryContainer>

                            {/* <DivButton>Save progress</DivButton> */}
                        </OptionsContainer>
                    </>
                ) 
                : (<Spinner/>)
            }
        </GameScreenContainer>
    )
}

export default Game