import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { Radio } from "@material-ui/core";
import { Grid } from "@material-ui/core";
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

const appStyle = {
  textAlign: "center",
  width: "100%",
  height: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "auto",
  paddingBottom: "72px",
  flexDirection: "column",
  display: "flex",
};

const headerStyle = {
  position: "fixed",
  width: "100%",
  minWidth: "1440px",
  height: "80px",
  backgroundColor: "white",
  fill: "white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  zIndex: "1",
  flexGrow: "0",
};

const bodyStyle = {
  position: "absolute",
  left: "0%",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1",
};

const footerStyle = {
  flexGrow: "0",
};

const h2Style = {
  position: "absolute",
  left: "10%",
  width: "500px",
  height: "23px",
  fontFamily: "Source Sans Pro",
  fontSize: "18px",
  color: "#222222",
  textDecoration: "none solid rgb(34, 34, 34)",
  textTransform: "uppercase",
  textAlign: "left",
};

const typeStyle = {
  position: "absolute",
  top: "8%",
  height: "20px",
  left: "10%",
  width: "300px",
  fontSize: "12",
};

const nameStyle = {
  position: "absolute",
  top: "5%",
  left: "66%",
  width: "200px",
};

const checkboxesStyle = {
  position: "absolute",
  top: "20%",
  left: "10%",
  textAlign: "left",
};

const locationStyle = {
  position: "absolute",
  top: "65%",
  left: "10%",
};

const locationText = {
  textAlign: "left",
};

const physicalAddressStyle = {
  position: "absolute",
  top: "80%",
  left: "10%",
  textAlign: "left",
};

const stateStyle = {
  width: "200px",
  position: "absolute",
  top: "2rem",
  left: "0rem",
};

const zipcodeStyle = {
  width: "200px",
  position: "absolute",
  top: "2rem",
  left: "0rem",
};

const startDateStyle = {
  width: "200px",
  position: "absolute",
  top: "55rem",
  left: "10%",
};

const endDateStyle = {
  width: "200px",
  position: "absolute",
  top: "55rem",
  left: "42%",
};

const descriptionStyle = {
  width: "550px",
  position: "absolute",
  top: "60rem",
  left: "10%",
};

const link = {
  position: "absolute",
  top: "75rem",
  left: "10%",
};

const linkStyle = {
  position: "absolute",
  top: "2rem",
  left: "0rem",
  width: "300px",
};

const resourceContactStyle = {
  position: "absolute",
  top: "85rem",
  left: "10%",
};

const contactNameStyle = {
  position: "absolute",
  top: "5rem",
  left: "0rem",
  width: "200px",
};

const phoneNumberStyle = {
  position: "absolute",
  top: "3rem",
  left: "35rem",
  width: "200px",
  color: "black",
};

const emailStyle = {
  position: "absolute",
  top: "4rem",
  left: "70rem",
  width: "200px",
};

const lineStyle = {
  width: "1080px",
  height: "1px",
  strokeWidth: "1",
  backgroundColor: "#d8d8d8",
  position: "absolute",
  top: "100rem",
  left: "10rem",
};

const submitStyle = {
  position: "absolute",
  top: "115rem",
  left: "100rem",
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "#700017",
  color: "white",
  fontFamily: "Source Sans Pro",
  fontSize: "14px",
  textDecoration: "bold solid rgb(255, 255, 255)",
  lineHeight: "32px",
  textAlign: "center",
  border: "0px",
};

const cancelStyle = {
  position: "absolute",
  top: "115.3rem",
  left: "88rem",
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "black",
  fontFamily: "Source Sans Pro",
  fontSize: "14px",
  textDecoration: "bold solid rgb(255, 255, 255)",
  lineHeight: "32px",
  textAlign: "center",
  cursor: "pointer",
};

