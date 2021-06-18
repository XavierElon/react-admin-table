import React from "react";
import { Link } from "react-router-dom";
import { Radio } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import "date-fns";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Constants from "../helpers/constants";

const appStyle = {
  marginLeft: "20rem",
  marginRight: "20rem",
};

const bodyStyle = {
  // position: "absolute",
  // left: "0%",
  // marginLeft: "40rem",
  // marginRight: "40rem",
  // minWidth: "100%",
  // height: "523px",
  // marginTop: "3rem",
  // flexGrow: "1",
};

const h2Style = {
  // position: "absolute",
  // left: "10%",
  // width: "500px",
  // height: "23px",
  // fontFamily: "Source Sans Pro",
  // fontSize: "18px",
  // color: "#222222",
  // textDecoration: "none solid rgb(34, 34, 34)",
  // textAlign: "left",
};

const listingTextStyle = {
  // position: "relative",
  // textAlign: "left",
};

const typeStyle = {
  // position: "absolute",
  // top: "3.5rem",
  // height: "20px",
  // left: "10%",
  // width: "400px",
  // fontSize: "12",
};

const nameTextStyle = {
  // position: "absolute",
  // top: "3.8rem",
  // left: "70rem",
};

const nameStyle = {
  // position: "absolute",
  // top: "5rem",
  // left: "70rem",
  // width: "200px",
};

const checkboxesStyle = {
  // position: "absolute",
  // top: "20%",
  // left: "10%",
  // textAlign: "left",
};

const locationStyle = {
  // position: "absolute",
  // top: "65%",
  // left: "10%",
};

const locationText = {
  // textAlign: "left",
};

const physicalAddressStyle = {
  // position: "absolute",
  // top: "80%",
  // left: "10%",
  // textAlign: "left",
};

const stateStyle = {
  // width: "200px",
  // position: "absolute",
  // top: "2rem",
  // left: "0rem",
};

const zipcodeStyle = {
  // width: "200px",
  // position: "absolute",
  // top: "2rem",
  // left: "0rem",
};

const startDateTextStyle = {
  // position: "absolute",
  // top: "54rem",
  // left: "10%",
};

const startDateStyle = {
  width: "200px",
  // position: "absolute",
  // top: "55rem",
  // left: "14rem",
};

const endDateTextStyle = {
  // position: "absolute",
  // top: "54rem",
  // left: "37rem",
};

const endDateStyle = {
  // width: "200px",
  // position: "absolute",
  // top: "55rem",
  left: "37rem",
};

const descriptionTextStyle = {
  // position: "absolute",
  // top: "62rem",
  // left: "15rem",
};

const descriptionStyle = {
  // width: "550px",
  // position: "absolute",
  // top: "63rem",
  // left: "10%",
};

const linkTextStyle = {
  width: "100px",
};

const linkStyle = {
  width: "300px",
};

const contactNameStyle = {
  width: "400px",
};

const phoneTextStyle = {
  width: "100px",
};

const phoneNumberStyle = {
  width: "200px",
};

const emailStyle = {
  width: "200px",
};

const lineStyle = {
  width: "1080px",
  height: "1px",
  strokeWidth: "1",
  backgroundColor: "#d8d8d8",
};

const submitStyle = {
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "#1672B5",
  color: "white",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  border: "0px",
};

const cancelStyle = {
  // position: "absolute",
  // left: "88rem",
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "black",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  cursor: "pointer",
};

