import React from "react";

interface Title {
    title: string;
    dummy: string;
}


const TitledTextField = (props: Title) => {
    return(
        <div>
            <h1 className="text-amber-100">
                {props.title}
            </h1>
            <input type="text"></input>
        </div>
    )
}


export default TitledTextField;