const placesStyle = {
  width: "500px",
};

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: " ",
      name: " ",
      locationsThatOfferFreeWiFiPublicDevices: " ",
      lowCostInternetServicesOrDeals: " ",
      lowCostOrSubsidizedDevices: " ",
      rentableLoanerDevices: "",
      rentableLoanerHotspots: "",
      digitalLiteracyTrainingOptions: "",
      technicalAssistantForPublicDevicesOrSoftware: "",
      resourceToAssistGettingASmallBusinessOnline: "",
      laptopAndDesktops: "",
      mobileDevices: "",
      networkingDevices: "",
      location: "",
      address1: " ",
      lat: " ",
      lon: " ",
      state: "",
      zipcode: "",
      description: "",
      website: "",
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

  handleSubmit(event) {
    event.preventDefault();
    let update;
    console.log("email = " + this.state.email);
    console.log("phone number = " + this.state.phoneNumber);
    if (this.state.email == null && this.state.phoneNumber == null) {
      console.log("both null");
      update = {
        data: {
          resourceType: `${this.state.type}`,
          resourceName: `${this.state.name}`,
          offerStartDate: `${this.state.startDate}`,
          offerExpirationDate: `${this.state.endDate}`,
          address1: {
            address: `${this.state.address1}`,
            lat: `${this.state.lat}`,
            lon: `${this.state.lon}`
          },
          location: `${this.state.location}`,
          state: `${this.state.state}`,
          zipcode: `${this.state.zipcode}`,
          startDate: `${this.state.startDate}`,
          endDate: `${this.state.endDate}`,
          briefDescription: `${this.state.description}`,
          website: `${this.state.website}`,
          contactName: `${this.state.contactName}`,
          status: `${this.state.status}`,
          categories: {
            locationsThatOfferFreeWiFiPublicDevices: `${this.state.locationsThatOfferFreeWiFiPublicDevices}`,
            lowCostInternetServicesOrDeals: `${this.state.lowCostInternetServicesOrDeals}`,
            lowCostOrSubsidizedDevices: `${this.state.lowCostOrSubsidizedDevices}`,
            rentableLoanerDevices: `${this.state.rentableLoanerDevices}`,
            rentableLoanerHotspots: `${this.state.rentableLoanerHotspots}`,
            digitalLiteracyTrainingOptions: `${this.state.digitalLiteracyTrainingOptions}`,
            technicalAssistantForPublicDevicesOrSoftware: `${this.state.technicalAssistantForPublicDevicesOrSoftware}`,
            resourceToAssistGettingASmallBusinessOnline: `${this.state.resourceToAssistGettingASmallBusinessOnline}`,
            laptopAndDesktops: `${this.state.laptopAndDesktops}`,
            mobileDevices: `${this.state.mobileDevices}`,
            networkingDevices: `${this.state.networkingDevices}`,
          },
        },
      };
    } else if (this.state.email == null) {
      console.log("empty");
      update = {
        data: {
          resourceType: `${this.state.type}`,
          resourceName: `${this.state.name}`,
          offerStartDate: `${this.state.startDate}`,
          offerExpirationDate: `${this.state.endDate}`,
          address1: {
            address: `${this.state.address1}`,
            lat: `${this.state.lat}`,
            lon: `${this.state.lon}`
          },
          location: `${this.state.location}`,
          state: `${this.state.state}`,
          zipcode: `${this.state.zipcode}`,
          startDate: `${this.state.startDate}`,
          endDate: `${this.state.endDate}`,
          briefDescription: `${this.state.description}`,
          website: `${this.state.website}`,
          phoneNumber: `${this.state.phoneNumber}`,
          contactName: `${this.state.contactName}`,
          status: `${this.state.status}`,
          categories: {
            locationsThatOfferFreeWiFiPublicDevices: `${this.state.locationsThatOfferFreeWiFiPublicDevices}`,
            lowCostInternetServicesOrDeals: `${this.state.lowCostInternetServicesOrDeals}`,
            lowCostOrSubsidizedDevices: `${this.state.lowCostOrSubsidizedDevices}`,
            rentableLoanerDevices: `${this.state.rentableLoanerDevices}`,
            rentableLoanerHotspots: `${this.state.rentableLoanerHotspots}`,
            digitalLiteracyTrainingOptions: `${this.state.digitalLiteracyTrainingOptions}`,
            technicalAssistantForPublicDevicesOrSoftware: `${this.state.technicalAssistantForPublicDevicesOrSoftware}`,
            resourceToAssistGettingASmallBusinessOnline: `${this.state.resourceToAssistGettingASmallBusinessOnline}`,
            laptopAndDesktops: `${this.state.laptopAndDesktops}`,
            mobileDevices: `${this.state.mobileDevices}`,
            networkingDevices: `${this.state.networkingDevices}`,
          },
        },
      };
    } else if (this.state.phoneNumber == null) {
      update = {
        data: {
          resourceType: `${this.state.type}`,
          resourceName: `${this.state.name}`,
          offerStartDate: `${this.state.startDate}`,
          offerExpirationDate: `${this.state.endDate}`,
          address1: {
            address: `${this.state.address1}`,
            lat: `${this.state.lat}`,
            lon: `${this.state.lon}`
          },
          location: `${this.state.location}`,
          state: `${this.state.state}`,
          zipcode: `${this.state.zipcode}`,
          startDate: `${this.state.startDate}`,
          endDate: `${this.state.endDate}`,
          briefDescription: `${this.state.description}`,
          website: `${this.state.website}`,
          email: `${this.state.email}`,
          contactName: `${this.state.contactName}`,
          status: `${this.state.status}`,
          categories: {
            locationsThatOfferFreeWiFiPublicDevices: `${this.state.locationsThatOfferFreeWiFiPublicDevices}`,
            lowCostInternetServicesOrDeals: `${this.state.lowCostInternetServicesOrDeals}`,
            lowCostOrSubsidizedDevices: `${this.state.lowCostOrSubsidizedDevices}`,
            rentableLoanerDevices: `${this.state.rentableLoanerDevices}`,
            rentableLoanerHotspots: `${this.state.rentableLoanerHotspots}`,
            digitalLiteracyTrainingOptions: `${this.state.digitalLiteracyTrainingOptions}`,
            technicalAssistantForPublicDevicesOrSoftware: `${this.state.technicalAssistantForPublicDevicesOrSoftware}`,
            resourceToAssistGettingASmallBusinessOnline: `${this.state.resourceToAssistGettingASmallBusinessOnline}`,
            laptopAndDesktops: `${this.state.laptopAndDesktops}`,
            mobileDevices: `${this.state.mobileDevices}`,
            networkingDevices: `${this.state.networkingDevices}`,
          },
        },
      };
    } else {
      update = {
        data: {
          resourceType: `${this.state.type}`,
          resourceName: `${this.state.name}`,
          offerStartDate: `${this.state.startDate}`,
          offerExpirationDate: `${this.state.endDate}`,
          address1: {
            address: `${this.state.address1}`,
            lat: `${this.state.lat}`,
            lon: `${this.state.lon}`
          },
          location: `${this.state.location}`,
          state: `${this.state.state}`,
          zipcode: `${this.state.zipcode}`,
          startDate: `${this.state.startDate}`,
          endDate: `${this.state.endDate}`,
          briefDescription: `${this.state.description}`,
          website: `${this.state.website}`,
          phoneNumber: `${this.state.phoneNumber}`,
          email: `${this.state.email}`,
          contactName: `${this.state.contactName}`,
          status: `${this.state.status}`,
          categories: {
            locationsThatOfferFreeWiFiPublicDevices: `${this.state.locationsThatOfferFreeWiFiPublicDevices}`,
            lowCostInternetServicesOrDeals: `${this.state.lowCostInternetServicesOrDeals}`,
            lowCostOrSubsidizedDevices: `${this.state.lowCostOrSubsidizedDevices}`,
            rentableLoanerDevices: `${this.state.rentableLoanerDevices}`,
            rentableLoanerHotspots: `${this.state.rentableLoanerHotspots}`,
            digitalLiteracyTrainingOptions: `${this.state.digitalLiteracyTrainingOptions}`,
            technicalAssistantForPublicDevicesOrSoftware: `${this.state.technicalAssistantForPublicDevicesOrSoftware}`,
            resourceToAssistGettingASmallBusinessOnline: `${this.state.resourceToAssistGettingASmallBusinessOnline}`,
            laptopAndDesktops: `${this.state.laptopAndDesktops}`,
            mobileDevices: `${this.state.mobileDevices}`,
            networkingDevices: `${this.state.networkingDevices}`,
          },
        },
      };
    }
    console.log(update);
    const response = axios.post(
      "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission",
      update
    );
    console.log(response);
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
                  name="digitalLiteracyTrainingOptions"
                />
              }
              label="Digital Literacy Training Options"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="technicalAssistantForPublicDevicesOrSoftware"
                />
              }
              label="Technical Assistant for Public Devices or Software"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="resourceToAssistGettingASmallBusinessOnline"
                />
              }
              label="Resource to Assist Getting a Small Business Online"
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
                />
              }
              label="Low-Cost Internet Services Or Deals"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="lowCostOrSubsidizedDevices"
                />
              }
              label="Low-Cost Or Subsidized Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="locationsThatOfferFreeWiFiPublicDevices"
                />
              }
              label="Locations That Offer Free Wi-Fi/Public Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="rentableLoanerHotspots"
                />
              }
              label="Rentable/Loaner Hotspots"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="rentableLoanerDevices"
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
                  name="laptopsAndDesktops"
                />
              }
              label="Laptops and Desktops"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="mobileDevices"
                />
              }
              label="Mobile Devices"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleInputChange}
                  name="networkingDevices"
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
          variant="standard"
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
          name="zipcode"
          variant="standard"
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
    .catch((error) =>
      console.error("Error", error)
    );
  };

  handleClick = (address) => {
    console.log(address)
    geocodeByAddress(address.description)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({address1: address.description, lat: latLng.lat, long: latLng.lng}))
        .catch(error => console.error('Error', error));
}

  streetAddress() {
    return (
      <div>
        <PlacesAutocomplete
          style={placesStyle}
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
                      onClick={(e) => {this.handleClick(suggestion)}}
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
    
    return (
      <div style={appStyle}>
        <div style={headerStyle}>
          <Header></Header>
        </div>
        <Grid>
          <div style={bodyStyle}>
            <h2 style={h2Style}>
              <b>New Request</b>
            </h2>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <FormControl required style={typeStyle}>
                <InputLabel id="demo-simple-select-required-label">
                  Resource Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  displayEmpty
                  name="type"
                  onChange={this.handleInputChange}
                >
                  <MenuItem value="Digital Literacy">Digital Literacy</MenuItem>
                  <MenuItem value="Digital Resource">Digital Resource</MenuItem>
                  <MenuItem value="Donated Resource">Donated Resource</MenuItem>
                </Select>
              </FormControl>

              <TextField
                style={nameStyle}
                required
                size="medium"
                label="Resource Name"
                name="name"
                variant="standard"
                onChange={this.handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              <div style={checkboxesStyle}>
                <h5>
                  <b>Categories</b> (select all that apply)
                </h5>
                {value}
              </div>
              <div style={locationStyle}>
                <h5 style={locationText}>
                  <b>Location</b>
                </h5>
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-label="location"
                    name="location"
                    onChange={this.handleInputChange}
                  >
                    <FormControlLabel
                      value="noPhysicalAddress"
                      control={<Radio />}
                      label="No physical address"
                    />
                    <FormControlLabel
                      value="allOfOhio"
                      control={<Radio />}
                      label="All of Ohio"
                    />
                    <FormControlLabel
                      value="zipCode"
                      control={<Radio />}
                      label="Zip Code"
                    />
                    <FormControlLabel
                      value="streetAddress"
                      control={<Radio />}
                      label="Street Address"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={physicalAddressStyle}>
                <h5>
                  <b>Physical Address</b> (if applicable)
                </h5>
                {locationRadio}
              </div>
              <TextField
                required
                style={startDateStyle}
                id="date"
                label="Offer Start Date"
                type="date"
                name="startDate"
                onChange={this.handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                style={endDateStyle}
                id="date"
                label="Offer Expiration Date"
                type="date"
                name="endDate"
                onChange={this.handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                multiline
                rows="6"
                style={descriptionStyle}
                size="medium"
                label="Description"
                name="description"
                onChange={this.handleInputChange}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              <div style={link}>
                <h5>
                  <b>Link to Website</b>
                </h5>
                <TextField
                  style={linkStyle}
                  size="medium"
                  label="Website"
                  name="website"
                  onChange={this.handleInputChange}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div style={resourceContactStyle}>
                <h5>
                  <b>Resource Contact</b>
                </h5>
                <TextField
                  style={contactNameStyle}
                  size="medium"
                  label="Name (if applicable)"
                  name="contactName"
                  onChange={this.handleInputChange}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <InputMask
                  mask="(999) 999-9999"
                  onChange={this.handleInputChange}
                >
                  {() => (
                    <TextField
                      style={phoneNumberStyle}
                      label="Phone Number"
                      name="phoneNumber"
                      margin="normal"
                      type="text"
                    />
                  )}
                </InputMask>
                <TextField
                  style={emailStyle}
                  size="medium"
                  label="Email"
                  name="email"
                  onChange={this.handleInputChange}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div style={lineStyle}></div>
              <input
                style={submitStyle}
                type="submit"
                value="Save"
                onSubmit={this.handleSubmit}
              />
              <Link to="/">
                <div style={cancelStyle}>
                  <b>Cancel</b>
                </div>
              </Link>
            </form>
          </div>
        </Grid>
        {/* <Footer stlye={footerStyle}></Footer> */}
      </div>
    );
  }
}
