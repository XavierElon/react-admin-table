var formURL =
  "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission";
var getLastPath = function (completePath) {
  console.log("Calling last path");

  console.log("Current path", completePath);
  pathname = pathname.replace(/\/$/, "");
  console.log("Last Index 2", pathname.substr(pathname.lastIndexOf("/") + 1));
  pathname = pathname.substr(pathname.lastIndexOf("/") + 1);

  return pathname;
};

function mapSearchResults(formArray) {
  var formSearchResults =
    '<div class="odx-carousel-cards__list">' +
    formArray
      .map(function (form) {
        if (form.formnumber !== "") {
          var encodedForm = btoa(
            unescape(encodeURIComponent(JSON.stringify(form)))
          );

          // console.log('Calling iniital map function encoded',encodeForm);
          console.log("*******Categories", form.lowCostOrSubsidizedDevices);

          var locationFragment = "";
          if (form.addresslocationBoolean) {
            locationFragment =
              '<div  class="contact-item ' +
              form.showAdressSection +
              '">' +
              '<h4><i class="fas fa-map-marker-alt"></i><strong>See Address on the Map</strong></h4>' +
              '<div style="word-break:break-all"><a href="/wps/myportal/gov/owt/map?formdata=' +
              encodedForm +
              '">' +
              form.displayAddress +
              "</a></div>" +
              "</div>";
          } else {
            locationFragment =
              '<div class="contact-item ' +
              form.showAdressSection +
              '">' +
              '<h4><i class="fas fa-map-marker-alt"></i><strong>See address on the map</strong></h4>' +
              '<div style="word-break:break-all"><a href="/wps/myportal/gov/owt/map?formdata=' +
              encodedForm +
              '">' +
              form.displayAddress +
              "</a></div>" +
              "</div>";
          }
          return (
            '<div class="odx-carousel-cards-item">' +
            '<div class="ohio-card ohio-card--center ohio-card-container">' +
            '<section class="ohio-card-content">' +
            '<div class="ohio-card-content-left col-xs-12 col-sm-8"><h4>' +
            "</h4>" +
            '<h3 class="ohio-card-content-header">' +
            form.resourceName +
            "</h3>" +
            "<h6>" +
            form.briefDescription +
            "</h6>" +
            '<div class="ohio-card-content-info">' +
            '<div id="resource-type-category-' +
            form.formNumber +
            '" class="contact-item collapse multi-collapse-' +
            form.formNumber +
            '">' +
            "<h4><strong>" +
            form.resourceType +
            "</strong></h4>" +
            '<div style="word-break:break-all;display:' +
            form.lowCostOrSubsidizedDevices +
            '"><i class="far fa-check"></i>Low-Cost or Subsidized Devices</div>' +
            '<div style="word-break:break-all;display:' +
            form.lowCostInternetServicesOrDeals +
            '"><i class="far fa-check"></i>Low-Cost Internet Services or Deals</div>' +
            '<div style="word-break:break-all;display:' +
            form.locationsThatOfferFreeWiFiPublicDevices +
            '"><i class="far fa-check"></i>Locations That Offer Free Wi-Fi/Public Devices</div>' +
            '<div style="word-break:break-all;display:' +
            form.rentableLoanerHotspots +
            '"><i class="far fa-check"></i>Rentable/Loaner Hotspots</div>' +
            '<div style="word-break:break-all;display:' +
            form.rentableLoanerDevices +
            '"><i class="far fa-check"></i>Rentable/Loaner Devices</div>' +
            '<div style="word-break:break-all;display:' +
            form.digitalLiteracyTrainingOptions +
            '"><i class="far fa-check"></i>Digital Literacy Training Options</div>' +
            '<div style="word-break:break-all;display:' +
            form.technicalAssistantForPublicDevicesOrSoftware +
            '"><i class="far fa-check"></i>Technical Assistant for Public Devices or Software</div>' +
            '<div style="word-break:break-all;display:' +
            form.resourceToAssistGettingASmallBusinessOnline +
            '"><i class="far fa-check"></i>Resource to Assist Getting a Small Business Online</div>' +
            '<div style="word-break:break-all;display:' +
            form.laptopsAndDesktops +
            '"><i class="far fa-check"></i>Laptops and Desktops</div>' +
            '<div style="word-break:break-all;display:' +
            form.mobileDevices +
            '"><i class="far fa-check"></i>Mobile Devices</div>' +
            '<div style="word-break:break-all;display:' +
            form.networkingDevices +
            '"><i class="far fa-check"></i>Networking Devices</div>' +
            "</div>" +
            '<div  class="contact-item ' +
            form.showLinkToWebsite +
            '">' +
            '<h4><i class="fas fa-globe-americas"></i><strong>Visit Website</strong></h4>' +
            '<div style="word-break:break-all"><a href="' +
            form.linkToWebsite +
            '" target="_blank" >' +
            form.linkToWebsite +
            "</a></div>" +
            "</div>" +
            locationFragment +
            '<div id="resource-contact-' +
            form.formNumber +
            '" class="' +
            form.showContactSection +
            " contact-item collapse multi-collapse-" +
            form.formNumber +
            '"><h4><strong>Resource Contact</strong></h4>' +
            '<div style="word-break:break-all">' +
            form.contactName +
            "</div>" +
            '<div style="word-break:break-all">' +
            form.phoneNumber +
            "</div>" +
            '<div style="word-break:break-all">' +
            form.email +
            "</div>" +
            "</div>" +
            "</div></div>" +
            '<div class="ohio-card-content-right col-xs-12 col-sm-4">' +
            '<div class="ohio-card-content-links">' +
            '<h4  id="see-more-toggle-' +
            form.formNumber +
            '" class="search-see__more" data-toggle="collapse"  onclick="toggleSeeMore(event)" data-target=".multi-collapse-' +
            form.formNumber +
            '" role="button" aria-expanded="false" aria-controls="resource-contact-' +
            form.formNumber +
            " resource-type-category-" +
            form.formNumber +
            '">See More' +
            "</h4></div></div></section></div></div>"
          );
        }
      })
      .join("") +
    "</div>";
  return formSearchResults;
}
function toggleSeeMore(event) {
  console.log("Calling toggle seemore", event);
  event = event || window.event; // IE
  var target = event.target || event.srcElement; // IE
  var id = target.id;
  var seeMoreText = document.getElementById(id).innerHTML;
  if (seeMoreText.toLowerCase().trim() === "see more") {
    document.getElementById(id).innerHTML = "See Less";
    document.getElementById(id).setAttribute("aria-expanded", "true");
  } else {
    document.getElementById(id).innerHTML = "See More";
    document.getElementById(id).setAttribute("aria-expanded", "false");
  }
}

