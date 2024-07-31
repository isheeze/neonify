import { useState, useCallback } from "react";
import {
  BlockStack,
    Box,
    Button,
    Checkbox,
    TextField,
} from "@shopify/polaris";

export default function TextAreaEditor ({item, sendToAction, statechanged, setstatechanged}) {
    const [checkedShowTextAlignButtons, setCheckedShowTextAlignButtons] = useState(item.ShowTextAlignButtons == 'true');
    const handlecheckedShowTextAlignButtonsChange = useCallback(
        (newChecked) => {setCheckedShowTextAlignButtons(newChecked);setstatechanged(true)},
        [],
    );
    const [TextAreaTitle, setTextAreaTitle] = useState(item.Title);
    const handleTextAreaTitleChange = useCallback(
        (newValue) => {setTextAreaTitle(newValue);setstatechanged(true)},
        [],
    );
    const [TextAreaDescription, setTextAreaDescription] = useState(item.Description);
    const handleTextAreaDescriptionChange = useCallback(
        (newValue) => {setTextAreaDescription(newValue);setstatechanged(true)},
        [],
    );
    const [TextAreaDefaultValue, setTextAreaDefaultValue] = useState(item.DefaultValue);
    const handleTextAreaDefaultValueChange = useCallback(
        (newValue) => {setTextAreaDefaultValue(newValue);setstatechanged(true)},
        [],
    );
    const [TextAreaModalBtnLbl, setTextAreaModalBtnLbl] = useState(item.ModalBtnLbl);
    const handleTextAreaModalBtnLblChange = useCallback(
      (newValue) => {setTextAreaModalBtnLbl(newValue);setstatechanged(true)},
      [],
    );
    const [TextAreaModalImgURL, setTextAreaModalImgURL] = useState(item.ModalImgURL);
    const handleTextAreaModalImgURLChange = useCallback(
      (newValue) => {setTextAreaModalImgURL(newValue);setstatechanged(true)},
      [],
    );

    return(
        <Box padding={400}>
          <BlockStack gap={200}>
          <TextField
            label="Title"
            value={TextAreaTitle}
            onChange={handleTextAreaTitleChange}
            autoComplete="off"
          />
          <TextField
            label="Description"
            value={TextAreaDescription}
            onChange={handleTextAreaDescriptionChange}
            multiline={4}
            autoComplete="off"
          />
          <TextField
            label="Default Value"
            value={TextAreaDefaultValue}
            onChange={handleTextAreaDefaultValueChange}
            multiline={4}
            autoComplete="off"
          />
          <Checkbox
            label="Show Text Align Buttons"
            checked={checkedShowTextAlignButtons}
            onChange={handlecheckedShowTextAlignButtonsChange}
          />

          
          <TextField
            label="Popup Button Label"
            value={TextAreaModalBtnLbl}
            onChange={handleTextAreaModalBtnLblChange}
            autoComplete="off"
          />
          <TextField
            label="Url of Image in Popup"
            value={TextAreaModalImgURL}
            onChange={handleTextAreaModalImgURLChange}
            autoComplete="off"
          />
          
          <Button fullWidth={true} variant="primary" onClick={()=> {
                sendToAction({Action: "EDIT_TEXTAREA",id: item.id,TextAreaTitle,TextAreaDescription,TextAreaDefaultValue,checkedShowTextAlignButtons, TextAreaModalBtnLbl, TextAreaModalImgURL})
            }} disabled={statechanged ? false : true}>Edit</Button>
          </BlockStack>
        </Box>
    )
}