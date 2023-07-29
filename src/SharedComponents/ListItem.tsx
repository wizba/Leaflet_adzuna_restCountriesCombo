import { CountryInterface } from "../models/models";

interface Props {
    item: CountryInterface
}

const ListItem = ({ item }: Props) => {
    return (<button
        type="button"
        className="flex w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:text-teal-100 focus:outline-teal-500 focus:border-teal-500 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200">
        <img className="inline-block h-10 w-10 rounded-md ring-2 ring-white mr-3" src={item.flagUrl} alt="" />
        <div>{item.name}</div>
    </button>
    )
}

export default ListItem;