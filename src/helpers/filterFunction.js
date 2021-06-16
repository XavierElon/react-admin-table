function filterSearchData(searchFilterList, encodedSearchData) {
  //var encodedSearchData = $("#search-results-data").text();
  console.log("encoded search data", encodedSearchData);
  //    var str2 = decodeURIComponent(escape(window.atob(encodedSearchData)));
  var decodedSearchData = JSON.parse(
    decodeURIComponent(escape(window.atob(encodedSearchData)))
  );
  var filteredData = decodedSearchData;
  _.forEach(searchFilterList, function (item) {
    console.log("Each selected category", item);

    if (item === "lowCostOrSubsidizedDevices") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.lowCostOrSubsidizedDevices, "block");
      });
    } else if (item === "lowCostInternetServicesOrDeals") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.lowCostInternetServicesOrDeals, "block");
      });
    } else if (item === "locationsThatOfferFreeWiFiPublicDevices") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(
          formitem.locationsThatOfferFreeWiFiPublicDevices,
          "block"
        );
      });
    } else if (item === "rentableLoanerHotspots") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.rentableLoanerHotspots, "block");
      });
    } else if (item === "rentableLoanerDevices") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.rentableLoanerDevices, "block");
      });
    } else if (item === "digitalLiteracyTrainingOptions") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.digitalLiteracyTrainingOptions, "block");
      });
    } else if (item === "technicalAssistantForPublicDevicesOrSoftware") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(
          formitem.technicalAssistantForPublicDevicesOrSoftware,
          "block"
        );
      });
    } else if (item === "resourceToAssistGettingASmallBusinessOnline") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(
          formitem.resourceToAssistGettingASmallBusinessOnline,
          "block"
        );
      });
    } else if (item === "laptopsAndDesktops") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.laptopsAndDesktops, "block");
      });
    } else if (item === "mobileDevices") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.mobileDevices, "block");
      });
    } else if (item === "networkingDevices") {
      filteredData = $.grep(filteredData, function (formitem) {
        return _.includes(formitem.networkingDevices, "block");
      });
    }
  });

  //  return filteredData;

  //console.log("**Decoded Search Data", decodedSearchData);
  console.log("**searchFilterList", searchFilterList);
  console.log("**filtered DAta", filteredData);

  var formSearchResults = "";
  var size = _.size(filteredData);
  $("#searchResultsContainer").empty();
  $("#searchResultsCount").empty();
  if (size > 0) {
    $("#searchResultsCount").append("<h6>" + size + " Search Results</h6>");
    formSearchResults = mapSearchResults(filteredData);

    $(formSearchResults).appendTo("#searchResultsContainer");
  } else {
    $("<h6>No search results</h6>").appendTo("#searchResultsContainer");
  }
}
