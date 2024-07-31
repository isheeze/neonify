import { useState, useCallback } from "react";
import {
    Box,
    Button,
    Checkbox,
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

export default function FontsEditor ({item, sendToAction, statechanged, setstatechanged}) {
    const shopify = useAppBridge();

    const [editIndex, setEditIndex] = useState(0)
    const [AllFonts, setAllFonts] = useState(item.AllFonts);

    const [FontSectionTitle, setFontSectionTitle] = useState(item.Title);

    const handleFontSectionTitleChange = useCallback(
        (newValue) => {setFontSectionTitle(newValue);setstatechanged(true)},
        [],
    );
    const [FontSectionDescription, setFontSectionDescription] = useState(item.Description);

    const handleFontSectionDescriptionChange = useCallback(
        (newValue) => {setFontSectionDescription(newValue);setstatechanged(true)},
        [],
    );
    const [FontTitle, setFontTitle] = useState("");

    const handleFontTitleChange = useCallback(
        (newValue) => {setFontTitle(newValue);setstatechanged(true)},
        [],
    );
    const [FontFile, setFontFileValue] = useState("");

    const handleFontFileChange = useCallback(
        (newValue) => {setFontFileValue(newValue);setstatechanged(true)},
        [],
    );
    const [FontPrice, setFontPrice] = useState(0);

    const handleFontPriceChange = useCallback(
        (newValue) => {setFontPrice(newValue);setstatechanged(true)},
        [],
    );
    const [FontPricePerLetter, setFontPricePerLetter] = useState(0);

    const handleFontPricePerLetterChange = useCallback(
        (newValue) => {setFontPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [FontMinimumLetters, setFontMinimumLetters] = useState(0);

    const handleFontMinimumLettersChange = useCallback(
        (newValue) => {setFontMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    const [FontsModalBtnLbl, setFontsModalBtnLbl] = useState(item.ModalBtnLbl);

    const handleFontsModalBtnLblChange = useCallback(
        (newValue) => {setFontsModalBtnLbl(newValue);setstatechanged(true)},
        [],
    );

    const [FontsModalImgURL, setFontsModalImgURL] = useState(item.ModalImgURL);

    const handleFontsModalImgURLChange = useCallback(
        (newValue) => {setFontsModalImgURL(newValue);setstatechanged(true)},
        [],
    );

    const [EditFontTitle, setEditFontTitle] = useState("");

    const handleEditFontTitleChange = useCallback(
        (newValue) => {setEditFontTitle(newValue);setstatechanged(true)},
        [],
    );
    const [EditFontFile, setEditFontFile] = useState("");

    const handleEditFontFileChange = useCallback(
        (newValue) => {setEditFontFile(newValue);setstatechanged(true)},
        [],
    );
    const [EditFontPrice, setEditFontPrice] = useState(0);

    const handleEditFontPriceChange = useCallback(
        (newValue) => {setEditFontPrice(newValue);setstatechanged(true)},
        [],
    );
    const [EditFontPricePerLetter, setEditFontPricePerLetter] = useState(0);

    const handleEditFontPricePerLetterChange = useCallback(
        (newValue) => {setEditFontPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [EditFontMinimumLetters, setEditFontMinimumLetters] = useState(0);

    const handleEditFontMinimumLettersChange = useCallback(
        (newValue) => {setEditFontMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    return(
        <Box padding={400}>
        <BlockStack gap={200}>
          <TextField
            label="Title"
            value={FontSectionTitle}
            onChange={handleFontSectionTitleChange}
            autoComplete="off"
          />
          <TextField
            label="Description"
            value={FontSectionDescription}
            onChange={handleFontSectionDescriptionChange}
            multiline={4}
            autoComplete="off"
          />

          
          <TextField
            label="Popup Button Label"
            value={FontsModalBtnLbl}
            onChange={handleFontsModalBtnLblChange}
            autoComplete="off"
          />
          <TextField
            label="Url of Image in Popup"
            value={FontsModalImgURL}
            onChange={handleFontsModalImgURLChange}
            autoComplete="off"
          />
          <Box borderColor="border" borderWidth="025" borderRadius="200" padding={200}>
            <FormLayout>
              <FormLayout.Group condensed>
                <TextField
                  label="Font Title"
                  value={FontTitle}
                  onChange={handleFontTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="URL of Font file (.ttf)"
                  value={FontFile}
                  onChange={handleFontFileChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={FontPrice}
                  onChange={handleFontPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={FontPricePerLetter}
                  onChange={handleFontPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={FontMinimumLetters}
                  onChange={handleFontMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <Button variant="primary" onClick={()=> setAllFonts(prev => [...prev, {FontTitle,FontFile,FontPrice,FontPricePerLetter,FontMinimumLetters}])}>Add Font</Button>
              </FormLayout.Group>
            </FormLayout>
            <ResourceList
                items={AllFonts}
                renderItem={(item,index) => {
                  const {FontTitle} = item;
                  return (
                    <ResourceItem
                      name={FontTitle}
                    >
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {FontTitle}
                        </Text>
                        <Button onClick={() => {
                          shopify.modal.show('edit-modal')
                          setEditIndex(index)
                          setEditFontTitle(item.FontTitle)
                          setEditFontFile(item.FontFile)
                          setEditFontPrice(item.FontPrice)
                          setEditFontPricePerLetter(item.FontPricePerLetter)
                          setEditFontMinimumLetters(item.FontMinimumLetters)
                        }}>Edit</Button>
                        <Button onClick={() => {
                          setAllFonts(prev => deleteByObject(prev,item))
                        }}>Delete</Button>
                      </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
          <Button fullWidth={true} variant="primary" onClick={()=> {
                  sendToAction({Action: "EDIT_Fonts",id: item.id,FontSectionTitle,FontSectionDescription, FontsModalBtnLbl, FontsModalImgURL,AllFonts:JSON.stringify(AllFonts)})
          }} disabled={statechanged ? false : true}>Edit</Button>
        </BlockStack>
        <Modal id="edit-modal">
          <TitleBar title={editIndex}></TitleBar>
          <Box padding={400}>
          <FormLayout>
            <FormLayout.Group condensed>
                <TextField
                  label="Font Title"
                  value={EditFontTitle}
                  onChange={handleEditFontTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="URL of Font file (.ttf)"
                  value={EditFontFile}
                  onChange={handleEditFontFileChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={EditFontPrice}
                  onChange={handleEditFontPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={EditFontPricePerLetter}
                  onChange={handleEditFontPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={EditFontMinimumLetters}
                  onChange={handleEditFontMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> {setAllFonts(prev => {
                  prev[editIndex] = {FontTitle:EditFontTitle,FontFile:EditFontFile,FontPrice:EditFontPrice,FontPricePerLetter:EditFontPricePerLetter,FontMinimumLetters:EditFontMinimumLetters}
                  shopify.modal.hide('edit-modal')
                  return prev
                  })
                  setAllFonts(prev => [...prev])}}>Edit</Button>
              </InlineStack>
            </FormLayout>
          </Box>
        </Modal>
        </Box>
    )
}