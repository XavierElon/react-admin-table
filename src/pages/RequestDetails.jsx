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
      resourceName: "",
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

  componentDidMount() {
    fetch(`${Constants.DFRT_FORM_URL}/${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          type: result.data.resourceType,
          resourceName: result.data.resourceName,
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
    console.log(event);
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
        resourceName: `${this.state.resourceName}`,
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
      <div>
        <div className="owt-content-donated-resources">
          <FormControl
            component="fieldset"
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
      </div>
    );
  }

  allOfOhio() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
              <p className="owt-content-state-label">State</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <span className="owt-content-state-field">
              <TextField
                style={stateStyle}
                className="owt-content-state-textfield"
                onChange={this.handleInputChange}
                size="medium"
                name="state"
                value="Ohio"
                variant="outlined"
                margin="dense"
              ></TextField>
            </span>
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
              <p className="owt-content-zipcode-label">Zipcode</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <span className="owt-content-zipcode-field">
              <TextField
                style={zipcodeStyle}
                className="owt-content-zipcode-textfield"
                onChange={this.handleInputChange}
                size="medium"
                name="zipCode"
                variant="outlined"
                margin="dense"
                value={this.state.zipCode}
              ></TextField>
            </span>
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
    console.log("naem = " + this.state.resourceName)
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
      <main className="owt-content-main-body container">
        <article className="owt-content-form-page">
          <h2 className="owt-content-request-number-text">
            <b>Request #{this.state.id}</b>
          </h2>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-listing-type-label">
                  Listing Type
                </span>
              </div>
              <div className="col-sm-6">
                <span className="owt-content-listing-name-label">
                  Resource Name
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="owt-content-type-field">
                  <FormControl required>
                    <Select
                      style={typeStyle}
                      className="owt-content-type-textfield"
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
                </div>
              </div>
              <div className="col-sm-6">
                <div className="owt-content-resource-name-field">
                  <TextField
                    style={nameStyle}
                    className="owt-content-name-textfield"
                    required
                    value={this.state.resourceName}
                    size="medium"
                    name="name"
                    variant="outlined"
                    margin="dense"
                    onChange={this.handleInputChange}
                  ></TextField>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <span>
                  <p className="owt-content-categories-label">
                    <b>Categories</b> (select all that apply)
                  </p>
                </span>
                {value}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span>
                    <p className="owt-content-location-label">Location</p>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="owt-content-location-field">
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
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-physical-address-label">
                    <b>Physical Address</b> (if applicable)
                  </p>
                </span>
                {locationRadio}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-start-date-label">
                    Offer Start Date
                  </p>
                </span>
              </div>
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-expiration-date-label">
                    Offer Expiration Date
                  </p>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-start-date-field">
                  <TextField
                    required
                    style={startDateStyle}
                    className="owt-content-start-date-textfield"
                    id="date"
                    type="date"
                    name="startDate"
                    variant="outlined"
                    margin="dense"
                    onChange={this.handleInputChange}
                  />
                </span>
              </div>
              <div className="col-sm-6">
                <span className="owt-content-expiration-date-field">
                  <TextField
                    required
                    style={endDateStyle}
                    className="owt-content-end-date-textfield"
                    id="date"
                    type="date"
                    name="endDate"
                    variant="outlined"
                    margin="dense"
                    onChange={this.handleInputChange}
                  />
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-description-label">
                    Brief Description
                  </p>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-description-field">
                  <TextField
                    multiline
                    style={descriptionStyle}
                    className="owt-content-description-textfield"
                    rows="5"
                    size="medium"
                    name="description"
                    onChange={this.handleInputChange}
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-website-label">Link to Website</p>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-website-field">
                  <TextField
                    size="medium"
                    name="linkToWebsite"
                    style={websiteStyle}
                    className="owt-content-website-textfield"
                    onChange={this.handleInputChange}
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="ohio-field">
                  <span>
                    <p className="owt-content-resource-contact-label">
                      Resource Contact
                    </p>
                  </span>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-name-label">Name (if Applicable)</p>
                </span>
              </div>
              <div className="col-sm-3">
                <span>
                  <p className="owt-content-number-label">Phone Number</p>
                </span>
              </div>
              <div className="col-sm-3">
                <span>
                  <p className="owt-content-email-label">Email</p>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span className="owt-content-name-field">
                  <TextField
                    size="medium"
                    name="contactName"
                    style={contactNameStyle}
                    className="owt-content-contact-name-textfield"
                    onChange={this.handleInputChange}
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </span>
              </div>
              <div className="col-sm-3">
                <span className="owt-content-phone-field">
                  <InputMask
                    mask="(999) 999-9999"
                    onChange={this.handleInputChange}
                  >
                    {() => (
                      <TextField
                        name="phoneNumber"
                        style={phoneStyle}
                        className="owt-content-phone-textfield"
                        margin="dense"
                        variant="outlined"
                        type="text"
                      />
                    )}
                  </InputMask>
                </span>
              </div>
              <div className="col-sm-3">
                <span className="owt-content-email-field">
                  <TextField
                    size="medium"
                    style={emailStyle}
                    className="owt-content-email-textfield"
                    name="email"
                    onChange={this.handleInputChange}
                    variant="outlined"
                    margin="dense"
                  ></TextField>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div
                  className="owt-content-line-div owt-content-line-style"
                  style={lineStyle}
                ></div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label>
                  <span>
                    <p className="owt-content-status-label">Status</p>
                  </span>
                </label>
              </div>
              <div className="col-sm-6">
                <span className="owt-content-status-field">
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
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <span>
                  <p className="owt-content-ohid-label">OHID</p>
                </span>
              </div>
              <div className="col-sm-6">
                <span className="owt-content-ohid-field">
                  <TextField
                    style={ohidStyle}
                    size="medium"
                    name="userOhid"
                    margin="dense"
                    value={this.state.userOhid}
                    onChange={this.handleInputChange}
                    variant="outlined"
                  ></TextField>
                </span>
              </div>
            </div>

            <div className="row owt-content-submit-cancel-buttons">
              <div className="col-sm-1">
                <Link to="/">
                  <div
                    style={cancelStyle}
                    className="owt-content-cancel-button"
                  >
                    <b>Cancel</b>
                  </div>
                </Link>
              </div>
              <div className="col-sm-1">
                <input
                  style={submitStyle}
                  className="owt-content-submit-button"
                  type="submit"
                  value="Save"
                  onSubmit={this.handleSubmit}
                />
              </div>
            </div>
          </form>
        </article>
      </main>
    );
  }
}
