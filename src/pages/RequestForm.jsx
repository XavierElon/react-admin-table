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
      userOhid: window.portalUserID,
      email: "",
      phoneNumber: "",
      address1: "",
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

    update = {
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
      <div>
        <FormControl
          component="fieldset"
          className="owt-content-donated-resources"
        >
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
        </FormControl>
      </div>
    );
  }

  allOfOhio() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <label class="ohio-field">
              <p className="owt-content-state-label">State</p>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <TextField
              className="owt-content-state"
              style={stateStyle}
              onChange={this.handleInputChange}
              size="medium"
              name="state"
              value="Ohio"
              variant="outlined"
              margin="dense"
            ></TextField>
          </div>
        </div>
      </div>
    );
  }

  zipCode() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <label class="ohio-field">
              <p className="owt-content-zipcode-label">Zipcode</p>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <TextField
              className="owt-content-zip-code"
              style={zipcodeStyle}
              onChange={this.handleInputChange}
              size="medium"
              name="zipCode"
              variant="outlined"
              margin="dense"
              value={this.state.zipCode}
            ></TextField>
          </div>
        </div>
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
    console.log("state OHID= " + this.state.userOhid);
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
      <main className="owt-content-main-body">
        <article className="owt-content-form-page">
          <p className="owt-content-new-entry-form-text">
            <b>New Entry Form</b>
          </p>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <label class="ohio-field">
                  <span className="owt-content-listing-type-label">
                    Listing Type
                  </span>
                </label>
              </div>
              <div className="col-sm-6">
                <label class="ohio-field">
                  <span className="owt-content-listing-name-label">
                    Resource Name
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label class="ohio-field">
                  <FormControl required>
                    <Select
                      style={typeStyle}
                      labelId="demo-simple-select-required-label"
                      displayEmpty
                      margin="dense"
                      name="type"
                      variant="outlined"
                      onChange={this.handleInputChange}
                      value={this.state.type}
                    >
                      <MenuItem value="Digital Literacy">
                        Digital Literacy
                      </MenuItem>
                      <MenuItem value="Digital Resource">
                        Digital Resource
                      </MenuItem>
                      <MenuItem value="Donated Resource">
                        Donated Resource
                      </MenuItem>
                    </Select>
                  </FormControl>
                </label>
              </div>
              <div className="col-sm-6">
                <label class="ohio-field">
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
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <label className="ohio-field">
                  <span className="owt-content-categories-label">
                    <b>Categories</b> (select all that apply)
                  </span>
                  {value}
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-location-label">
                    <b>Location</b>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <FormControl
                    component="fieldset"
                    className="owt-content-location-field"
                  >
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
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-physical-address-label">
                    <p>
                      <b>Physical Address</b> (if applicable)
                    </p>
                  </span>
                  {locationRadio}
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                  <span className="owt-content-physical-start-date-label">
                    <p>Offer Start Date</p>
                  </span>
              </div>
              <div className="col-sm-6">
                  <span className="owt-content-physical-expiration-date-label">
                    <p>Offer Expiration Date</p>
                  </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-start-date-field">
                    <TextField
                      required
                      style={startDateStyle}
                      id="date"
                      type="date"
                      name="startDate"
                      variant="outlined"
                      margin="dense"
                      onChange={this.handleInputChange}
                    />
                  </span>
                </label>
              </div>
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-expiration-date-field">
                    <TextField
                      required
                      style={endDateStyle}
                      id="date"
                      type="date"
                      name="endDate"
                      variant="outlined"
                      margin="dense"
                      onChange={this.handleInputChange}
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-location-label">
                    <p>Brief Description</p>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <TextField
                  className="owt-content-description-field"
                  multiline
                  style={descriptionStyle}
                  rows="5"
                  size="medium"
                  name="description"
                  onChange={this.handleInputChange}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-website-label">
                    <p>Link to Website</p>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <TextField
                  className="owt-content-website-field"
                  size="medium"
                  name="linkToWebsite"
                  style={websiteStyle}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span className="owt-content-resource-contact-label">
                    <p>Resource Contact</p>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-name-label">
                  <p>Name (if Applicable)</p>
                </span>
              </div>
              <div className="col-sm-3">
                <span className="owt-content-number-label">
                  <p>Phone Number</p>
                </span>
              </div>
              <div className="col-sm-3">
                <span className="owt-content-email-label">
                  <p>Email</p>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <TextField
                  className="owt-content-name-field"
                  size="medium"
                  name="contactName"
                  style={contactNameStyle}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </div>
              <div className="col-sm-3">
                <InputMask
                  mask="(999) 999-9999"
                  onChange={this.handleInputChange}
                >
                  {() => (
                    <TextField
                      className="owt-content-phone-field"
                      name="phoneNumber"
                      style={phoneStyle}
                      margin="dense"
                      variant="outlined"
                      type="text"
                    />
                  )}
                </InputMask>
              </div>
              <div className="col-sm-3">
                <TextField
                  className="owt-content-email-field"
                  size="medium"
                  style={emailStyle}
                  name="email"
                  onChange={this.handleInputChange}
                  variant="outlined"
                  margin="dense"
                ></TextField>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="owt-content-line-div" style={lineStyle}></div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <Link to="/">
                  <div
                    style={cancelStyle}
                    className="owt-content-cancel-button"
                  >
                    <b>Cancel</b>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6">
                <input
                  className="owt-content-submit-button"
                  style={submitStyle}
                  type="submit"
                  value="Save"
                  onSubmit={this.handleSubmit}
                />
              </div>
            </div>

            <Grid item xs={6} className="owt-content-cancel-button"></Grid>
            <Grid item xs={6} className="owt-content-submit-button"></Grid>
          </form>
        </article>
      </main>
    );
  }
}
