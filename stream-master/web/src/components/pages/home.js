import React,{Component} from 'react'
import styled  from 'styled-components'
import {history} from '../../history'
//import {FormInput} from "../themes/form";
import _ from 'lodash'
import {FormAction, FormButton} from "../themes/form";

const HomeWrapper = styled.div `
  
`
const WatchBt = styled.button`
        height: 30px;
        border: 1px solid rgba(0, 0, 0.06);
        padding: 5px 15px;
        background: #FFF;
        font-weight: 600;
        text-align: center;
        margin-left: 10px;
        display: inline;
        margin-top: 30px;

`
const InputChannel = styled.input`
      height: 30px;
      border: 1px solid rgba(0,0,0.06);
      padding: 5px 15px;
      display: inline;


`;

export default class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            channel: {
                name: ""
            }
        };

        this._onTextFieldChange = this._onTextFieldChange.bind(this);
    }

    _onTextFieldChange(event) {

        let {channel} = this.state;

        const field = event.target.name;
        const value = event.target.value;

        channel[field] = value;

        this.setState({
            channel: channel
        });

    }

    render(){
        const {channel} = this.state;

        return <HomeWrapper>
            <h1>Welcome to Camera App.</h1>
            <WatchBt onClick={()=>{
                const mychannel = _.get(channel,'channel','');
                //console.log(document.getElementById("channel").target.textContent);
                history.push(`/watch/${mychannel}`);
            }}>Go to channel</WatchBt>
            <InputChannel onChange={this._onTextFieldChange} value={_.get(channel, 'channel', '')} type={'name'}
                          name={'channel'} placeholder={'Your channel'}/>

            <FormButton onClick={(e) => {

                history.push('/dashboard/camera')

            }} type={'button'}>Go to your Devices</FormButton>

        </HomeWrapper>
    }
}