const placesStyle = {
  width: "500px",
  minWidth: "500px",
};

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      startDate: "",
      endDate: "",
      locationsThatOfferFreeWiFiPublicDevices: false,
      lowCostInternetServicesOrDeals: false,
      lowCostOrSubsidizedDevices: false,
      rentableLoanerDevices: false,
      rentableLoanerHotspots: false,
      digitalLiteracyTrainings: false,
      assistanceForDevicesOrSoftware: false,
      assistanceGettingASmallBusinessOnline: false,
      laptopsAndDesktops: false,
      mobileDevices: false,
      networkingDevices: false,
      location: "",
      userOhid: "",
      email: "",
      phoneNumber: "",
      address: "",
      lat: "",
      lon: "",
      state: "",
      zipCode: "",
      description: "",
      linkToWebsite: "",
      contactName: "",
      status: "pending",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("value = " + value + " name = " + name);
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  handleAddressChange = (event) => {
    console.log(event);
    const target = event.target;
    console.log(target);
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async handleSubmit(event) {
    event.preventDefault();
    let update;
    console.log("email = " + this.state.email);
    console.log("phone number = " + this.state.phoneNumber);
    console.log("both null");
    update = {
      data: {
        resourceType: `${this.state.type}`,
        resourceName: `${this.state.name}`,
        offerStartDate: `${this.state.startDate}`,
        offerExpirationDate: `${this.state.endDate}`,
        address1: {
          address: `${this.state.address}`,
          lat: `${this.state.lat}`,
          lon: `${this.state.lon}`,
        },
        location: `${this.state.location}`,
        state: `${this.state.state}`,
        zipCode: `${this.state.zipCode}`,
        briefDescription: `${this.state.description}`,
        linkToWebsite: `${this.state.linkToWebsite}`,
        contactName: `${this.state.contactName}`,
        status: `${this.state.status}`,
        userOhid: `${this.state.userOhid}`,
        email: `${this.state.email}`,
        phoneNumber: `${this.state.phoneNumber}`,
        categories: {
          locationsThatOfferFreeWiFiPublicDevices: `${this.state.locationsThatOfferFreeWiFiPublicDevices}`,
          lowCostInternetServicesOrDeals: `${this.state.lowCostInternetServicesOrDeals}`,
          lowCostOrSubsidizedDevices: `${this.state.lowCostOrSubsidizedDevices}`,
          rentableLoanerDevices: `${this.state.rentableLoanerDevices}`,
          rentableLoanerHotspots: `${this.state.rentableLoanerHotspots}`,
          digitalLiteracyTrainings: `${this.state.digitalLiteracyTrainings}`,
          assistanceForDevicesOrSoftware: `${this.state.assistanceForDevicesOrSoftware}`,
          assistanceGettingASmallBusinessOnline: `${this.state.assistanceGettingASmallBusinessOnline}`,
          laptopsAndDesktops: `${this.state.laptopsAndDesktops}`,
          mobileDevices: `${this.state.mobileDevices}`,
          networkingDevices: `${this.state.networkingDevices}`,
        },
      },
    };

    console.log(update);
    const response = axios.post(`${Constants.DFRT_FORM_URL}`, update);
    console.log(response);
    await this.sleep(1000);
    this.props.history.push("/");
  }

  digitalLiteracy() {
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="digitalLiteracyTrainings"
                  checked={this.state.digitalLiteracyTrainings}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Digital Literacy Trainings"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="assistanceForDevicesOrSoftware"
                  checked={this.state.assistanceForDevicesOrSoftware}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Assistance for Devices or Software"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="assistanceGettingASmallBusinessOnline"
                  checked={this.state.assistanceGettingASmallBusinessOnline}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Assistance Getting a Small Business Online"
            />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      </div>
    );
  }

  digitalResources() {
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="lowCostInternetServicesOrDeals"
                  checked={this.state.lowCostInternetServicesOrDeals}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Low-Cost Internet Services Or Deals"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="lowCostOrSubsidizedDevices"
                  checked={this.state.lowCostOrSubsidizedDevices}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Low-Cost Or Subsidized Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="locationsThatOfferFreeWiFiPublicDevices"
                  checked={this.state.locationsThatOfferFreeWiFiPublicDevices}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Locations That Offer Free Wi-Fi/Public Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="rentableLoanerHotspots"
                  checked={this.state.rentableLoanerHotspots}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Rentable/Loaner Hotspots"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="rentableLoanerDevices"
                  checked={this.state.rentableLoanerDevices}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Rentable/Loaner Devices"
            />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      </div>
    );
  }

  donatedResources() {
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  checked={this.state.laptopsAndDesktops}
                  name="laptopsAndDesktops"
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Laptops and Desktops"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="mobileDevices"
                  checked={this.state.mobileDevices}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Mobile Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="networkingDevices"
                  checked={this.state.networkingDevices}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Networking Devices"
            />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      </div>
    );
  }

  allOfOhio() {
    return (
      <div>
        <TextField
          style={stateStyle}
          onChange={this.handleInputChange}
          size="medium"
          label="State"
          name="state"
          value="Ohio"
          variant="outlined"
          margin="dense"
          InputLabelProps={{
            shrink: true,
            readOnly: true,
          }}
        ></TextField>
      </div>
    );
  }

  zipCode() {
    return (
      <div>
        <TextField
          style={zipcodeStyle}
          onChange={this.handleInputChange}
          size="medium"
          label="Zip Code"
          name="zipCode"
          variant="outlined"
          margin="dense"
          value={this.state.zipCode}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
    );
  }

  handleChange = (address1) => {
    this.setState({ address1 });
  };

  handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.setState({ lat: latLng.lat, lon: latLng.lng }))
      .catch((error) => console.error("Error", error));
    geocodeByAddress(address)
      .then((results) =>
        this.setState({
          address1: results[0].formatted_address,
          zipCode: results[0].address_components[7].long_name,
        })
      )
      .catch((error) => console.error("Error", error));
  };

  handleClick = (address) => {
    console.log(address);
    geocodeByAddress(address.description)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        this.setState({
          lat: latLng.lat,
          lon: latLng.lng,
        })
      )
      .catch((error) => console.error("Error", error));
    geocodeByAddress(address.description)
      .then((results) =>
        this.setState({
          address1: results[0].formatted_address,
          zipCode: results[0].address_components[7].long_name,
        })
      )
      .catch((error) => console.error("Error", error));
  };

  streetAddress() {
    return (
      <div>
        <PlacesAutocomplete
          style={placesStyle}
          value={this.state.address1}
          name="address1"
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places...",
                  // className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      onClick={(e) => {
                        this.handleClick(suggestion);
                      }}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }

  render() {
    let value = "";
    if (this.state.type === "Digital Literacy") {
      value = this.digitalLiteracy();
    } else if (this.state.type === "Digital Resource") {
      value = this.digitalResources();
    } else if (this.state.type === "Donated Resource") {
      value = this.donatedResources();
    }
    let locationRadio = "";
    if (this.state.location === "allOfOhio") {
      locationRadio = this.allOfOhio();
    } else if (this.state.location === "zipCode") {
      locationRadio = this.zipCode();
    } else if (this.state.location === "streetAddress") {
      locationRadio = this.streetAddress();
    }
    console.log(this.state);

    return (
      <div style={appStyle}>
        <form
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
        >
          
          <Grid item xs={12}>
            <h2>
              <b>New Entry Form</b>
            </h2>
          </Grid>
          <Grid item xs={6}>
            <p>Listing Type</p>
          </Grid>
          <Grid item xs={6}>
            <p>Resource Name</p>
          </Grid>

          <Grid item xs={6}>
            <FormControl required>
              <Select
                labelId="demo-simple-select-required-label"
                displayEmpty
                margin="dense"
                name="type"
                variant="outlined"
                onChange={this.handleInputChange}
                value={this.state.type}
              >
                <MenuItem value="Digital Literacy">Digital Literacy</MenuItem>
                <MenuItem value="Digital Resource">Digital Resource</MenuItem>
                <MenuItem value="Donated Resource">Donated Resource</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              size="medium"
              name="name"
              variant="outlined"
              margin="dense"
              onChange={this.handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <h5>
              <b>Categories</b> (select all that apply)
            </h5>
          </Grid>
          <Grid item xs={12}>
            {value}
          </Grid>
          <Grid item xs={12}>
            <h5 className="LocationText">
              <b>Location</b>
            </h5>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="location"
                name="location"
                onChange={this.handleInputChange}
              >
                <FormControlLabel
                  value="noPhysicalAddress"
                  control={<Radio color="primary" />}
                  label="No physical address"
                />
                <FormControlLabel
                  value="allOfOhio"
                  control={<Radio color="primary" />}
                  label="All of Ohio"
                />
                <FormControlLabel
                  value="zipCode"
                  control={<Radio color="primary" />}
                  label="Zip Code"
                />
                <FormControlLabel
                  value="streetAddress"
                  control={<Radio color="primary" />}
                  label="Street Address"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <h5>
              <b>Physical Address</b> (if applicable)
            </h5>
          </Grid>
          <Grid item xs={12}>
            {locationRadio}
          </Grid>
          <Grid item xs={6}>
            <p>Offer Start Date</p>
          </Grid>
          <Grid item xs={6}>
            <p>Offer Expiration Date</p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="date"
              type="date"
              name="startDate"
              variant="outlined"
              margin="dense"
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="date"
              type="date"
              name="endDate"
              variant="outlined"
              margin="dense"
              onChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Brief Description</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows="4"
              size="medium"
              name="description"
              onChange={this.handleInputChange}
              variant="outlined"
              margin="dense"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <p>Link to Website</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="medium"
              name="linkToWebsite"
              onChange={this.handleInputChange}
              variant="outlined"
              margin="dense"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <p>Name (if Applicable)</p>
          </Grid>
          <Grid item xs={3}>
            <p>Phone Number</p>
          </Grid>
          <Grid item xs={3}>
            <p>Email</p>
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="medium"
              name="contactName"
              onChange={this.handleInputChange}
              variant="outlined"
              margin="dense"
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <InputMask mask="(999) 999-9999" onChange={this.handleInputChange}>
              {() => (
                <TextField
                  name="phoneNumber"
                  margin="dense"
                  variant="outlined"
                  type="text"
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={3}>
            <TextField
              size="medium"
              name="email"
              onChange={this.handleInputChange}
              variant="outlined"
              margin="dense"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <div style={lineStyle}></div>
          </Grid>
          <Grid item xs={6}>
            <Link to="/">
              <div style={cancelStyle}>
                <b>Cancel</b>
              </div>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <input
              style={submitStyle}
              type="submit"
              value="Save"
              onSubmit={this.handleSubmit}
            />
          </Grid>
          
        </Grid>
        </form>
      </div>
    );
  }
}
