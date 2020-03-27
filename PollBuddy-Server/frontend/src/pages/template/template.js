import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import new_logo from '../../Poll_Buddy_Logo_v4.png';
import './template.scss'
import ClassEditor from "../../components/classEditor/classEditor";

export default class Template extends Component {//this class is an example of how to use get requests so frontend team can eventually connect to backend refer to class creation for post requests
    constructor() {
        super();
        this.state = {
            groups: []
        }
    }
    async componentDidMount(){
        let groups = []
        const response = await fetch('http://localhost:3001/api/groups/');//this is alternative to .then's and all that
        const json = await response.json();
        for(let i = 0; i < json.length; i++){
            const r = await fetch('http://localhost:3001/api/groups/' + json[i] + '/');
            const rjson = await r.json();
            groups[i] = rjson[0];
        }
        this.setState({groups: groups});
    }
    getID(){//don't know exactly why arrow was borked but if you call by reference or without () then it will not return right    
        let result = null;
        if(this.state.groups[0]!==undefined){//this is necessary. Checking the first index of groups but could do a more rigorous check in future
            result = this.state.groups[0]._id;//groups[0] is temporary
        }
        return result;
    }
    /*backend users routes isn't completely finished i think so 
    cannot start working on a completely functional users page 
    so this is gonna be a mock page that just gets all classes and displays all their info*/
    render() {
        return (
            <MDBContainer className="page-my-classes">
                <img src={new_logo} className="top_left_logo" alt="logo" />
                <hr className="line_style"></hr>
                <header className="header">
                    <br></br> TEST:
        </header>

                <MDBContainer className="buttons">
                    <ClassEditor id = {this.getID()}/>
                    {/*{this.state.groups.map((value, index) => {*/}
                    {/*    console.log(value);*/}
                    {/*    return <MDBBtn>{value[0]._id}</MDBBtn>//todo maybe fix this so this workaround is unnecessary*/}
                    }
                </MDBContainer>

            </MDBContainer>
        )
    }
}