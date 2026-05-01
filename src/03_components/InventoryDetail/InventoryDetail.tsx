import {InventoryDetailType} from "@/01_types";
import Headline from "@/03_components/atoms/Headline";
import classNames from "classnames";
import Button from "@/03_components/atoms/Button/Button";
import useInventoryStore from "@/02_stores/inventory-store";

const InventoryDetail = ({data, roomName}: { data: InventoryDetailType, roomName: string }) => {
    const { removeInventoryItem } = useInventoryStore();
    const date = new Date(data.updated!)
    const dateFormatted = date.toLocaleDateString('de-de', {year: 'numeric', month: '2-digit', day: '2-digit'});

    return <>
        <Headline text={data.name} level={'h3'} classes={classNames('mb-2 pb-2', (data.remarks || data.updated) && 'border-b border-gray-200')}/>
        <p className={''}><strong>Anzahl/Menge:</strong> {data.quantity}</p>
        {data.remarks && <p className="mb-4"><strong>Anmerkungen:</strong> {data.remarks}</p>}
        {data.updated && <p className="inline-block rounded-lg py-1 px-2 bg-gray-500 text-white text-xs">Updated: {dateFormatted}</p>}
        <hr className="pt-4 mt-4" />
        <Button buttonType={"primary"} href={`/editInventory/${roomName}/${data.id}`} label={'edit'} />
        <Button buttonType={"secondary"} label={"entfernen"} onClick={() => removeInventoryItem(roomName, data.id)}></Button>
    </>
}

export default InventoryDetail;