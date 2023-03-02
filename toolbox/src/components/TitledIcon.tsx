interface IconText {
    icon?: string;
    text?: string;
    iconSize?:string;
    textSize?:string;
}

 const TitledIcon = (props : IconText) => { 
    return (
        <div className={`flex flex-row items-center ${props.iconSize}`}>
            <img className="h-full mr-5" src={props.icon} alt="icon" />
            <p className={`ml-1 mt-3 ${props.textSize}`}>{props.text}</p>
        </div>
    )
}

export default TitledIcon;