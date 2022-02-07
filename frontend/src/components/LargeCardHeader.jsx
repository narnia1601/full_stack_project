const LargeCardHeader = props => {
    return (
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">{props.title}</h6>
        </div>
    )
}

export default LargeCardHeader;