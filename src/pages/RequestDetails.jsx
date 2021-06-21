import React from "react";
import { Link } from "react-router-dom";
import { Radio } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputMask from "react-input-mask";
import "date-fns";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Form } from 'react-formio';
import {FormBuilder} from '@formio/react';
import Constants from "../helpers/constants";

const typeStyle = {
  width: "400px",
};

const nameStyle = {
  width: "400px",
};

const stateStyle = {
  width: "200px",
};

const zipcodeStyle = {
  width: "200px",
};

const placesStyle = {
  width: "400px",
};

const startDateStyle = {
  width: "200px",
};

const endDateStyle = {
  width: "200px",
};

const descriptionStyle = {
  width: "400px",
};

const websiteStyle = {
  width: "400px",
};

const contactNameStyle = {
  width: "400px",
};

const phoneStyle = {
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

const ohidStyle = {
  width: "200px",
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

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
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

  componentDidMount() {
    fetch(`${Constants.DFRT_FORM_URL}/${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          type: result.data.resourceType,
          name: result.data.resourceName,
          locationsThatOfferFreeWiFiPublicDevices: JSON.parse(
            result.data.categories.locationsThatOfferFreeWiFiPublicDevices
          ),
          lowCostInternetServicesOrDeals: JSON.parse(
            result.data.categories.lowCostInternetServicesOrDeals
          ),
          lowCostOrSubsidizedDevices: JSON.parse(
            result.data.categories.lowCostOrSubsidizedDevices
          ),
          rentableLoanerDevices: JSON.parse(
            result.data.categories.rentableLoanerDevices
          ),
          rentableLoanerHotspots: JSON.parse(
            result.data.categories.rentableLoanerHotspots
          ),
          digitalLiteracyTrainings: JSON.parse(
            result.data.categories.digitalLiteracyTrainings
          ),
          assistanceForDevicesOrSoftware: JSON.parse(
            result.data.categories.assistanceForDevicesOrSoftware
          ),
          assistanceGettingASmallBusinessOnline: JSON.parse(
            result.data.categories.assistanceGettingASmallBusinessOnline
          ),
          laptopsAndDesktops: JSON.parse(
            result.data.categories.laptopsAndDesktops
          ),
          mobileDevices: JSON.parse(result.data.categories.mobileDevices),
          networkingDevices: JSON.parse(
            result.data.categories.networkingDevices
          ),
          location: result.data.location,
          address1: result.data.address1.address,
          lat: result.data.address1.lat,
          lon: result.data.address1.lon,
          state: result.data.state,
          zipCode: result.data.zipCode,
          startDate: result.data.offerStartDate.substr(
            0,
            result.data.offerStartDate.length - 14
          ),
          endDate: result.data.offerExpirationDate.substr(
            0,
            result.data.offerExpirationDate.length - 14
          ),
          description: result.data.briefDescription,
          linkToWebsite: result.data.linkToWebsite,
          contactName: result.data.contactName,
          phoneNumber: result.data.phoneNumber,
          email: result.data.email,
          status: result.data.status,
          deniedComment: result.data.deniedComment,
          userOhid: result.data.userOhid,
        });
      });
  }

  handleInputChange = (event) => {
    console.log(event)
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
    if (this.state.status === "deleted") {
      const response = await axios.delete(
        `${Constants.DFRT_FORM_URL}/${this.state.id}`
      );
      console.log(response);
      await this.sleep(1000);
      this.props.history.push("/");
    }

    const update = {
      data: {
        resourceType: `${this.state.type}`,
        resourceName: `${this.state.name}`,
        offerStartDate: `${this.state.startDate}`,
        offerExpirationDate: `${this.state.endDate}`,
        address1: {
          address: `${this.state.address1}`,
          lat: `${this.state.lat}`,
          lon: `${this.state.lon}`,
        },
        location: `${this.state.location}`,
        state: `${this.state.state}`,
        zipCode: `${this.state.zipCode}`,
        briefDescription: `${this.state.description}`,
        linkToWebsite: `${this.state.linkToWebsite}`,
        contactName: `${this.state.contactName}`,
        phoneNumber: `${this.state.phoneNumber}`,
        email: `${this.state.email}`,
        status: `${this.state.status}`,
        userOhid: `${this.state.userOhid}`,
        deniedComment: `${this.state.deniedComment}`,
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
    if (this.state.status !== "deleted") {
      console.log(update);
      const response = await axios.put(
        `${Constants.DFRT_FORM_URL}/${this.state.id}`,
        update
      );
      console.log(response);
      console.log("status = " + this.state.status);

      if (this.state.status === "approved") {
        this.props.history.push(`/requestapproved/${this.state.id}`);
      } else if (this.state.status === "denied") {
        this.props.history.push(`/denydetails/${this.state.id}`);
      } else {
        this.props.history.push("/");
      }
    }
  }

  digitalLiteracy() {
    return (
      <div className="owt-content-digital-literacy">
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
      <div className="owt-content-digital-resources">
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
      <div className="owt-content-donated-resources">
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
      <div className="owt-content-state">
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
      <div className="owt-content-zip-code">
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
      <div class="owt-content-google-places">
        <PlacesAutocomplete
          value={this.state.address1}
          name="address"
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
                style={placesStyle}
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
    console.log("type = " + this.state.type);

    return (
      <div className="owt-content-main-body">
        {/* <Form src="https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/60d08f28a4996a5875d08dec"/> */}
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} className="owt-content-new-entry-form-title">
              <p>
                <b>Request #{this.state.id}</b>
              </p>
            </Grid>
            <Grid item xs={6} className="owt-content-listing-type-text">
              <p>Listing Type</p>
            </Grid>
            <Grid item xs={6} className="owt-content-resource-name-text">
              <p>Resource Name</p>
            </Grid>

            <Grid item xs={6} className="owt-content-resource-type">
              <FormControl required>
                <Select
                  style={typeStyle}
                  labelId="demo-simple-select-required-label"
                  displayEmpty
                  margin="dense"
                  name="type"
                  variant="outlined"
                  onChange={this.handleInputChange}
                  value={this.state.type ? this.state.type : ""}
                >
                  <MenuItem value="Digital Literacy">Digital Literacy</MenuItem>
                  <MenuItem value="Digital Resource">Digital Resource</MenuItem>
                  <MenuItem value="Donated Resource">Donated Resource</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} className="owt-content-resource-name">
              <TextField
                style={nameStyle}
                required
                value={this.state.resourceName}
                size="medium"
                name="name"
                variant="outlined"
                margin="dense"
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} className="owt-content-categories-text">
              <p>
                <b>Categories</b> (select all that apply)
              </p>
            </Grid>
            <Grid item xs={12} className="owt-content-categories">
              {value}
            </Grid>
            <Grid item xs={12} className="owt-content-location-text">
              <p className="LocationText">
                <b>Location</b>
              </p>
            </Grid>
            <Grid item xs={12} className="owt-content-location-radios">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="location"
                  name="location"
                  value={this.state.location}
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
            <Grid item xs={12} className="owt-content-physical-address-text">
              <p>
                <b>Physical Address</b> (if applicable)
              </p>
            </Grid>
            <Grid item xs={12} className="owt-content-location">
              {locationRadio}
            </Grid>
            <Grid item xs={6} className="owt-content-start-date-text">
              <p>Offer Start Date</p>
            </Grid>
            <Grid item xs={6} className="owt-content-end-date-text">
              <p>Offer Expiration Date</p>
            </Grid>
            <Grid item xs={6} className="owt-content-start-date">
              <TextField
                required
                style={startDateStyle}
                value={this.state.startDate}
                id="date"
                type="date"
                name="startDate"
                variant="outlined"
                margin="dense"
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={6} className="owt-content-end-date">
              <TextField
                required
                style={endDateStyle}
                value={this.state.endDate}
                id="date"
                type="date"
                name="endDate"
                variant="outlined"
                margin="dense"
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className="owt-content-description-text">
              <p>Brief Description</p>
            </Grid>
            <Grid item xs={12} className="owt-content-description">
              <TextField
                multiline
                style={descriptionStyle}
                value={this.state.description}
                rows="4"
                size="medium"
                name="description"
                onChange={this.handleInputChange}
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>
            <Grid item xs={12} className="owt-content-link-to-website-text">
              <p>Link to Website</p>
            </Grid>
            <Grid item xs={12} className="owt-content-link-to-website">
              <TextField
                size="medium"
                name="linkToWebsite"
                value={this.state.linkToWebsite}
                style={websiteStyle}
                onChange={this.handleInputChange}
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>
            <Grid item xs={6} className="owt-content-name-text">
              <p>Name (if Applicable)</p>
            </Grid>
            <Grid item xs={3} className="owt-content-phone-text">
              <p>Phone Number</p>
            </Grid>
            <Grid item xs={3} className="owt-content-email-text">
              <p>Email</p>
            </Grid>
            <Grid item xs={6} className="owt-content-name">
              <TextField
                size="medium"
                name="contactName"
                value={this.state.contactName}
                style={contactNameStyle}
                onChange={this.handleInputChange}
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>
            <Grid item xs={3} className="owt-content-phone">
              <InputMask
                mask="(999) 999-9999"
                onChange={this.handleInputChange}
              >
                {() => (
                  <TextField
                    name="phoneNumber"
                    style={phoneStyle}
                    margin="dense"
                    variant="outlined"
                    value={this.state.phone}
                    type="text"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={3} className="owt-content-email">
              <TextField
                size="medium"
                style={emailStyle}
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                variant="outlined"
                margin="dense"
              ></TextField>
            </Grid>
            <Grid item xs={12} className="owt-content-line-div">
              <div style={lineStyle}></div>
            </Grid>
            <Grid item xs={6} className="owt-content-status-text">
              <p>Status</p>
            </Grid>
            <Grid item xs={6} className="owt-content-ohid-text">
              <p>OHID</p>
            </Grid>
            <Grid item xs={6} className="owt-content-status">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="location"
                  value={this.state.status}
                  name="status"
                  onChange={this.handleInputChange}
                >
                  <FormControlLabel
                    value="approved"
                    control={<Radio />}
                    label="Approve"
                  />
                  <FormControlLabel
                    value="denied"
                    control={<Radio />}
                    label="Deny"
                  />
                  <FormControlLabel
                    value="disabled"
                    control={<Radio />}
                    label="Disable"
                  />
                  <FormControlLabel
                    value="deleted"
                    control={<Radio />}
                    label="Delete"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} className="owt-content-ohid">
              <TextField
                style={ohidStyle}
                size="medium"
                name="userOhid"
                value={this.state.userOhid}
                onChange={this.handleInputChange}
                variant="standard"
              ></TextField>
            </Grid>
            <Grid item xs={6} className="owt-content-cancel-button">
              <Link to="/">
                <div style={cancelStyle}>
                  <b>Cancel</b>
                </div>
              </Link>
            </Grid>
            <Grid item xs={6} className="owt-content-submit-button">
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
