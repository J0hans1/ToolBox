interface Category {
    name: string
    outlineColor: string
    textColor: string
}

export default function Category (props: Category) {
    return (
        <div className={`w-auto h-auto py-1 px-4 flex rounded-full border border-solid ${props.outlineColor} ${props.textColor}`}>
            <p>{props.name}</p>
        </div>
    )
}