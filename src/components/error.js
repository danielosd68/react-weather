const Error = (props) => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1>Błąd!</h1>
                <p>{props.error}</p>
                <button id="error-btn" onClick={props.exit}>Ok</button>
            </div>
        </div>
    )
}

export default Error;