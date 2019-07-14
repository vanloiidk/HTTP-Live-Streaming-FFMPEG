import React from 'react'
import styled from 'styled-components'
import {borderColor, headerHeight, containerMaxWidth} from "./theme";
import userAvatar from '../images/icon.png'
import Watch from './pages/watch'
import Home from "./pages/home";
import {Route, Switch} from 'react-router-dom'
import Register from "./pages/user/register";
import Login from "./pages/user/login";
import Store from "../store";
import _ from 'lodash'
import UserCamera from "./pages/camera/user-camera";
import AddCamera from "./pages/camera/add-camera";
import {history} from "../history";


const AppWrapper = styled.div `
   
`;

const Container = styled.div `
    max-width: ${containerMaxWidth}px;
    margin: 0 auto;
`
const Header = styled.div `
      
        height: ${headerHeight}px;
        border-bottom: 1px solid ${borderColor};
`

const Main = styled.div `
    padding: 20px 0;
    
`

const Footer = styled.div `
    border-top: 1px solid ${borderColor};
    padding: 10px 0;
`
const Copyright = styled.p`
    font-size: 12px;
    text-align: center;
`
const HeaderTitle = styled.div `
    //outline: none
    //width: 110px;
    background: white;
    //border: none;
    font-size: 30px;
    font-weight: 800;
    line-height: ${headerHeight}px;
    flex-grow: 1;
    text-align: left;
    margin-left: 50px;
    color: rgba(0, 0, 0, 0.8);
`
const HeaderUserMenu = styled.div `
    width: 50px;
    display: flex;
    align-items: center;
`
const HeaderWrapper = styled.div `
    display: flex;
    
`
const HeaderUserAvatar = styled.img `
    float: right;
    border-radius: 50%;
    width: 30px;
    height: 30px;
`

const UserTitle = styled.div `
    font-size: 14px;
    font-weight: 600;
    line-height: ${headerHeight}px;
    padding-right: 10px;
    color: lightblue;
`
const LoginBt = styled.div`
    height: 30px;
    padding: 5px,5px;
    vertical-align: middle;
    //border: 1px solid rgb(0,0,0.8);
    padding: 2px 15px;
    background: #FFF;
    font-weight: 600;
    position: relative;
    margin-top: 12px;

`




export default class App extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            store: new Store(this)
        }
    }




    render() {

        const {store} = this.state;

        var currentUser = store.getCurrentUser();

        return <AppWrapper>
            <Header>
                <HeaderWrapper>
                    <HeaderTitle onClick={(e) => {

                        history.push('/')

                    }}>Camera</HeaderTitle>

                    <UserTitle>{_.get(currentUser,'name','')}</UserTitle>

                    <LoginBt onClick={function () {
                        //console.log(btName);
                        // if (btName === 'logout'){
                        //     btName = 'login';
                        // }
                        store.deleteUserTokenToLocalStorage();
                        currentUser = store.getCurrentUser();
                        //console.log(!currentUser);
                        currentUser ? window.location.reload(): history.push('/login');
                        //window.location.reload();


                        //document.getElementsByTagName('name1')[0].innerHTML = this.setUserTitle(currentUser);
                        //history.push('/login');
                    }}>{currentUser ? `logout` : `login`}</LoginBt>

                    <HeaderUserMenu>

                        <HeaderUserAvatar alt="" src={userAvatar}/>

                    </HeaderUserMenu>
                </HeaderWrapper>
            </Header>
            <Main>
                <Container>
                    <Switch>
                        <Route exact path={'/dashboard/camera/add'} render={(routeProps) => <AddCamera {...routeProps} store={store}/>}/>
                        <Route exact path={'/dashboard/camera'} render={(routeProps) => <UserCamera {...routeProps} store={store}/>}/>
                        <Route exact path={'/login'} render={(routeProps) => <Login {...routeProps} store={store}/>}/>
                        <Route exact path={'/register'}
                               render={(routeProps) => <Register {...routeProps} store={store}/>}/>
                        <Route exact path={'/watch/:id'}
                               render={(routeProps) => <Watch {...routeProps} store={store}/>}/>
                        <Route exact path={'/'} render={(routeProps) => <Home {...routeProps} store={store}/>}/>
                    </Switch>
                </Container>
            </Main>
            <Footer>
                <Container>
                    <Copyright>® 2019 Camera Inc.</Copyright>
                </Container>
            </Footer>
        </AppWrapper>
    }

}