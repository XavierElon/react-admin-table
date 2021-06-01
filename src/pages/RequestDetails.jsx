import React, { setState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Details from "../Components/Details";
import { Radio } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import FilledInput from '@material-ui/core/FilledInput';

const appStyle = {
  textAlign: "center",
  width: "100%",
  height: "1080px",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "auto",
  paddingBottom: "72px",
};

const wrapperStyle = {
  paddingBottom: "72px",
};

const headerStyle = {
  position: "absolute",
  width: "100%",
  height: "80px",
  backgroundColor: "#white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
};

const h2Style = {
  position: "absolute",
  left: "3%",
  width: "500px",
  height: "23px",
  fontFamily: "Source Sans Pro",
  fontSize: "18px",
  color: "#222222",
  textDecoration: "none solid rgb(34, 34, 34)",
  textTransform: "uppercase",
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
  left: "72%",
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

const radioText = {};

const physicalAddressStyle = {
  position: "absolute",
  top: "80%",
  left: "10%",
  textAlign: "left",
};

const streetAddressStyle = {
  width: "200px",
};

const streetAddress2Style = {
  width: "200px",
  position: "absolute",
  top: "30%",
  left: "345%",
};

const cityStyle = {
  width: "200px",
  position: "absolute",
  top: "10rem",
  left: "0%",
};

const stateStyle = {
  width: "200px",
  position: "absolute",
  top: "10rem",
  left: "35rem",
};

const zipcodeStyle = {
  width: "200px",
  position: "absolute",
  top: "10rem",
  left: "69rem",
};

const startDateStyle = {
  width: "200px",
  position: "absolute",
  top: "60rem",
  left: "10%",
};

const endDateStyle = {
  width: "200px",
  position: "absolute",
  top: "60rem",
  left: "42%",
};

const descriptionStyle = {
  width: "550px",
  position: "absolute",
  top: "70rem",
  left: "10%",
};

const link = {
  position: "absolute",
  top: "85rem",
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
  top: "95rem",
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
  top: "5rem",
  left: "35rem",
  width: "200px",
};

const emailStyle = {
  position: "absolute",
  top: "5rem",
  left: "70rem",
  width: "200px",
};

const lineStyle = {
  width: "1080px",
  height: "1px",
  strokeWidth: "1",
  backgroundColor: "#d8d8d8",
  position: "absolute",
  top: "110rem",
  left: "10rem"
}

const statusStyle = {
  position: "absolute",
  top: "112rem",
  left: "10rem"
}

const statusTextStyle = {
  textAlign: "left"
}

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/${this.state.id}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result");
        console.log(result);
        console.log(
          result.data.categoriesSelectAllThatApply
            .lowCostInternetServicesOrDeals
        );
        this.setState({
          type: result.data.resourceType,
          name: result.data.resourceName,
          categories: result.data.categoriesSelectAllThatApply,
          locationsThatOfferFreeWiFiPublicDevices:
            result.data.categoriesSelectAllThatApply
              .locationsThatOfferFreeWiFiPublicDevices,
          lowCostInternetServicesOrDeals:
            result.data.categoriesSelectAllThatApply
              .lowCostInternetServicesOrDeals,
          lowCostOrSubsidizedDevices:
            result.data.categoriesSelectAllThatApply.lowCostOrSubsidizedDevices,
          rentableLoanerDevices:
            result.data.categoriesSelectAllThatApply.rentableLoanerDevices,
          rentableLoanerHotspots:
            result.data.categoriesSelectAllThatApplyrentableLoanerHotspots,
          address: result.data.address.address,
          streetAddress:
            result.data.address.address.house_number +
            " " +
            result.data.address.address.road,
          neighborhood: result.data.address.address.neighbourhood,
          city: result.data.address.address.city,
          state: result.data.address.address.state,
          zipcode: result.data.address.address.postcode,
          startDate: result.data.offerStartDate.substr(
            0,
            result.data.offerStartDate.length - 14
          ),
          endDate: result.data.offerExpirationDate.substr(
            0,
            result.data.offerExpirationDate.length - 14
          ),
          description: result.data.briefDescription,
          website: result.data.linkToWebsite,
          contactName: result.data.contactName,
          phoneNumber: result.data.phoneNumber,
          email: result.data.email,
          status: result.data.state,
        });
      });
  }

  useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  handleChange(event) {
    console.log(event.target.value)
    this.setState({name: event.target.value});
    console.log("change")
    console.log("name = " + this.state.name)
  }

  render() {
    console.log(this.state.type);
    console.log(this.state.name);
    return (
      <div style={appStyle} className="App">
        <div style={wrapperStyle} className="Content-Wrap">
          <div style={headerStyle} className="Header">
            <Header></Header>
          </div>
          <div className="DataTable">
            <h2 style={h2Style}>
              <b>Request #{this.state.id}</b>
            </h2>
            <form noValidate autoComplete="off">
              <FormControl style={typeStyle}>
                <Select
                  value={this.state.type ? this.state.type : " "}
                  displayEmpty
                  onChange={(e) => setState((this.state.type = e.target.value))}
                  // inputProps={{ "aria-label": "Without label" }}
                >
                  {/* <MenuItem value={this.state.type} disabled>
                    {this.state.type}
                  </MenuItem> */}
                  <MenuItem value="Donated Resource">Donated Resource</MenuItem>
                  <MenuItem value="Digital Resource">Digital Resource</MenuItem>
                </Select>
                <FormHelperText>Resource Type</FormHelperText>
              </FormControl>
              {/* <FormControl variant="standard" stlye={nameStyle}>
                <InputLabel htmlFor="component-filled">Name</InputLabel>
                <FilledInput
                  id="component-filled"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormControl> */}
              <TextField
                  style={nameStyle}
                  size="medium"
                  label="Resource Name"
                  value={this.state.name}
                  variant="standard"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              <div style={checkboxesStyle}>
                <h5>
                  <b>Categories</b> (select all that apply)
                </h5>
                <FormControl component="fieldset">
                  <FormLabel component="legend"></FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.lowCostInternetServicesOrDeals}
                          onChange=""
                          name="lowCostInternet"
                        />
                      }
                      label="Low-Cost Internet Services Or Deals"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.lowCostOrSubsidizedDevices}
                          onChange=""
                          name="subsidizedDevices"
                        />
                      }
                      label="Low-Cost Or Subsidized Devices"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            this.state.locationsThatOfferFreeWiFiPublicDevices
                          }
                          onChange=""
                          name="freeWifi"
                        />
                      }
                      label="Locations That Offer Free Wi-Fi/Public Devices"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.rentableLoanerHotspots}
                          onChange=""
                          name="hotspots"
                        />
                      }
                      label="Rentable/Loaner Hotspots"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.rentableLoanerDevices}
                          onChange=""
                          name="loanerDevices"
                        />
                      }
                      label="Rentable/Loaner Devices"
                    />
                  </FormGroup>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </div>
              <div style={locationStyle}>
                <h5 style={locationText}>
                  <b>Location</b>
                </h5>
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    style={radioText}
                    row
                    aria-label="location"
                    name="location1"
                    value="Location"
                    onChange=""
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="No physical address"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="All of Ohio"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Zip Code"
                    />
                    <FormControlLabel
                      value="true"
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
                <TextField
                  style={streetAddressStyle}
                  size="medium"
                  label="Street Address 1"
                  value=""
                  variant="standard"
                ></TextField>
                <TextField
                  style={streetAddress2Style}
                  size="medium"
                  label="Street Address 2"
                  value=""
                  variant="standard"
                ></TextField>
                <TextField
                  style={cityStyle}
                  size="medium"
                  label="City"
                  value=""
                  variant="standard"
                ></TextField>
                <TextField
                  style={stateStyle}
                  size="medium"
                  label="State"
                  value=""
                  variant="standard"
                ></TextField>
                <TextField
                  style={zipcodeStyle}
                  size="medium"
                  label="Zipcode"
                  value=""
                  variant="standard"
                ></TextField>
              </div>
            </form>
            <form noValidate>
              <TextField
                style={startDateStyle}
                id="date"
                label="Offer Start Date"
                type="date"
                defaultValue={this.state.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={endDateStyle}
                id="date"
                label="Offer Expiration Date"
                type="date"
                defaultValue={this.state.startDate}
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
                defaultValue=" "
                variant="standard"
              ></TextField>
              <div style={link}>
                <h5>
                  <b>Link to Website</b>
                </h5>
                <TextField
                  style={linkStyle}
                  size="medium"
                  label="website "
                  defaultValue=" flocka"
                  variant="standard"
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
                  defaultValue=" "
                  variant="standard"
                ></TextField>
                <TextField
                  style={phoneNumberStyle}
                  size="medium"
                  label="Phone Number"
                  defaultValue=" "
                  variant="standard"
                ></TextField>
                <TextField
                  style={emailStyle}
                  size="medium"
                  label="Email"
                  defaultValue=" "
                  variant="standard"
                ></TextField>
              </div>
              <div style={lineStyle}>
              </div>
              <div style={statusStyle}>
                <h5 style={statusTextStyle}><b>Status</b></h5>
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    style={radioText}
                    row
                    aria-label="location"
                    name="status"
                    value="Status"
                    onChange=""
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Approve"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Deny"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Disable"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Delete"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </form>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
