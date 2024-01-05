import classNames from "classnames"
import ItemPlaceholder, { ItemPlaceholderType } from "./ItemPlaceholder"

type Props = {
    className?: string,
}
export default function SectionPlaceholder({className}:Props) {
    return (
        <div className={classNames("bg-gray-500 rounded-lg animate-pulse p-2 min-h-[64px] flex flex-col items-stretch gap-2", className)}>
            <ItemPlaceholder className="child:bg-gray-200 child:h-2 rounded-lg h-2" type={ItemPlaceholderType.IconWithOneLine} />
        </div>
    )
}