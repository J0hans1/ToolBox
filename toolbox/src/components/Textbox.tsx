
interface TextboxProps {
    title?: string;
    children: React.ReactNode;
}

const Textbox = (props: TextboxProps) => {
    return (
        <div className="w-2/3 text-center justify-center">
            <h1 className="text-6xl mb-3 justify-center">{props.title}</h1>
            {props.children}
        </div>
    );
};

export default Textbox;