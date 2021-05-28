import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Details from "../Components/Details";
import { Radio } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const appStyle = {
  textAlign: "center",
  width: "100%",
  height: "774px",
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

// const tableStyle = {
//   position: "absolute",
//   marginLeft: "auto",
//   marginRight: "auto",
//   width: "1080px",
//   height: "523px",
//   marginTop: "60px",
// };

const h2Style = {
  position: "absolute",
  left: "0px",
  width: "500px",
  height: "23px",
  fontFamily: "Source Sans Pro",
  fontSize: "18px",
  color: "#222222",
  textDecoration: "none solid rgb(34, 34, 34)",
};

const typeStyle = {
  position: "absolute",
  top: "30px",
  height: "20px",
  left: "100px",
};

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    fetch(
      `https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/${this.state.id}`
    )
      .then((res) => res.json())
      .then((result) => {
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

  render() {
    console.log(this.state.type);
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
              <TextField
                required
                size="small"
                style={typeStyle}
                label="Listing Type"
                defaultValue={this.state.type}
                variant="filled"
                color="#700017"
              ></TextField>
            </form>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
