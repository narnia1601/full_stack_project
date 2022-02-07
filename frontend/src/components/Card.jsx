const Card = (props) => {
    let borderStyle = 'card shadow h-100 py-2 ' + props.borderStyle;
    let textStyle = 'font-weight-bold text-uppercase mb-1 ' + props.textStyle
    return (
        <div className={borderStyle}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={textStyle}>{props.title}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{props.text}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;