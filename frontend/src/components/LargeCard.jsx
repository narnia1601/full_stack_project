import LargeCardHeader from "./LargeCardHeader";

const LargeCard = props => {
    return (
        <div class="card shadow mb-4">
            <LargeCardHeader title={props.header}></LargeCardHeader>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default LargeCard;