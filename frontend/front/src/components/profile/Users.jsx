import React, { Component } from "react";
import ".//user.css";
import minilogo from "../../assets/minilogo.png";
import notes from "../../assets/notesicon.png";
import settingslogo from "../../assets/settings-48.png";
import booklogo from "../../assets/booklogo.png";
import logout from "../../assets/logout.png";
import light from "../../assets/light.png";
import saturn from "../../assets/saturn.png";
import nabil from "../../assets/nabil.jpg";

class Users extends Component {
  //     const [selectedButton, setSelectedButton] = useState('');

  //   const handleButtonClick = (buttonName) => {
  //     setSelectedButton(buttonName);
  //   };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      info: 'Initial information',
      editableInfo: '',
      isEditing: false
    };
    this.state = {
      isUnderlined: false
    };
  }
  handleClick = () => {
    this.setState(prevState => ({
      isUnderlined: !prevState.isUnderlined
    }));
  };


  handleImageChange(e) {
    const file = e.target.files[0];
    // You can perform validation on the file here if needed
    this.setState({ image: file });
  }
  
  handleEdit = () => {
    this.setState({
      editableInfo: this.state.info,
      isEditing: true
    });
  };

  handleInputChange = event => {
    this.setState({
      editableInfo: event.target.value
    });
  };

  handleConfirm = () => {
    this.setState(prevState => ({
      info: prevState.editableInfo,
      isEditing: false
    }));
  };
  
  render() {
    const { info, editableInfo, isEditing } = this.state;
    const { isUnderlined } = this.state;
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar">
                <div className="topbox">
                  <img style={{}} src={minilogo} alt="" />
                  <a style={{ color: "white" }}>Student Helper</a>
                </div>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "90px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 1.5)",
                  }}
                >
                  𝗣𝗿𝗼𝗳𝗶𝗹𝗲
                </h1>
                <div className="middilebox">
                  <div className="line">
                    <img href="" src={notes}></img>
                    <a href="">𝗢𝘃𝗲𝗿𝘃𝗶𝗲𝘄</a>
                  </div>
                  <div className="line">
                    <img src={booklogo}></img>
                    <a href="">𝗦𝘂𝗯𝗷𝗲𝗰𝘁𝘀</a>
                  </div>
                  <div className="line">
                    <img src={notes}></img>
                    <a href="">𝗡𝗼𝘁𝗲𝘀</a>
                  </div>
                  <div className="line">
                    <img src={settingslogo}></img>
                    <a href="">𝗦𝗲𝘁𝘁𝗶𝗻𝗴𝘀</a>
                  </div>
                </div>
                <div className="bottombox">
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "white",
                      marginLeft: "5px",
                    }}
                    src={logout}
                  ></img>
                  <a
                    href=""
                    style={{
                      color: "white",
                      marginLeft: "5px",
                      marginTop: "30px",
                      textDecoration: "none",
                    }}
                  >
                    𝗟𝗼𝗴 𝗢𝘂𝘁
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="profile">
                <nav className="navbar navbar-expand-lg">
                  <div className="navbar">
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link " aria-current="page" href="#">
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " aria-current="page" href="#">
                            About us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " aria-current="page" href="#">
                            Courses
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " aria-current="page" href="#">
                            ChatBot
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" aria-current="page" href="#">
                            Contact us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link active "
                            aria-current="page"
                            href="#"
                          >
                            Profile
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>

                <div className="profileImage" style={{ display: "flex" }}>
                  <img
                    src={light}
                    style={{
                      marginLeft: "10px",
                      width: "80px",
                      height: "70px",
                    }}
                  />
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <img
                      src={
                        this.props.image
                          ? URL.createObjectURL(this.props.image)
                          : nabil
                      }
                      alt="image profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "60px",
                        border: "7px solid #4D2C5E",
                        marginLeft: "530px",
                      }}
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={this.handleImageChange}
                  />
                </div>

                <button
                  className={
                    isUnderlined
                      ? "underlineButton underlined"
                      : "underlineButton"
                  }
                  onClick={this.handleClick}
                >
                  𝙼𝚢 𝙳𝚎𝚝𝚊𝚒𝚕𝚜
                </button>
                <button
                  className={
                    !isUnderlined
                      ? "underlineButton underlined"
                      : "underlineButton"
                  }
                  onClick={this.handleClick}
                >
                  𝙴𝚍𝚒𝚝 𝙿𝚛𝚘𝚏𝚒𝚕𝚎
                </button>
                <div className="profileData">
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="firstName">First Name</label>
                      <input id="firstName" type="text" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="year">Year</label>
                      <input id="year" type="text" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="lastName">Last Name</label>
                      <input id="lastName" type="text" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="sector">Password</label>
                      <input id="sector" type="text" />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="sector">Sector</label>
                      <input id="sector" type="text" />
                    </div>
                    
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="Courses">
                  <p>Last Accessed Material</p>
                 
                    
                  <button >Emploi de temps</button>
                  <button >Emploi de temps</button>
                  <br></br>
                  <button >Emploi de temps</button>
                  <button >Emploi de temps</button>
                  </div>
                  </div>

                  <div className="col-md-4">
                    <div></div>
                    <img
                    src={saturn}
                    style={{ width: "80px", height: "70px" }}
                    ></img>
                  </div>


                </div>
                
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Users;
