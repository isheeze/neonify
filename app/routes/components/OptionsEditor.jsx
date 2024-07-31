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

export default function OptionsEditor ({item, sendToAction, statechanged, setstatechanged}) {
    const shopify = useAppBridge();

    const [editIndex, setEditIndex] = useState(0)
    const [AllOptions, setAllOptions] = useState(item.AllOptions);

    const [OptionSectionTitle, setOptionSectionTitle] = useState(item.Title);

    const handleOptionSectionTitleChange = useCallback(
        (newValue) => {setOptionSectionTitle(newValue);setstatechanged(true)},
        [],
    );
    const [OptionSectionDescription, setOptionSectionDescription] = useState(item.Description);

    const handleOptionSectionDescriptionChange = useCallback(
        (newValue) => {setOptionSectionDescription(newValue);setstatechanged(true)},
        [],
    );
    const [OptionTitle, setOptionTitle] = useState("");

    const handleOptionTitleChange = useCallback(
        (newValue) => {setOptionTitle(newValue);setstatechanged(true)},
        [],
    );
    const [OptionDescription, setOptionDescriptionValue] = useState("");

    const handleOptionDescriptionChange = useCallback(
        (newValue) => {setOptionDescriptionValue(newValue);setstatechanged(true)},
        [],
    );
    const [OptionPrice, setOptionPrice] = useState(0);

    const handleOptionPriceChange = useCallback(
        (newValue) => {setOptionPrice(newValue);setstatechanged(true)},
        [],
    );
    const [OptionPricePerLetter, setOptionPricePerLetter] = useState(0);

    const handleOptionPricePerLetterChange = useCallback(
        (newValue) => {setOptionPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [OptionMinimumLetters, setOptionMinimumLetters] = useState(0);

    const handleOptionMinimumLettersChange = useCallback(
        (newValue) => {setOptionMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    const [OptionsModalBtnLbl, setOptionsModalBtnLbl] = useState(item.ModalBtnLbl);

    const handleOptionsModalBtnLblChange = useCallback(
        (newValue) => {setOptionsModalBtnLbl(newValue);setstatechanged(true)},
        [],
    );

    const [OptionsModalImgURL, setOptionsModalImgURL] = useState(item.ModalImgURL);

    const handleOptionsModalImgURLChange = useCallback(
        (newValue) => {setOptionsModalImgURL(newValue);setstatechanged(true)},
        [],
    );

    const [OptionModalBtnLbl, setOptionModalBtnLbl] = useState('');

    const handleOptionModalBtnLblChange = useCallback(
      (newValue) => setOptionModalBtnLbl(newValue),
      [],
    );
  
    const [OptionModalImgURL, setOptionModalImgURL] = useState('');
  
    const handleOptionModalImgURLChange = useCallback(
      (newValue) => setOptionModalImgURL(newValue),
      [],
    );
    const [OptionFullWidth, setOptionFullWidth] = useState(item.OptionFullWidth == 'true');
  
    const handleOptionFullWidthChange = useCallback(
      (newValue) => setOptionFullWidth(newValue),
      [],
    );
    
    const [OptionTextAlignCenter, setOptionTextAlignCenter] = useState(item.OptionTextAlignCenter == 'true');
  
    const handleOptionTextAlignCenterChange = useCallback(
      (newValue) => setOptionTextAlignCenter(newValue),
      [],
    );

    const [EditOptionTitle, setEditOptionTitle] = useState("");

    const handleEditOptionTitleChange = useCallback(
        (newValue) => {setEditOptionTitle(newValue);setstatechanged(true)},
        [],
    );
    const [EditOptionDescription, setEditOptionDescription] = useState("");

    const handleEditOptionDescriptionChange = useCallback(
        (newValue) => {setEditOptionDescription(newValue);setstatechanged(true)},
        [],
    );
    const [EditOptionPrice, setEditOptionPrice] = useState(0);

    const handleEditOptionPriceChange = useCallback(
        (newValue) => {setEditOptionPrice(newValue);setstatechanged(true)},
        [],
    );
    const [EditOptionPricePerLetter, setEditOptionPricePerLetter] = useState(0);

    const handleEditOptionPricePerLetterChange = useCallback(
        (newValue) => {setEditOptionPricePerLetter(newValue);setstatechanged(true)},
        [],
    );
    const [EditOptionMinimumLetters, setEditOptionMinimumLetters] = useState(0);

    const handleEditOptionMinimumLettersChange = useCallback(
        (newValue) => {setEditOptionMinimumLetters(newValue);setstatechanged(true)},
        [],
    );

    const [EditOptionModalBtnLbl, setEditOptionModalBtnLbl] = useState('More Details');

    const handleEditOptionModalBtnLblChange = useCallback(
      (newValue) => setEditOptionModalBtnLbl(newValue),
      [],
    );
  
    const [EditOptionModalImgURL, setEditOptionModalImgURL] = useState('');
  
    const handleEditOptionModalImgURLChange = useCallback(
      (newValue) => setEditOptionModalImgURL(newValue),
      [],
    );



    return(
        <Box padding={400}>
        <BlockStack gap={200}>
          <TextField
            label="Title"
            value={OptionSectionTitle}
            onChange={handleOptionSectionTitleChange}
            autoComplete="off"
          />
          <TextField
            label="Description"
            value={OptionSectionDescription}
            onChange={handleOptionSectionDescriptionChange}
            multiline={4}
            autoComplete="off"
          />
          <Checkbox
            label="Full Width"
            checked={OptionFullWidth}
            onChange={handleOptionFullWidthChange}
          />
          <Checkbox
            label="CenterAlignText"
            checked={OptionTextAlignCenter}
            onChange={handleOptionTextAlignCenterChange}
          />

          
          <TextField
            label="Popup Button Label"
            value={OptionsModalBtnLbl}
            onChange={handleOptionsModalBtnLblChange}
            autoComplete="off"
          />
          <TextField
            label="Url of Image in Popup"
            value={OptionsModalImgURL}
            onChange={handleOptionsModalImgURLChange}
            autoComplete="off"
          />
          <Box borderColor="border" borderWidth="025" borderRadius="200" padding={200}>
            <FormLayout>
            <FormLayout.Group condensed>
                <TextField
                  label="Title"
                  value={OptionTitle}
                  onChange={handleOptionTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Description"
                  value={OptionDescription}
                  onChange={handleOptionDescriptionChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Popup Button Label"
                  value={OptionModalBtnLbl}
                  onChange={handleOptionModalBtnLblChange}
                  autoComplete="off"
                />
                <TextField
                  label="Url of Image in Popup"
                  value={OptionModalImgURL}
                  onChange={handleOptionModalImgURLChange}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={OptionPrice}
                  onChange={handleOptionPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={OptionPricePerLetter}
                  onChange={handleOptionPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={OptionMinimumLetters}
                  onChange={handleOptionMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> setAllOptions(prev => [...prev, {OptionTitle,OptionDescription,OptionPrice,OptionPricePerLetter,OptionMinimumLetters, ModalBtnLbl:OptionModalBtnLbl, ModalImgURL:OptionModalImgURL}])}>Add Option</Button>
              </InlineStack>
            </FormLayout>
            <ResourceList
                items={AllOptions}
                renderItem={(item, index) => {
                  const {OptionTitle} = item;
                  return (
                    <ResourceItem
                      name={OptionTitle}
                    >
                    <InlineStack align="space-between">
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {OptionTitle}
                      </Text>
                      <Button onClick={() => {
                          shopify.modal.show('edit-modal')
                          setEditIndex(index)
                          setEditOptionTitle(item.OptionTitle)
                          setEditOptionDescription(item.OptionDescription)
                          setEditOptionPrice(item.OptionPrice)
                          setEditOptionPricePerLetter(item.OptionPricePerLetter)
                          setEditOptionMinimumLetters(item.OptionMinimumLetters)
                          setEditOptionModalImgURL(item.ModalImgURL)
                          setEditOptionModalBtnLbl(item.ModalBtnLbl)
                        }}>Edit</Button>
                      <Button onClick={() => {
                        setAllOptions(prev => deleteByObject(prev,item))
                      }}>Delete</Button>
                    </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
          <Button fullWidth={true} variant="primary" onClick={()=> {
                  sendToAction({Action: "EDIT_Options",id: item.id,OptionSectionTitle,OptionSectionDescription, OptionsModalBtnLbl, OptionsModalImgURL,AllOptions:JSON.stringify(AllOptions)})
          }} disabled={statechanged ? false : true}>Edit</Button>
        </BlockStack>
        <Modal id="edit-modal">
          <TitleBar title={editIndex}></TitleBar>
          <Box padding={400}>
          <FormLayout>
            <FormLayout.Group condensed>
                <TextField
                  label="Option Title"
                  value={EditOptionTitle}
                  onChange={handleEditOptionTitleChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Option Description"
                  value={EditOptionDescription}
                  onChange={handleEditOptionDescriptionChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Popup Button Label"
                  value={EditOptionModalBtnLbl}
                  onChange={handleEditOptionModalBtnLblChange}
                  autoComplete="off"
                />
                <TextField
                  label="Url of Image in Popup"
                  value={EditOptionModalImgURL}
                  onChange={handleEditOptionModalImgURLChange}
                  autoComplete="off"
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <TextField
                  label="Price"
                  type="number"
                  value={EditOptionPrice}
                  onChange={handleEditOptionPriceChange}
                  autoComplete="off"
                  autoSize={true}
                />
                <TextField
                  label="Price per letter"
                  type="number"
                  value={EditOptionPricePerLetter}
                  onChange={handleEditOptionPricePerLetterChange}
                  autoComplete="off"
                  autoSize={true}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Minimum number of letters"
                  type="number"
                  value={EditOptionMinimumLetters}
                  onChange={handleEditOptionMinimumLettersChange}
                  autoComplete="off"
                  autoSize={true}
                  helpText="Price per letter will apply if letters are more than minimum number of letters"
                />
              </FormLayout.Group>
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> {setAllOptions(prev => {
                  prev[editIndex] = {OptionTitle:EditOptionTitle,OptionDescription:EditOptionDescription,OptionPrice:EditOptionPrice,OptionPricePerLetter:EditOptionPricePerLetter,OptionMinimumLetters:EditOptionMinimumLetters,OptionModalBtnLbl:EditOptionModalBtnLbl,OptionModalImgURL:EditOptionModalImgURL}
                  shopify.modal.hide('edit-modal')
                  return prev
                  })
                  setAllOptions(prev => [...prev])}}>Edit</Button>
              </InlineStack>
            </FormLayout>
          </Box>
        </Modal>
        </Box>
    )
}