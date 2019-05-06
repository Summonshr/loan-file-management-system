import React from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'

export default class Search extends React.Component {

    state = { search: '', accounts: [] }

    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
        this.keyup = this.keyup.bind(this)
    }

    fetch() {
        if (!this.state.search || this.state.search.lenth < 5) {
            window.error('Could not perform search.')
            return;
        }

        Axios
            .post('account-details', { search: this.state.search })
            .then(response => {
                response.data.rows && response.data.rows[0] && this.props.history.push('/loans/'+response.data.rows[0].FORACID);
                response.data.rows && response.data.rows.length == 0 && window.error('No accounts matched')
            })
    }

    keyup(e) {
        if (!(e.ctrlKey && e.keyCode === 13)) {
            return;
        }

        this.fetch()
    }

    render() {
        return <div className="max-w-xl w-full flex flex-wrap justify-between items-center">
            <div className="w-5/6">
                <input onKeyUp={this.keyup} value={this.state.search} onChange={event => this.setState({ search: event.target.value })} placeholder="Search for loans" className="p-2 w-full border-2 border-red-300 h-12" />
            </div>
            <div className="w-1/6 pl-2">
                <button onClick={this.fetch} className="bg-red-400 text-white w-full p-2 h-12">Search</button>
            </div>
        </div>

    }
}