import "./contact.css"

function ContactUs() {
    return(<>
    <div className="kontainer">
    <div className="card-box">
        <div className="top-div-top">
            <h2 className="h2">Get in touch</h2>
            <i className="fa fa-close i"></i>
        </div>
        <div className="detailz">
            <div className="input-text">
                <input type="text" required="required" />
                <span>Name</span>
            </div>
             <div className="input-text">
                <input type="text" required="required" />
                <span>E-mail</span>
            </div>
                         <div className="input-text">
                <input type="text" required="required" />
                <span>Message</span>
            </div>
        </div>
        <div className="last">
            <button className="butt" onClick={() => {
                alert('coming soon')
            }}>SEND</button>
            <span><i class="fa fa-envelope-o i"></i></span>
        </div>
    </div>
</div>











   
    
    
    </>)
}

export default ContactUs