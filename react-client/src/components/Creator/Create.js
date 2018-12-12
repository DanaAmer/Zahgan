import React from 'react'
import $ from 'jquery';
import EventClassNew from '../Home/EventClassNew'
import GoogleMapReact from 'google-map-react';
import SimpleMap from './map';
import Eventcreat from './Eventcreat'
import MapForCreator from './mapForCreator'
import Eventsets from './Eventsets'
import Eventcreatshow from './Eventcreatshow'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreatorEvents from './CreatorEvents'
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Create extends React.Component {
  static defaultProps = {
    center: {
      lat: 31.95522,
      lng: 35.94503,
    },
    zoom: 10
  };
  constructor(props) {
    // all the function to set thes value from the text boxs is rten in the render function in line 
    super(props);
    this.state = {
      appearCreate: true,
      host: '',
      event: '',
      cost: '',
      description: '',
      photo: '',
      sets: '',
      date: '',
      location: '',
      items: [],
      imgName: 'myImage-1544558235241.png',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.allseats = this.allseats.bind(this);
  }
  // this function to show the map to pic place in creator pAGE 
  handleClickedMap = (e) => {
    console.log(e)
    let latitude = e.lat
    let longtitude = e.lng
    this.setState({
      location: { latitude, longtitude }
    })
    console.log(latitude, longtitude)
  }
  // this function to git all the data from data base befor render the bage 
  //silf envok function 
  componentDidMount() {
    $('#home').hide()
    console.log('email============', this.props.email)
  }
  //this function will take the data from props and send them to the data base to creat event 
  handleSubmit(event) {
    var obj = {
      creatorName: this.state.host,
      eventName: this.state.event,
      cost: this.state.cost,
      des: this.state.description,
      url: this.state.photo,
      availableSeats: this.state.sets,
      date: this.state.date,
      eventLocation: [this.state.location],
      attending: [],
      email: this.props.email,
      imgName: this.state.imgName,
      attending: []
    }

    // pst requst using ajax 
    $.ajax({
      type: "POST",
      url: '/create',
      data: {
        obj
      },
      success: function (data) {
        console.log("ajax data", data)
      }
    });

    alert(obj.eventName + ' saved !');
    // after post we use ajux to get the data agean so the creataer page always will be updated 
    $.ajax({
      url: '/create',
      success: (data) => {
        console.log("my data", data)
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  }

  //colect all event sets 
  allseats(props) {
    var lastindex = props.state.items.length - 1
    var z = props.state.items[lastindex]
    var zz = 0
    for (var key in z) {
      if (key === 'availableSeats') {

        zz = z[key]
      }
    }
    return zz
  }

  // colect the number of sets empty 
  allSeats(props) {
    var total = 0

    var totalfun = function (i) {
      var empty = i.availableSeats - i.attending.length
      total = total + empty
    }
    for (var i = 0; i < props.state.items.length; i++) {
      totalfun(props.state.items[i])
    }
    return total
  }

  // to colect all resolved sets
  reservedSeats(props) {
    var total = 0

    var totalfun = function (i) {
      total = total + i.attending.length
    }
    for (var i = 0; i < props.state.items.length; i++) {
      totalfun(props.state.items[i])
    }
    return total
  }

  //to hide and show the create event part
  appearCreate() {
    if (this.state.appearCreate) {
      $('.createEvent').hide()
      this.setState({
        appearCreate: !this.state.appearCreate
      })
    } else {
      $('.createEvent').show()
      this.setState({
        appearCreate: !this.state.appearCreate
      })
    }
  }

  modal() {
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#location-input').trigger('focus')
    })
  }

  logOut() {
    $.ajax({
      url: '/creator/logout',
      success: (data) => {
        console.log("my data", data)
        this.setState({
          items: data
        })
        window.location.reload();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleImage(event) {
    var scope = this;
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/upload', {
      method: 'POST',
      body: data,
    });

    setTimeout(function() {
      $.ajax({
        url: '/upload',
        success: (data) => {
          console.log("my data", data)
          scope.setState({
            imgName: data
          })
        },
        error: (err) => {
          console.log('err', err);
        }
      });
    }, 1000);
  }

  handleImageInput(event) {
    console.log(event.target.files[0])
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <div>
              <Switch>
                <Route path='/Eventcreatshow' component={Eventcreatshow} />
                <Route path='/Eventsets' component={Eventsets} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        <div className="container-fluid page-cont">
          <h6 className="list-group-item active main-color-bg">
            <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
            <button style={{ float: 'right', marginTop: '0.5%', color: 'black' }} className="btn btn-lg" onClick={this.logOut.bind(this)}>Logout</button>
          </h6>

          <div className="row dash-row">

            <div className="col-4 data-box">
              <div>
                <h3><span>{this.state.items.length}</span> <a href="/Eventcreatshow"> Number of your events</a></h3>
              </div>
            </div>

            <div className="col-4 data-box">
              <div>
                <h3><span>{this.allSeats(this)}</span><a href="/Eventsets">  Remaining seats for all events </a></h3>
              </div>
            </div>

            <div className="col-4 data-box">
              <div>
                <h3><span>{this.reservedSeats(this)}</span> <a href="/Reserved"> Reserved seats for all events </a> </h3>
              </div>
            </div>
          </div>
          <div>
            <CreatorEvents className="row" style={{ position: 'relative' }} events={this.props.events} />
          </div>
        </div>




        <button style={{ marginLeft: '2.8%', fontSize: '15px' }} className="col-md-4 border p-3 mb-2 bg-primary text-white" id="createClick" onClick={this.appearCreate.bind(this)}> Create a new event </button>
        <br />
        <hr />
        <div style={{ marginLeft: '2%', fontSize: '12px' }} className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <div className="createEvent">
              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">User Name:</label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="user name" value={this.state.host}
                      onChange={e => this.setState({ host: e.target.value })} />
                  </div>
                </div>
              </div>

              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Event Name: </label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="event name" value={this.state.event}
                      onChange={e => this.setState({ event: e.target.value })} />
                  </div>
                </div>
              </div>

              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Event Cost: </label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="cost" value={this.state.cost}
                      onChange={e => this.setState({ cost: e.target.value })} />
                  </div>
                </div>
              </div>



              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"> Photo: </label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="insert a URL" value={this.state.photo}
                      onChange={e => this.setState({ photo: e.target.value })} />
                  </div>
                </div>
              </div>














              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"> Number of seats: </label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="available seats number" value={this.state.sets}
                      type="number" onChange={e => this.setState({ sets: e.target.value })} />
                  </div>
                </div>
              </div>



              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"> Date and time:</label>
                  <div className="col-sm-10">
                    <input className="form-control" placeholder="mm/dd/yy" value={this.state.date}
                      type="datetime-local" onChange={e => this.setState({ date: e.target.value })} />
                  </div>
                </div>
              </div>


              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"> Event location:</label>
                  <div className="col-sm-8">
                    <input id="location-input" className="form-control col-md-12" placeholder="city, street" value={this.state.location}
                      onClick={this.modal} />
                  </div>
                  <button style={{ mfloat: 'right', marginTop: "-2%" }} type="button" className="btn btn-info btn-md" data-toggle="modal" data-target="#myModal">Map</button>
                </div>
              </div>

              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Event description:</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" placeholder="event description" value={this.state.description}
                      onChange={e => this.setState({ description: e.target.value })} />
                  </div>
                </div>
              </div>


              <div className="row">
                <button type="submit" value="create" className="btn btn-primary btn-lg btn-block" >create</button>
              </div>
            </div>
            <br />
          </form>

        </div>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div style={{ height: '100vh', width: '100%' }}>
                  <GoogleMapReact onClick={this.handleClickedMap}
                    bootstrapURLKeys={{ key: "AIzaSyD2IjGONmJ7Si4cNEZtNPNgPy5pVEt-_14" }}
                    defaultCenter={this.props.center}
                    defaultIcon={this.props.Marker}
                    defaultZoom={this.props.zoom}
                  >
                    <AnyReactComponent
                      lat={31.95522}
                      lng={35.94503}
                    />
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>










          <h1>File Upload</h1>
          <form onSubmit={this.handleImage.bind(this)} enctype="multipart/form-data">
            <div className="file-field input-field">
              <div className="btn grey">
                <span>File</span>
                <input onChange={this.handleImageInput.bind(this)} name="myImage" type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
          <br />
        </div>
      </div>
    );
  }
}
export default Create


//action="/upload" method="POST" 
