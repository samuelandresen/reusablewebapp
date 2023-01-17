import './Request.css';

function Request(props) {

    const logoUrl = 'https://drp21-backend.herokuapp.com/api/v1/downloadLogo/';

    let borderColor = null
    if (props.listing.ownerCharity) {
        borderColor = "#42f548"
    } else {
        borderColor = "#0af"
    }

    var style = {
        borderColor: borderColor
    }


    // TODO: Change to match requests 
    return (
        <div className='Request' style={style}>
            <h3 className="Title">{props.listing.title}</h3>
            <p className="Description"> {props.listing.description} </p>
            <div id='bottom'>
                {props.listing.ownerCharity
                    ? <>
                        { props.listing.charityLogoId 
                          ? <img className='CharityLogo' src={logoUrl + `${props.listing.charityLogoId}`} alt='charity logo' />
                          : <></>
                        }
                        <p className="CharityRequest" style={{color: "red"}}>CHARITY REQUEST</p>
                      </>

                    : <></>
                }
                <p className="TimeRemaining"> {props.listing.ownerCharity ? 'Available indefinitely' : 'Available until: ' + props.listing.availableUntil} </p>
                <p className="TimeRemaining"> {(props.listing.ownerCharity ? 'Contact charity: ' : '') + props.listing.ownerEmail} </p>
            </div>
        </div>
    );
}

export default Request;