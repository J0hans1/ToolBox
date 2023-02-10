interface TextboxProps {
    title?: string;
    title2?:string;
    children: React.ReactNode;
}

const Textbox = (props: TextboxProps) => {
    return (
        <div id="c_section" className='flex h-auto content-center bg-slate-200 p-10 pt-40'>
            <div id="c_container" className='flex mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl'>
                <div id="c_wrapper" className='max-w-3xl text-left'>
                    <h1 className='text-7xl mb-4'>{props.title}<span className="bg-yellow-300">{props.title2}</span></h1>
                    <p className="mb-2"> {props.children}</p>
                </div>
            </div>
        </div>
    )
};

export default Textbox;