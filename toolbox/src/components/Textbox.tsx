
interface TextboxProps {
    title?: string;
    children: React.ReactNode;
}

const Textbox = (props: TextboxProps) => {
    return (
        <div className="w-2/3 text-left">
            <h1 className="text-4xl mb-3">{props.title}</h1>
            {props.children}
        </div>
    );
};

export default Textbox;