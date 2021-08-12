
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const history = useHistory()
    const {createEvent} = useContext(EventContext)
    const { getGames, games } = useContext(GameContext)
    const [currentEvent, setCurrentEvent] = useState({
        // input fields here
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (event) => {
        // ...
        const newEventState = {
            ...currentEvent }
            newEventState.name = event.target.value
            setCurrentEvent(newEventState)
        }
    

    

    // datastructure for event
    // id, date, time, description, title, game_id, host_id, 

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>


            {/* Create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Time</label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    createEvent(currentEvent).then(history.push('/events'))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
