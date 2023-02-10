// Documentation: use for setup of sections.

import { ReactElement } from "react";

// @Properties:
// height = section heigt. Insert 'h-screen' or 'h-auto'
// bg_color = section fill background. Insert 'bg-(...)'
// direction = direction of flex items/children. Insert 'flex-row' for horizontal, and 'flex-column' for vertical
// text_fill = font color

interface section {
    height: string;
    bg_color: string;
    text_fill: string;
    children?: ReactElement<any>
}

const TBSection = (props: section) => {
    return (
    <section className={`flex content-center ${props.height} ${props.bg_color} ${props.text_fill}`}>
        <div className='flex m-auto w-full max-w-7xl p-10 text-current'>
            {props.children}
        </div> 
    </section>
    )
}

<section className={'flex content-center h-auto'}>
    <div className='flex m-auto w-full max-w-7xl p-10 text-current'>

    </div> 
</section>

export default TBSection;