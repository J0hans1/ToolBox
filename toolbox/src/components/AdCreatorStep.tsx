const NumberedCircle = (props: { step: number }) => {
    return (
        <div className="flex justify-center items-center h-20 w-20 rounded-full bg-pu-jungel mx-10">
            <p className="text-white text-bold text-3xl">
                {props.step}
            </p>
        </div>
    );
};

interface adStep {
    step: number;
    title: string;
    children: React.ReactNode;
}

const AdCreatorStep = (props: adStep) => {
    return (
        <div className="flex flex-col my-10 w-1/4">

            <div className="flex mb-2 items-center">
                <NumberedCircle step={props.step} />
                <h1 className="text-2xl">{props.title}</h1>
            </div>

            <div className="pl-40">
                {props.children}
            </div>
        </div> 
    );
}

export default AdCreatorStep