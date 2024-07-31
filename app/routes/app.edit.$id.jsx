import { authenticate } from "../shopify.server";
import { getMetafield } from "../GraphQLUtilities";
import { useEffect, useState, useCallback } from "react";
import {
    useActionData,
    useLoaderData,
    useSubmit,
    useNavigation,
    useFetcher,
    json
} from "@remix-run/react";
import {
    Page,
    Layout,
    Text,
    Card,
    BlockStack,
    ResourceList, ResourceItem,
    Box,
    Button,
    Checkbox,
    TextField,
    FormLayout
} from "@shopify/polaris";
import { TitleBar, useAppBridge, Modal } from "@shopify/app-bridge-react";

import { editTextArea } from "../GraphQLUtilities";
import TextAreaEditor from "./components/TextAreaEditor";
import FontsEditor from "./components/FontsEditor";
import ColorsEditor from "./components/ColorsEditor";
import OptionsEditor from "./components/OptionsEditor";

export async function loader({ request, params }) {
    const { admin } = await authenticate.admin(request);
    const metafield = JSON.parse(await getMetafield(admin)) || []

    let item = {}

    for(let i of metafield){
        if(i.id == params.id){
            item = i
        }
    }

    return item;
}

export async function action({ request, params }) {
    const { admin } = await authenticate.admin(request);
    const data = await request.formData()

    switch(data.get("Action")){
        case 'EDIT_TEXTAREA':{
            const id = data.get("id") || "0"
            const Title = data.get("TextAreaTitle") || ""
            const Description = data.get("TextAreaDescription") || ""
            const DefaultValue = data.get("TextAreaDefaultValue") || ""
            const ShowTextAlignButtons = data.get("checkedShowTextAlignButtons") || ""

            const item = await editTextArea(admin, {id, Title, Description, DefaultValue, ShowTextAlignButtons})
            console.log(item)
        }break;
        case 'EDIT_Fonts':{
            const id = data.get("id") || "0"
            const FontSectionTitle = data.get("FontSectionTitle") || ""
            const FontSectionDescription = data.get("FontSectionDescription") || ""
            const FontsModalBtnLbl = data.get("FontsModalBtnLbl") || ""
            const FontsModalImgURL = data.get("FontsModalImgURL") || ""
            const AllFonts = JSON.parse(data.get("AllFonts") || [])

            const item = await editTextArea(admin, {id, FontSectionTitle, FontSectionDescription, FontsModalBtnLbl, FontsModalImgURL, AllFonts})
            console.log(item)
        }break;
        default:
          console.log("Unhandled endpoint...");
    }

    return json({savedmessage:`Saved - ${(new Date()).getTime()}`})
}

export default function page() {
    const item = useLoaderData()
    const fetcher = useFetcher()
    const shopify = useAppBridge();

    const [statechanged,setstatechanged] = useState(false)
    var message = fetcher.data?.savedmessage

    useEffect(() => {
        if (message) {
          shopify.toast.show("Changes Saved",{
            duration: 1000,
          })
          message = ""
          setstatechanged(false)
        }
    }, [message, shopify])

    const sendToAction = (data) => {
        fetcher.submit(data, { method: "POST" })
    }
    return(
        <Page title={`Edit ${item.type}`} backAction={{content: 'Orders', url: '/app/'}}>
            {item.type == "Textarea" && <TextAreaEditor item={item} sendToAction={sendToAction} statechanged={statechanged} setstatechanged={setstatechanged} />}
            {item.type == "Fonts" && <FontsEditor item={item} sendToAction={sendToAction} statechanged={statechanged} setstatechanged={setstatechanged} />}
            {item.type == "Colors" && <ColorsEditor item={item} sendToAction={sendToAction} statechanged={statechanged} setstatechanged={setstatechanged} />}
            {item.type == "Options" && <OptionsEditor item={item} sendToAction={sendToAction} statechanged={statechanged} setstatechanged={setstatechanged} />}
        </Page>
    )
}