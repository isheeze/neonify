import { useState, useCallback } from "react";
import {
    Box,
    Button,
    TextField,
    BlockStack,
    FormLayout,
    InlineStack,
    ResourceList,
    ResourceItem,
    Text,
} from "@shopify/polaris";
import { TitleBar, useAppBridge, Modal } from "@shopify/app-bridge-react";

function objectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function deleteByObject(objectsArray, objectToDelete) {
  return objectsArray.filter(object => !objectsEqual(object, objectToDelete));
}

export default function ColorsEditor ({item, sendToAction, statechanged, setstatechanged}) {
    const shopify = useAppBridge();

    const [editIndex, setEditIndex] = useState(0)
    const [AllColors, setAllColors] = useState(item.AllColors);

    const [ColorSectionTitle, setColorSectionTitle] = useState(item.Title);

    const handleColorSectionTitleChange = useCallback(
        (newValue) => {setColorSectionTitle(newValue);setstatechanged(true)},
        [],
    );
    const [ColorSectionDescription, setColorSectionDescription] = useState(item.Description);

    const handleColorSectionDescriptionChange = useCallback(
        (newValue) => {setColorSectionDescription(newValue);setstatechanged(true)},
        [],
    );
    const [ColorTitle, setColorTitle] = useState("");

    const handleColorTitleChange = useCallback(
        (newValue) => {setColorTitle(newValue);setstatechanged(true)},
        [],
    );
    const [ColorCode, setColorCodeValue] = useState("");

    const handleColorCodeChange = useCallback(
        (newValue) => {setColorCodeValue(newValue);setstatechanged(true)},
        [],
    );
    const [ColorPrice, setColorPrice] = useState(0);

    const handleColorPriceChange = useCallback(
        (newValue) => {setColorPrice(newValue);setstatechanged(true)},
        [],
    );
    const [ColorPricePerLetter, setColorPricePerLetter] = useState(0);

    const handleColorPricePerLetterChange = useCallback(
        (newValue) => {setColorPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [ColorMinimumLetters, setColorMinimumLetters] = useState(0);

    const handleColorMinimumLettersChange = useCallback(
        (newValue) => {setColorMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    const [ColorsModalBtnLbl, setColorsModalBtnLbl] = useState(item.ModalBtnLbl);

    const handleColorsModalBtnLblChange = useCallback(
        (newValue) => {setColorsModalBtnLbl(newValue);setstatechanged(true)},
        [],
    );

    const [ColorsModalImgURL, setColorsModalImgURL] = useState(item.ModalImgURL);

    const handleColorsModalImgURLChange = useCallback(
        (newValue) => {setColorsModalImgURL(newValue);setstatechanged(true)},
        [],
    );

    const [EditColorTitle, setEditColorTitle] = useState("");

    const handleEditColorTitleChange = useCallback(
        (newValue) => {setEditColorTitle(newValue);setstatechanged(true)},
        [],
    );
    const [EditColorCode, setEditColorCode] = useState("");

    const handleEditColorCodeChange = useCallback(
        (newValue) => {setEditColorCode(newValue);setstatechanged(true)},
        [],
    );
    const [EditColorPrice, setEditColorPrice] = useState(0);

    const handleEditColorPriceChange = useCallback(
        (newValue) => {setEditColorPrice(newValue);setstatechanged(true)},
        [],
    );
    const [EditColorPricePerLetter, setEditColorPricePerLetter] = useState(0);

    const handleEditColorPricePerLetterChange = useCallback(
        (newValue) => {setEditColorPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [EditColorMinimumLetters, setEditColorMinimumLetters] = useState(0);

    const handleEditColorMinimumLettersChange = useCallback(
        (newValue) => {setEditColorMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    return(
        <Box padding={400}>
        <BlockStack gap={200}>
          <TextField
            label="Title"
            value={ColorSectionTitle}
            onChange={handleColorSectionTitleChange}
            autoComplete="off"
          />
          <TextField
            label="Description"
            value={ColorSectionDescription}
            onChange={handleColorSectionDescriptionChange}
            multiline={4}
            autoComplete="off"
          />

          
          <TextField
            label="Popup Button Label"
            value={ColorsModalBtnLbl}
            onChange={handleColorsModalBtnLblChange}
            autoComplete="off"
          />
          <TextField
            label="Url of Image in Popup"
            value={ColorsModalImgURL}
            onChange={handleColorsModalImgURLChange}
            autoComplete="off"
          />
          <Box borderColor="border" borderWidth="025" borderRadius="200" padding={200}>
            <FormLayout>
              <FormLayout.Group condensed>
                <TextField
                  label="Color Title"
                  value={ColorTitle}
                  onChange={handleColorTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Color Code"
                  value={ColorCode}
                  onChange={handleColorCodeChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={ColorPrice}
                  onChange={handleColorPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={ColorPricePerLetter}
                  onChange={handleColorPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={ColorMinimumLetters}
                  onChange={handleColorMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <Button variant="primary" onClick={()=> setAllColors(prev => [...prev, {ColorTitle,ColorCode,ColorPrice,ColorPricePerLetter,ColorMinimumLetters}])}>Add Color</Button>
              </FormLayout.Group>
            </FormLayout>
            <ResourceList
                items={AllColors}
                renderItem={(item,index) => {
                  const {ColorTitle} = item;
                  return (
                    <ResourceItem
                      name={ColorTitle}
                    >
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {ColorTitle}
                        </Text>
                        <Button onClick={() => {
                          shopify.modal.show('edit-modal')
                          setEditIndex(index)
                          setEditColorTitle(item.ColorTitle)
                          setEditColorCode(item.ColorCode)
                          setEditColorPrice(item.ColorPrice)
                          setEditColorPricePerLetter(item.ColorPricePerLetter)
                          setEditColorMinimumLetters(item.ColorMinimumLetters)
                        }}>Edit</Button>
                        <Button onClick={() => {
                          setAllColors(prev => deleteByObject(prev,item))
                        }}>Delete</Button>
                      </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
          <Button fullWidth={true} variant="primary" onClick={()=> {
                  sendToAction({Action: "EDIT_Colors",id: item.id,ColorSectionTitle,ColorSectionDescription, ColorsModalBtnLbl, ColorsModalImgURL,AllColors:JSON.stringify(AllColors)})
          }} disabled={statechanged ? false : true}>Edit</Button>
        </BlockStack>
        <Modal id="edit-modal">
          <TitleBar title={editIndex}></TitleBar>
          <Box padding={400}>
          <FormLayout>
            <FormLayout.Group condensed>
                <TextField
                  label="Color Title"
                  value={EditColorTitle}
                  onChange={handleEditColorTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Color Code"
                  value={EditColorCode}
                  onChange={handleEditColorCodeChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={EditColorPrice}
                  onChange={handleEditColorPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={EditColorPricePerLetter}
                  onChange={handleEditColorPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={EditColorMinimumLetters}
                  onChange={handleEditColorMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> {setAllColors(prev => {
                  prev[editIndex] = {ColorTitle:EditColorTitle,ColorCode:EditColorCode,ColorPrice:EditColorPrice,ColorPricePerLetter:EditColorPricePerLetter,ColorMinimumLetters:EditColorMinimumLetters}
                  shopify.modal.hide('edit-modal')
                  return prev
                  })
                  setAllColors(prev => [...prev])}}>Edit</Button>
              </InlineStack>
            </FormLayout>
          </Box>
        </Modal>
        </Box>
    )
}