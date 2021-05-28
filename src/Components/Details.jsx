import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';

  
  

  
  export default class Details extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: ""
      }
      console.log(props)
  
    }
  
    componentDidMount() {
      fetch(
        `https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/${this.state.id}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({
            type: result.data.resourceType,
            name: result.data.resourceName,
            categories: result.data.categoriesSelectAllThatApply,
            locationsThatOfferFreeWiFiPublicDevices: result.data.categoriesSelectAllThatApply.locationsThatOfferFreeWiFiPublicDevices,
            lowCostInternetServicesOrDeals: result.data.categoriesSelectAllThatApply.lowCostInternetServicesOrDeals,
            lowCostOrSubsidizedDevices: result.data.categoriesSelectAllThatApply.lowCostOrSubsidizedDevices,
            rentableLoanerDevices: result.data.categoriesSelectAllThatApply.rentableLoanerDevices,
            rentableLoanerHotspots: result.data.categoriesSelectAllThatApplyrentableLoanerHotspots,
            address: result.data.address.address,
            streetAddress: result.data.address.address.house_number + " " + result.data.address.address.road,
            neighborhood: result.data.address.address.neighbourhood,
            city: result.data.address.address.city,
            state: result.data.address.address.state,
            zipcode: result.data.address.address.postcode,
            startDate: result.data.offerStartDate.substr(0, result.data.offerStartDate.length - 14),
            endDate: result.data.offerExpirationDate.substr(0, result.data.offerExpirationDate.length - 14),
            description: result.data.briefDescription,
            website: result.data.linkToWebsite,
            contactName: result.data.contactName,
            phoneNumber: result.data.phoneNumber,
            email: result.data.email,
            status: result.data.state
          })
          
        });
    }
  
    render() {
      return (
        <div>
          <TextField></TextField>
        </div>
      );
    }
  }
  