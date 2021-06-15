import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap';
import '../player_details.css';

let details = [];

export default class playerDetails extends Component {

    constructor(props) {
        super(props);

        this.handleFilters = this.handleFilters.bind(this);
        this.handleSorts = this.handleSorts.bind(this);

        this.state = {
            details: [],
        }
    }


    componentDidMount() {
        axios.post('https://footballers-web-project.herokuapp.com/get_all_players')
            .then(response => {
                console.log(response.data);
                details = response.data.data
                if(response.data) {
                    this.setState({
                        details: details
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

    handleFilters(e) {

        if(e.target.value === "all") {
            // If the filter option is 'all' , then fetch all the player's details
            axios.post('https://footballers-web-project.herokuapp.com/get_all_players')
            .then(response => {
                console.log(response.data);
                details = response.data.data
                if(response.data) {
                    this.setState({
                        details: details
                    })
                }
                else {
                    console.log("No data");
                }
            })
            .catch((error) => {
                console.log(error)
            })
            return;
        }

        var filter_val = window.prompt("Enter the filter value: ");

        if(filter_val != null) {
            const filter_attributes = {
                attribute: e.target.value,
                key: filter_val
            }
            console.log(filter_attributes);

            axios.post('https://footballers-web-project.herokuapp.com/filter_attribute', filter_attributes)
                .then(res => { 
                        console.log(res.data.data);
                        this.setState({details: res.data.data});
                        console.log("Player filtered according to ", e.target.value);
                        window.alert("Player details filtered successufully");
                    }
                );
        }
    }

    handleSorts(e) {

        if(e.target.value === "all") {
            // If the sort option is 'all' , then fetch all the player's details
            axios.post('https://footballers-web-project.herokuapp.com/get_all_players')
            .then(response => {
                console.log(response.data);
                details = response.data.data
                if(response.data) {
                    this.setState({
                        details: details
                    })
                }
                else {
                    console.log("No data");
                }
            })
            .catch((error) => {
                console.log(error)
            })
            return;
        }

        const sort_attributes = {
            attribute: e.target.value
        }

        console.log(sort_attributes);

        axios.post('https://footballers-web-project.herokuapp.com/sort_attribute', sort_attributes)
            .then(res => {
                console.log(res.data.data);
                this.setState({details: res.data.data});
                console.log("Player sorted according to ", e.target.value);
                window.alert("Player details sorted is ascending order successufully");
            });
           
    }

    renderCard = (card, index) =>  {
        return(
            <div>
                <Card key={index} className="box card_shadow">
                    <Card.Body>
                        <Card.Title>{card.player_name}</Card.Title>
                        <br />
                        <Card.Subtitle className="mb-2 text-muted">Club: {card.club}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Country: {card.country}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Position: {card.position}</Card.Subtitle>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Goals: {card.goals}</ListGroupItem>
                            <ListGroupItem>Assists: {card.assists}</ListGroupItem>
                            <ListGroupItem>Appearances: {card.appearances}</ListGroupItem>
                            <ListGroupItem>Clean sheets: {card.clean_sheets}</ListGroupItem>
                            <ListGroupItem>Red cards: {card.red_cards}</ListGroupItem>
                            <ListGroupItem>Yellow cards: {card.yellow_cards}</ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <br />
            </div>
        );
    }

    
    render() {
        return(
            <div>
              <h5>Filter by:</h5>
              <ButtonGroup onClick={this.handleFilters}>
                  <Button variant="secondary" value="all">No filter</Button>
                  <Button variant="secondary" value="player_name">Player name</Button>
                  <Button variant="secondary" value="club">Club</Button>
                  <Button variant="secondary" value="country">Country</Button>
                  <Button variant="secondary" value="position">Position</Button>
              </ButtonGroup>
              <br />
              <br />
              <h5>Sort by:</h5>
              <ButtonGroup onClick={this.handleSorts}>
                  <Button variant="secondary" value="all">Normal order</Button>
                  <Button variant="secondary" value="goals">Goals</Button>
                  <Button variant="secondary" value="assists">Assists</Button>
                  <Button variant="secondary" value="clean_sheets">Clean Sheets</Button>
                  <Button variant="secondary" value="red_cards">Red cards</Button>
                  <Button variant="secondary" value="yellow_cards">Yellow cards</Button>
              </ButtonGroup>
              <br />
              <br />
              <div className="grid">
                  {this.state.details.map(this.renderCard)}
              </div>
            </div>
          );
    }
}