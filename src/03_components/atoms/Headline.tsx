import classNames from "classnames";

const Headline = ({text, level, classes}: { text: string, level: 'h1' | 'h2' | 'h3', classes?: string }) => {
    const HeadlineLevel = level;

    const headlineClasses = {
        'h1': 'text-3xl font-bold mb-4',
        'h2': 'text-2xl font-bold mb-4',
        'h3': 'text-lg font-bold mb-4',
    }

    return (<HeadlineLevel className={classNames(headlineClasses[level], classes)}>
        {text}
    </HeadlineLevel>);
}

export default Headline;