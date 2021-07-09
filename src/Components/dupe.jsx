// $('td:last-child').wrap("<span className='last-row'></span>")
// $('td:last-child').css('padding', '6px')
// $('td:last-child').css('border', '1px solid white')
// $('td:last-child').css('border-radius', '5px')
// $('td:last-child').css('position', 'relative')
// $('td:last-child').css('top', '5px')
// $('td:last-child').css('text-align', 'center')
// $('td:last-child').css('color', 'white', )
// $('td:last-child').css('width', '128px', )
// let lastChild = $('td:last-child').val()
// console.log('last child = ' + lastChild)
// $('td:last-child').val("Pending Review").css('background-color', '#3d7aa9')
// // $('td:last-child').val("Approved").css('background-color', '#5e8000')

const browserHost = window.location.hostname
      let formHost
      let formSubmission
      if(browserHost === 'ohid.ohio.gov' || browserHost === 'www.ohid.ohio.gov' || browserHost === 'dx.myohio.gov' {
        formHost = "https://webform-designer.iop.ohio.gov/live-owt/drftrequestform"
        formSubmission ="https://webform-designer.iop.ohio.gov/live-owt/drftrequestform/submission/"
      } else {
        formHost = "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform"
        formSubmission = "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/"
      }