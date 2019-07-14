import React, {Component} from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import moment from 'moment'
import {history} from "../../../history";
import {borderColor} from "../../theme";

const UserCameraWrapper = styled.div `
    
`

const ActionButton = styled.button `
    background: none;
    border: 0 none;
    padding: 3px 10px;
    font-weight: 600;
    color: rgba(0,0,0,0.8);
    font-size: 15px;
`
const CusBt = styled.button`
        border: 1px solid rgba(0, 0, 0.06);
        padding: 5px 15px;
        background: #FFF;
        font-weight: 600;
        outline: none;
        

`
const DashTable = styled.table`
    text-align: left;
    //border: 1px solid red; 
    grid-color: red;
    margin-left: 10px;
    padding: 20px;
`;


export default class UserCamera extends Component {
    constructor(props){
        super(props)
        this.state ={
            status: "on"
        }

    }




    render() {


        const {store} = this.props;
        const {connect} = this.props;

        const cameras = store.getUserCameras();

        console.log("User camera", cameras);

        return <UserCameraWrapper>

            <h2>Your camera list</h2>


            <ActionButton onClick={() => {

                history.push('/dashboard/camera/add')
            }}>Add new Camera</ActionButton>
            <DashTable>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Live</th>
                    <th>Is Connected</th>
                    <th>Last connected</th>
                    <th>Public</th>
                </tr>
                </thead>
                <tbody>
                {cameras.map((cam, index) => {
                    const lastConnected = _.get(cam, 'lastConnected');
                    return (
                        <tr key={index}>
                            {/*<td>{index}</td>*/}
                            <td>{_.get(cam, 'name')}</td>
                            <td>{_.get(cam, 'live','') ? "Live": "Offline"}</td>
                            <td>{_.get(cam, 'isConnected') ? "connected" : "Disconnected"}</td>
                            <td>{lastConnected ? moment(lastConnected).fromNow() : "Disconnected"}</td>
                            <td>{_.get(cam, 'public') ? "Public" : "Private"}</td>
                            <td><CusBt onClick={function () {
                                history.push(`/watch/${_.get(cam,'name')}`)
                            }}>Watch</CusBt></td>

                        </tr>
                    )

                })}
                <CusBt onClick={function () {
                    store.liveCamera("123", true,() =>{});
                }}>ON</CusBt>
                <CusBt onClick={function () {
                    store.liveCamera("123", false,() =>{});

                }}>OFF</CusBt>

                </tbody>
            </DashTable>

        </UserCameraWrapper>

    }
}