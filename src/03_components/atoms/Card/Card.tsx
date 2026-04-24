import {ReactNode} from "react";
import classNames from "classnames";

const Card = ({isNotInteractive = false , children}: { isNotInteractive?: boolean, children: ReactNode }) => {
    return (<section
        className={classNames('group border border-gray-500 p-4 relative rounded-md', !isNotInteractive && 'hover:bg-gray-50 transition-all hover:shadow-2xl')}>
        {children}
    </section>)
}

export default Card;