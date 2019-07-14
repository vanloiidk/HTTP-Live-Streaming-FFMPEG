import React,{Component} from 'react'
import styled  from 'styled-components'
import Player from "../player";
import {history} from "../../history";

const LiveWrapper = styled.div `
    
`

const LiveVideo = styled.div `    
    display: flex;
    justify-content: center;
`
export default class Watch extends Component{


    componentWillMount() {

        const {store} = this.props;

        const currentUser = store.getCurrentUser();
        if(!currentUser){
            // user is logged in we need redirect him to other page.

            history.push('/login');
        }

    }
    getChannel(){
        const channel = this.props.match.params.id;
        return channel;
    }


    render(){
        const playChannel = this.getChannel();
        return <LiveWrapper>
            <LiveVideo>
                <Player channel={playChannel}/>

            </LiveVideo>

        </LiveWrapper>
    }
}