import React from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'

export default class Home extends React.Component {

    state = { search: '9915BD0200229', accounts: [] }

    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
    }

    fetch(e) {
        
        if (!(e.ctrlKey && e.keyCode === 13)) {
            return;
        }

        if(!this.state.search || this.state.search.lenth < 5){
            return;
        }

        Axios.post('http://localhost:3030/select', { query: "Select foracid, schm_code, acct_name from tbaadm.gam where del_flg = 'N' and schm_type = 'LAA' and acct_ownership ='C' and foracid = '" + this.state.search + "'" })
        .then(response=>this.setState({accounts: response.data.rows}))
    }

    render() {
        return <div className="w-full flex flex-wrap py-2 max-w-xl">
            <input onKeyUp={this.fetch} value={this.state.search} onChange={event => this.setState({ search: event.target.value })} placeholder="Search for loans" className="p-2 w-full border-2 border-green-300" />
            {this.state.accounts.length > 0 && <div className="w-full">
                <ul>
                    {this.state.accounts.map(account => <li className="w-full p-2 my-1 bg-blue-500 hover:bg-blue-600" key={account.FORACID}>
                        <Link to={'/loans/'+this.state.search} className="block text-white">
                        {account.SCHM_CODE} - {account.FORACID} - {account.ACCT_NAME} 
                        </Link>
                    </li>)}
                </ul>
            </div>}
        </div>

    }
}