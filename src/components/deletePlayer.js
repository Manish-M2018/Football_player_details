import React, {Component} from 'react';
import axios from 'axios';

let players = [];
let player_ids = [];

export default class deletePlayer extends Component {
    constructor(props) {
        super(props);

        this.onChangePlayerName = this.onChangePlayerName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            player_name: '',
            id: '',
            players: [],
            player_ids: []
        }
    }

    componentDidMount() {
        axios.post('https://footballers-web-project.herokuapp.com/get_all_players')
            .then(response => {
                console.log(response.data);
                if(response.data) {
                    players.push(response.data.data.map(player => player.player_name));
                    console.log(players);
                    player_ids.push(response.data.data.map(_id => _id._id));
                    console.log(player_ids);
                    this.setState({
                        player_name: players[0][0],
                        id: player_ids[0][0],
                        players: players[0],
                        player_ids: player_ids[0]
                    })
                }
                else {
                    console.log("No data");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onChangePlayerName(e) {
        this.player_name = e.target.value;
        console.log(player_ids[0][players[0].indexOf(this.player_name)]);
        this.setState({
            player_name: e.target.value,
            id: player_ids[0][players[0].indexOf(this.player_name)]
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const player = {
            player_id: this.state.id
        }

        console.log(player);
        

        axios.post('https://footballers-web-project.herokuapp.com/delete_player', player)
            .then(res => {
                console.log(res.data);
                console.log("Player details deleted !");

                window.alert("Player details deleted!");

                window.location.reload();
            });

        
    }

    render() {
        return(
            <div>
                <h3>Delete player details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Player name: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.player_name}
                            onChange={this.onChangePlayerName}>
                            {
                                this.state.players.map(function(player) {
                                return <option 
                                    key={player}
                                    value={player}>{player}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Delete player details" className="btn btn-danger" />
                    </div>
                    <br/>
                    <br/>
                </form>
            </div>
        );
    }
}