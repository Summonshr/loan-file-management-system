import React from 'react'
import { account } from './services';
import { NavLink,Route } from 'react-router-dom';
import Uploader from './Uploader'

export default class FileUploader extends React.Component {

    state = {
        account: 'Searching for account...', types: [
            {name:'Certificate', className: 'bg-red-500 text-red-100 hover:bg-green-400 hover:text-white'},
            {name:'Photo', className: 'bg-red-500 text-red-100 hover:bg-green-400 hover:text-white'},
            {name:'Reciept', className: 'bg-red-500 text-red-100 hover:bg-green-400 hover:text-white'},
        ]
    }

    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getFiles = this.getFiles.bind(this)
    }

    getFiles(){
        this.setState({files: ['A','B','C']})
    }

    async componentWillMount() {
        return false;
    }

    componentDidMount() {
        account.details(this.props.match.params.foracid).then(result=>this.setState({ account: result }))
    }

    render() {

        if (typeof this.state.account == 'string') {
            return <div>{this.state.account}</div>
        }

        let account = this.state.account;

        return <div className="w-full">
            <div className="border p-2 px-4 flex flex-wrap justify-between my-4 bg-white">
                <h3 className="w-full border-b-2 mb-4 pb-2 flex justify-between"><span>Account Details</span></h3>
                <div className="flex flex-wrap justify-between w-full leading-loose">
                    <span>
                        {account.ACCT_NAME} <span className="text-gray-700"> ({account.FORACID})</span>
                    </span>
                    <span>
                        {account.SCHM_TYPE} <span className="text-gray-700"> - {account.SCHM_CODE}</span>
                    </span>
                </div>
                <div className="flex flex-wrap justify-between w-full mb-4">
                    <span>Account Open Date: <span className="text-gray-700">{account.ACCT_OPN_DATE.substring(0, 10)}</span></span>
                    <span>Currency Code: <span className="text-gray-700">{account.ACCT_CRNCY_CODE}</span></span>
                </div>
            </div>
            <div className="border p-2 flex flex-wrap justify-between my-4 bg-white">
                {this.state.types.map(e=><div className={['w-1/3 flex items-center h-16 justify-center block p-2'].join(' ')} key={e.name}><NavLink activeClassName="bg-green-500 text-green-100" className={[e.className ,'block w-full h-full flex justify-center items-center'].join(' ')} to={[this.props.match.url, e.name].join('/')}>{e.name}</NavLink></div>)}
                <Route path={`${this.props.match.path}/:type`} component={Uploader} />
            </div>
        </div>
    }
}