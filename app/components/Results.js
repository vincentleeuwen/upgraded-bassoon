var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    console.log(players);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results){
      // console.log(results);
      if (results === null) {
        return this.setState(function(){
          return {
            error: 'Looks like there was an error. Please check that both users are on Github.',
            loading: false
          }
        });
      }

      this.setState(function(){
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this));
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loading;
    var loading = this.state.loading;

    if (loading === true) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      )
    }

    return (
      <p>{JSON.stringify(this.state, null, 2)}</p>
    )
  }
}

module.exports = Results;
