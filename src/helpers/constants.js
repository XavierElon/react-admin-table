const browserHost = window.location.hostname
let formHost
let formSubmission
let formSubmissionNoSlash
if(browserHost === 'ohid.ohio.gov' || browserHost === 'www.ohid.ohio.gov' || browserHost === 'dx.myohio.gov') {
    formHost = "https://webform-designer.iop.ohio.gov/live-owt/drftrequestform"
    formSubmission = "https://webform-designer.iop.ohio.gov/live-owt/drftrequestform/submission/"
    formSubmissionNoSlash = "https://webform-designer.iop.ohio.gov/live-owt/drftrequestform/submission/"
} else {
    formHost = "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform"
    formSubmission = "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/"
    formSubmissionNoSlash= "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission"
}

module.exports = {
    FORM_URL: formHost,
    DRFT_FORM_SUBMISSION_URL: formSubmission,
    DRFT_FORM_SUBMISSION_URL_NO_SLASH: formSubmissionNoSlash,
    LIMIT_AMOUNT: 1000000
}