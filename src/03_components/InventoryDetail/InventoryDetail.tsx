import {InventoryDetailType} from "@/01_types";

const InventoryDetail = ({data}: { data: InventoryDetailType }) => {
    return <li className="border border-gray-300 p-8 w-1/2 shrink-1 grow-0">
        <p>{data.name}</p>
        <p>{data.quantity}</p>
        <p>{data.remarks}</p>
    </li>
}

export default InventoryDetail;