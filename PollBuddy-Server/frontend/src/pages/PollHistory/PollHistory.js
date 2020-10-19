import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import { MDBContainer } from "mdbreact";

//TODO This page can only be access when one is logged in
//TODO Need to dynamically grab what polls the user has access to from the backend
//TODO Need a way to know which polls the users has admin access to and which they do not

// /api/users/
export default class Groups extends Component {
  constructor(){
    super();
    if(!localStorage.getItem("loggedIn")){
      //Redirect("/login");//this is a way to redirect the user to the page
      //window.location.reload(false);//this forces a reload so this will make the user go to the login page. A little barbaric but it works. If frontend wants to make it better by all means
    }
  }
  signout(){
    //localStorage.removeItem("loggedIn");//todo if admin -- more specifically make diff states if the user who logged in is an admin... or teacher. wouldn't want teacher accessing user things or vice versa...
    //Redirect("/login");
  }
  componentDidMount(){
    this.props.updateTitle("My Poll Histories");
  }
  //TODO, this state needs to be dynamically updated according to each user
  state = {
    polls_admin : [
      {id: "1", title: "CSCI 1200 - Data Structures"},
      {id: "2", title: "CSCI 2200 - Foundations of Computer Science"}
    ],
    polls_member : [

    ]
  }
  render() {
    //These if else statement chooses what to display depending on if you are in groups or not
    let admin_display;
    let member_display;
    {
      if (this.state.polls_admin.length == 0) {
        admin_display = <p className=""> Looks like you have not created any groups! </p>
      } else {
        admin_display = <React.Fragment>
                        {this.state.polls_admin.map(polls_admin => (
                            <li key={polls_admin.id} className={polls_admin.title}>
                              <Link to={"/polls/" + polls_admin.id + "/results"}>
                                <button className="btn button">{polls_admin.title}</button>
                              </Link>
                            </li>
                        ))}
                      </React.Fragment>
      }
      if (this.state.polls_member.length == 0){
        member_display = <p className=""> Looks like you are not in any groups! </p>
      } else {
        member_display = <React.Fragment>
                          {this.state.polls_member.map(polls_member => (
                              <li key={polls_member.id} className={polls_member.title}>
                                <Link to={"/polls/"+polls_member.id+"/results"}>
                                  <button className = "btn button">{polls_member.title}</button>
                                </Link>
                              </li>
                          ))}
                        </React.Fragment>
      }
    }
    return (

      <MDBContainer className="page">
        <MDBContainer className="box">
          <p className="fontSizeLarge">
            As a Group Admin:
          </p>
          {admin_display}
          <p className="fontSizeLarge">
            As a Group Member:
          </p>
          {member_display}
        </MDBContainer>
      </MDBContainer>
    );
  }
}