/*function filterSearchData(searchFilterList,encodedSearchData){

//var encodedSearchData = $("#search-results-data").text();
console.log("encoded search data",encodedSearchData);
//    var str2 = decodeURIComponent(escape(window.atob(encodedSearchData)));
var decodedSearchData = JSON.parse(decodeURIComponent(escape(window.atob(encodedSearchData))));
_.forEach(searchFilterList, function (item) {
   
    console.log("Each selected category",item);
});


//console.log("**Decoded Search Data", decodedSearchData);
console.log("**searchFilterList", searchFilterList);
}
/*
function filterSearchData(searchFilterList) {
var encodedSearchData = $("#search-results-data").text();
//var str2 = decodeURIComponent(escape(window.atob(encodedSearchData)));
var decodedSearchData = JSON.parse(
  decodeURIComponent(escape(window.atob(encodedSearchData)))
);
console.log("**Decoded Search Data", decodedSearchData);
console.log("**searchFilterList", searchFilterList);
_.forEach(initialData, function (item) {
    console.log('Search Filter 1',item);

});
/*var sortedData;
if (sortType === "resourceNameAsc") {
  sortedData = _.orderBy(decodedSearchData, ["resourceName"], ["asc"]);
} else if (sortType === "resourceNameDsc") {
  sortedData = _.orderBy(decodedSearchData, ["resourceName"], ["desc"]);
} else if (sortType === "resourceType") {
  sortedData = _.orderBy(decodedSearchData, ["resourceType"], ["asc"]);
}
console.log("sorted filter data", sortedData);

$("#searchResultsContainer").empty();
var formSearchResults = "";
formSearchResults = mapSearchResults(sortedData);
$(formSearchResults).appendTo("#searchResultsContainer");
}*/

function sortSearchData(sortType) {
  var encodedSearchData = $("#search-results-data").text();
  //var str2 = decodeURIComponent(escape(window.atob(encodedSearchData)));
  var decodedSearchData = JSON.parse(
    decodeURIComponent(escape(window.atob(encodedSearchData)))
  );
  console.log("**Decoded Search Data", decodedSearchData);
  console.log("**sort type", sortType);
  var sortedData;
  if (sortType === "resourceNameAsc") {
    sortedData = _.orderBy(decodedSearchData, ["resourceName"], ["asc"]);
  } else if (sortType === "resourceNameDsc") {
    sortedData = _.orderBy(decodedSearchData, ["resourceName"], ["desc"]);
  } else if (sortType === "resourceType") {
    sortedData = _.orderBy(decodedSearchData, ["resourceType"], ["asc"]);
  }
  console.log("sorted filter data", sortedData);

  $("#searchResultsContainer").empty();
  var formSearchResults = "";
  formSearchResults = mapSearchResults(sortedData);
  $(formSearchResults).appendTo("#searchResultsContainer");
}

