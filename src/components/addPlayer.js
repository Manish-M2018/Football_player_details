import React, {Component} from 'react';
import axios from 'axios';

export default class addPlayer extends Component {
    constructor(props) {
        super(props);

        this.onChangePlayerName = this.onChangePlayerName.bind(this);
        this.onChangeClub = this.onChangeClub.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeGoals = this.onChangeGoals.bind(this);
        this.onChangeAssists = this.onChangeAssists.bind(this);
        this.onChangeAppearances = this.onChangeAppearances.bind(this);
        this.onChangeCleanSheets = this.onChangeCleanSheets.bind(this);
        this.onChangeRedCards = this.onChangeRedCards.bind(this);
        this.onChangeYellowCards = this.onChangeYellowCards.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            player_name: '',
            club: '',
            country: '',
            position: 0,
            goals: 0,
            assists: 0,
            appearances: 0,
            clean_sheets: 0,
            red_cards: 0,
            yellow_cards: 0,
        }
    }

    componentDidMount() {
        this.setState({
            player_name: 'Player name',
            club: 'Club name',
            country: 'Country'
        })
    }

    onChangePlayerName(e) {
        this.setState({
            player_name: e.target.value
        });
    }

    onChangeClub(e) {
        this.setState({
            club: e.target.value
        });
    }
    
    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }

    onChangeGoals(e) {
        this.setState({
            goals: e.target.value
        });
    }

    onChangeAssists(e) {
        this.setState({
            assists: e.target.value
        });
    }

    onChangeAppearances(e) {
        this.setState({
            appearances: e.target.value
        });
    }

    onChangeCleanSheets(e) {
        this.setState({
            clean_sheets: e.target.value
        });
    }

    onChangeRedCards(e) {
        this.setState({
            red_cards: e.target.value
        });
    }

    onChangeYellowCards(e) {
        this.setState({
            yellow_cards: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const player = {
            player_name: this.state.player_name,
            club: this.state.club,
            country: this.state.country,
            position: this.state.position,
            goals: this.state.goals,
            assists: this.state.assists,
            appearances: this.state.appearances,
            clean_sheets: this.state.clean_sheets,
            red_cards: this.state.red_cards,
            yellow_cards: this.state.yellow_cards
        }

        // console.log(player);
        
        axios.post('https://footballers-web-project.herokuapp.com/add_player', player)
            .then(res => { 
                console.log(res.data);
                console.log("Player details added!");

                window.alert("Player added!");
                
                window.location.reload();
            });

       
        

        
    }

    render() {
        return(
            <div>
                <h3>Add a new player</h3>
                <form id="add_player_form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Player name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.player_name}
                            onChange={this.onChangePlayerName}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Club: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.club}
                            onChange={this.onChangeClub}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Country: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.country}
                            onChange={this.onChangeCountry}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Position: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            onChange={this.onChangePosition}>
                            <option value="Midfield">Midfield</option>
                            <option value="Goal Keeper">Goal Keeper</option>
                            <option value="Forward">Forward</option>
                            <option value="Defender">Defender</option>
                        </select>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Goals: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.goals}
                            onChange={this.onChangeGoals}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Assists: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.assists}
                            onChange={this.onChangeAssists}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Appearances: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.appearances}
                            onChange={this.onChangeAppearances}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Clean Sheets: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.clean_sheets}
                            onChange={this.onChangeCleanSheets}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Red cards: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.red_cards}
                            onChange={this.onChangeRedCards}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label> Yellow cards: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.yellow_cards}
                            onChange={this.onChangeYellowCards}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Add player" className="btn btn-success" />
                    </div>
                    <br/>
                    <br/>
                </form>
            </div>
        );
    }
}