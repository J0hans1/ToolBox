interface Category {
    name: string
}

export default function Category (props: Category) {
    return (
        <div className="w-auto h-auto py-1 px-4 flex rounded-full border border-solid border-pu-svart dark:border-dark-white dark:text-dark-white">
            <p >{props.name}</p>
        </div>
    )
}