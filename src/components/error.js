const Error = (props) => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1>Kurza twarz!...</h1>
                <p>{props.error}</p>
                <button id="error-btn" onClick={props.exit}>Ehh... Okej</button>
            </div>
        </div>
    )
}

export default Error;