// import { AuthService, useAuthState } from '@xrengine/client-core/src/user/services/AuthService'
import React, { useEffect, useState } from "react"
import { InventoryService } from "./services/InventoryService"
import AvatarInventory from "react-createavatar-inventory";

export const Inventory = (): any => {
  const [svgImage, setSvgImage] = useState([])
  const [isModal, setModal] = useState(false)

  const setShowModal = async () => {
    if (!isModal) {
      const image: any = await InventoryService.fetchInventoryList()
      setSvgImage([...image])
    }
    setModal(!isModal)
  }

  const onDragEvent = (data: any, indexSlot: any) => {
    console.log("Drag data: ", data)
    console.log("Drag itemIndex: ", indexSlot)
  }
  const onDropEvent = (data: any, indexSlot: any) => {
    console.log("Drop data: ", data)
    console.log("Drop itemIndex: ", indexSlot)
  }
  const nextPage = () => {
    console.log("Clicked next button")
  }
  const prevPage = () => {
    console.log("Clicked prev button")
  }

  return (
    <>
      <div className="inventory-button" onClick={() => setShowModal()}>
        Inventory
      </div>
      <AvatarInventory
        items={svgImage}
        showModal={isModal}
        background="black"
        dragEvent={onDragEvent}
        dropEvent={onDropEvent}
        goToNextPage={nextPage}
        goToPrevPage={prevPage}
      />
    </>
  )
}

export default Inventory