function filterFormsFunction(
  typedSearchInput,
  searchInputType,
  searchComponentType
) {
  console.log("Calling the function filterFormsFunction");
  console.log("typedSearchInput 1", typedSearchInput);
  $("#searchResultsContainer").empty();
  $("#searchResultsCount").empty();
  //var typedSearchInput = $('#findResouceSearchInput').val();
  //var  searchInputType = $('#selectSearchInputType').val();
  if (typedSearchInput === "") {
    typedSearchInput = $("#owtSearchInput").val();
  }
  console.log("typedSearchInput 2", typedSearchInput);
  console.log("searchInputType", searchInputType);
  console.log("searchComponentType", searchComponentType);
  var initialData;
  var approvedFormData;
  var searchURL;

  if (searchInputType !== "" && searchComponentType !== "") {
    if (searchComponentType === "Digital Resource") {
      searchURL = formURL + "?data.resourceType__regex=%2F%5Cbdigital%5Cb%2Fi";
    } else if (searchComponentType === "Donated Resource") {
      searchURL = formURL + "?data.resourceType__regex=%2F%5Cbdonated%5Cb%2Fi";
    }
    console.log("form url", formURL);
    try {
      $.getJSON(searchURL, function (data, status) {
        initialData = data;

        $("#searchResultsCount").removeClass("d-block");

        $("#searchResultsCount").removeClass("d-none");
        $("#searchResultsCount").addClass("d-block");
        $("#searchResultsHeader").css("display", "flex");
        console.log("Intial Data new 2", initialData);

        var formArray = [];
        if (
          typedSearchInput &&
          searchInputType &&
          typedSearchInput.trim() !== ""
        ) {
          initialData = $.grep(initialData, function (item) {
            if (
              searchInputType === "resourceaddress" &&
              item.data.address1 &&
              item.data.address1.address
            ) {
              return _.includes(
                item.data.address1.address.toLowerCase(),
                typedSearchInput.toLowerCase().trim()
              );
            } else if (
              searchInputType === "resourceName" &&
              item.data.resourceName
            ) {
              return _.includes(
                item.data.resourceName.toLowerCase(),
                typedSearchInput.toLowerCase().trim()
              );
            } else if (
              searchInputType === "resourcedescription" &&
              item.data.briefDescription
            ) {
              return _.includes(
                item.data.briefDescription.toLowerCase(),
                typedSearchInput.toLowerCase().trim()
              );
            } else if (
              searchInputType === "resourcecontact" &&
              (item.data.contactName ||
                item.data.email ||
                item.data.phoneNumber)
            ) {
              return (
                _.includes(
                  item.data.contactName.toLowerCase(),
                  typedSearchInput.toLowerCase().trim()
                ) ||
                _.includes(
                  item.data.phoneNumber.toLowerCase(),
                  typedSearchInput.toLowerCase().trim()
                ) ||
                _.includes(
                  item.data.email.toLowerCase(),
                  typedSearchInput.toLowerCase().trim()
                )
              );
            } else if (
              searchInputType === "linkToWebsite" &&
              item.data.linkToWebsite
            ) {
              return _.includes(
                item.data.linkToWebsite.toLowerCase(),
                typedSearchInput.toLowerCase().trim()
              );
            } else {
              return "";
            }
          });
        }

        initialData = _.uniq(initialData, function (elem) {
          return [elem.data, elem.form].join();
        });
        var size = _.size(initialData);
        if (size > 0) {
          $("#searchResultsCount").append(
            "<h6>" + size + " Search Results</h6>"
          );
          $("#searchResultsSort").removeClass("d-none");
          $("#searchResultsSort").addClass("d-block");
          if (searchComponentType === "Digital Resource") {
            $("#digitalSearchResultsFilter").removeClass("d-none");
            $("#digitalSearchResultsFilter").addClass("d-block");
          } else if (searchComponentType === "Donated Resource") {
            $("#donatedSearchResultsFilter").removeClass("d-none");
            $("#donatedSearchResultsFilter").addClass("d-block");
          }
        }

        _.forEach(initialData, function (item) {
          var encodedForm = btoa(
            unescape(encodeURIComponent(JSON.stringify(item.data)))
          );
          // console.log("encoded form", encodedForm);
          var formItem = {
            formNumber: item._id,
            digitalCategories: [],
            approvalState: item.state ? item.state : "denied",
            city: item.data.city,
            contactName: item.data.contactName ? item.data.contactName : "",
            email: item.data.email ? item.data.email : "",
            linkToWebsite: item.data.linkToWebsite,
            showLinkToWebsite:
              item.data.linkToWebsite && item.data.linkToWebsite !== ""
                ? "d-block"
                : "d-none",
            location: item.data.location,
            offerExpirationDate: item.data.offerExpirationDate,
            offerStartDate: item.data.offerStartDate,
            phoneNumber: item.data.phoneNumber ? item.data.phoneNumber : "",
            resourceName: item.data.resourceName,
            resourceType: item.data.resourceType,
            state: item.data.state,
            showContactSection:
              (item.data.contactName &&
                (item.data.contactName !== "" ||
                  item.data.contactName !== "undefined")) ||
              (item.data.phoneNumber &&
                (item.data.phoneNumber !== "" ||
                  item.data.phoneNumber !== "undefined")) ||
              (item.data.email &&
                (item.data.email !== "" || item.data.email !== "undefined"))
                ? ""
                : "d-none",
            streetAddress1: item.data.streetAddress1,
            streetAddress2: item.data.streetAddress2,
            zipCode: item.data.zipCode,
            briefDescription: item.data.briefDescription,
            displayAddress:
              item.data.address1 && item.data.address1.address
                ? item.data.address1.address
                : "",
            showAdressSection:
              item.data.address1 && item.data.address1.address !== ""
                ? "d-block"
                : "d-none",
            addresslocationBoolean:
              item.data.address1 &&
              item.data.address1.lat &&
              item.data.address1.lon
                ? true
                : false,
            lat:
              item.data.address1 && item.data.address1.lat
                ? item.data.address1.lat
                : "",
            lon:
              item.data.address1 && item.data.address1.lon
                ? item.data.address1.lon
                : "",
            lowCostOrSubsidizedDevices:
              item.data.categories &&
              item.data.categories.lowCostOrSubsidizedDevices === "true"
                ? "block"
                : "none",
            lowCostInternetServicesOrDeals:
              item.data.categories &&
              item.data.categories.lowCostInternetServicesOrDeals === "true"
                ? "block"
                : "none",
            locationsThatOfferFreeWiFiPublicDevices:
              item.data.categories &&
              item.data.categories.locationsThatOfferFreeWiFiPublicDevices ===
                "true"
                ? "block"
                : "none",
            rentableLoanerHotspots:
              item.data.categories &&
              item.data.categories.lowCostOrSubsidizedDevices === "true"
                ? "block"
                : "none",
            rentableLoanerDevices:
              item.data.categories &&
              item.data.categories.lowCostOrSubsidizedDevices === "true"
                ? "block"
                : "none",
            digitalLiteracyTrainingOptions:
              item.data.categories &&
              item.data.categories.digitalLiteracyTrainingOptions === "true"
                ? "block"
                : "none",
            technicalAssistantForPublicDevicesOrSoftware:
              item.data.categories &&
              item.data.categories
                .technicalAssistantForPublicDevicesOrSoftware === "true"
                ? "block"
                : "none",
            resourceToAssistGettingASmallBusinessOnline:
              item.data.categories &&
              item.data.categories
                .resourceToAssistGettingASmallBusinessOnline === "true"
                ? "block"
                : "none",
            laptopsAndDesktops:
              item.data.categories &&
              item.data.categories.laptopsAndDesktops === "true"
                ? "block"
                : "none",
            mobileDevices:
              item.data.categories &&
              item.data.categories.mobileDevices === "true"
                ? "block"
                : "none",
            networkingDevices:
              item.data.categories &&
              item.data.categories.networkingDevices === "true"
                ? "block"
                : "none",
            /* formData: encodedForm ? encodedForm : "",*/
          };

          formArray.push(formItem);
        });

        console.log("Form Array 1", JSON.stringify(formArray));
        // btoa(unescape(encodeURIComponent(JSON.stringify(formArray))))
        // console.log("*******Categories", JSON.stringify(formArray));
        var encodedSearchData = btoa(
          unescape(encodeURIComponent(JSON.stringify(formArray)))
        );
        $("#search-results-data").html(encodedSearchData);

        if (initialData.length === 0) {
          $("<h6>No search results</h6>").appendTo("#searchResultsContainer");
          $("#searchResultsSort").removeClass("d-block");
          $("#searchResultsSort").addClass("d-none");
          if (searchComponentType === "Digital Resource") {
            $("#digitalSearchResultsFilter").removeClass("d-block");
            $("#digitalSearchResultsFilter").addClass("d-none");
          } else if (searchComponentType === "Donated Resource") {
            $("#donatedSearchResultsFilter").removeClass("d-block");
            $("#donatedSearchResultsFilter").addClass("d-none");
          }
        } else {
          var formSearchResults = "";
          formSearchResults = mapSearchResults(formArray);

          $("#searchResultsContainer").empty();
          $(formSearchResults).appendTo("#searchResultsContainer");
        }
      });
    } catch (err) {
      console.error("Error calling Form IO Service", err.message);
    }
    // enf of getJson function
  }
  $(".form-search-results:hidden").show();
}
