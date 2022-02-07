const DCFComponent = props => {
    const handleChange = (e) => {
        props.handleEstimateChange(props.function, e.target.value)
    }
    return (
        <div>
            <label className="form-label">{props.children}</label>
            <input type="number" value={props.value * 100} onChange={handleChange} className="form-control"/>
        </div>
    )
}

export default DCFComponent;