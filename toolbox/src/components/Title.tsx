interface title {
    size: string;
    heading: string;
    span?: string;
    description: string;
}

const Title = (props: title) => {
    return (<div id="c_wrapper" className='max-w-3xl text-left mt-10 mb-5'>
        <h1 className={`mb-4 ${props.size}`}>{props.heading} <span className="bg-yellow-300">{props.span}</span></h1>
        <p className="mb-2">{props.description}</p>
    </div>
    )
}

export default Title;
