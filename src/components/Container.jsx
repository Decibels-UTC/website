

function Container(props) {
    return(
        <>
            <div className={"container"}style={{width:props.width, height:props.width}}>
                <p>{props.text}</p>
                <img src={props.src}  className={"img"}  />
            </div>

        </>
    );

}
export default Container;