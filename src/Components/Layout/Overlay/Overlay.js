import "./Overlay.css"
function Overlay (props) {
    return (
        <div className="overlay">
            <p>{props.message}...</p>
        </div>
    )
}
export default Overlay