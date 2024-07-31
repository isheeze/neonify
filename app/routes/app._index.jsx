import { useEffect, useState, useCallback } from "react";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  InlineStack,
  ResourceList, ResourceItem,
  Box,
  Button,
  Checkbox,
  TextField,
  FormLayout
} from "@shopify/polaris";
import { TitleBar, useAppBridge, Modal } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

import { getMetafield, addSection, deleteItems } from "../GraphQLUtilities";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const metafield = JSON.parse(await getMetafield(admin)) || []
  console.log("-=-=-=- >>>> ",metafield)
  return json(metafield);
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  var res = []

  const data = await request.formData()
  switch(data.get("Action")){
    case 'ADD_TEXTAREA':{
      const Title = data.get("TextAreaTitle")
      const Description = data.get("TextAreaDescription")
      const DefaultValue = data.get("TextAreaDefaultValue")
      const ShowTextAlignButtons = data.get("checkedShowTextAlignButtons")
      const TextAreaModalBtnLbl = data.get("TextAreaModalBtnLbl")
      const TextAreaModalImgURL = data.get("TextAreaModalImgURL")

      res = await addSection(admin, {Title, Description, DefaultValue, ShowTextAlignButtons, ModalBtnLbl: TextAreaModalBtnLbl, ModalImgURL: TextAreaModalImgURL},"Textarea")
    }break;
    case 'ADD_FONT_SECTION':{
      const Title = data.get("FontSectionTitle")
      const Description = data.get("FontSectionDescription")
      const AllFonts = data.get("AllFonts")
      const FontsModalBtnLbl = data.get("FontsModalBtnLbl")
      const FontsModalImgURL = data.get("FontsModalImgURL")

      res = await addSection(admin, {Title, Description, ModalBtnLbl: FontsModalBtnLbl, ModalImgURL: FontsModalImgURL, AllFonts:JSON.parse(AllFonts)},"Fonts")
    }break;
    case 'ADD_COLOR_SECTION':{
      const Title = data.get("ColorSectionTitle")
      const Description = data.get("ColorSectionDescription")
      const AllColors = data.get("AllColors")
      const ColorsModalBtnLbl = data.get("ColorsModalBtnLbl")
      const ColorsModalImgURL = data.get("ColorsModalImgURL")

      res = await addSection(admin, {Title, Description, ModalBtnLbl: ColorsModalBtnLbl, ModalImgURL: ColorsModalImgURL, AllColors:JSON.parse(AllColors)},"Colors")
    }break;
    case 'ADD_OPTION_SECTION':{
      const Title = data.get("OptionSectionTitle")
      const Description = data.get("OptionSectionDescription")
      const OptionFullWidth = data.get("OptionFullWidth")
      const AllOptions = data.get("AllOptions")
      const OptionsModalBtnLbl = data.get("OptionsModalBtnLbl")
      const OptionsModalImgURL = data.get("OptionsModalImgURL")
      const OptionTextAlignCenter = data.get("OptionTextAlignCenter")

      res = await addSection(admin, {Title, Description, OptionFullWidth, OptionTextAlignCenter, ModalBtnLbl: OptionsModalBtnLbl, ModalImgURL: OptionsModalImgURL, AllOptions:JSON.parse(AllOptions)},"Options")
    }break;
    case 'DELETE_ITEM':
      const ids = data.get("Items") || []
      res = await deleteItems(admin, ids)
      break;
    default:
      console.log("Unhandled endpoint...");
  }
  
  return {res};
};

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

export default function Index() {
  const fetcher = useFetcher();
  var items = fetcher.data?.res ? fetcher.data?.res : useLoaderData()
  const shopify = useAppBridge();
  const [selectedItems, setSelectedItems] = useState([]);
  const sendToAction = (data) => {
    fetcher.submit(data, { method: "POST" })
  }
  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: () => fetcher.submit({Action:"DELETE_ITEM",Items:selectedItems}, { method: "POST" }),
    }
  ]

  /********************* TextArea **********************/
  const [checkedShowTextAlignButtons, setCheckedShowTextAlignButtons] = useState(true);
  const handlecheckedShowTextAlignButtonsChange = useCallback(
    (newChecked) => setCheckedShowTextAlignButtons(newChecked),
    [],
  );

  const [TextAreaTitle, setTextAreaTitle] = useState('');

  const handleTextAreaTitleChange = useCallback(
    (newValue) => setTextAreaTitle(newValue),
    [],
  );

  const [TextAreaDescription, setTextAreaDescription] = useState('');

  const handleTextAreaDescriptionChange = useCallback(
    (newValue) => setTextAreaDescription(newValue),
    [],
  );

  const [TextAreaDefaultValue, setTextAreaDefaultValue] = useState('');

  const handleTextAreaDefaultValueChange = useCallback(
    (newValue) => setTextAreaDefaultValue(newValue),
    [],
  );

  const [TextAreaModalBtnLbl, setTextAreaModalBtnLbl] = useState('');

  const handleTextAreaModalBtnLblChange = useCallback(
    (newValue) => setTextAreaModalBtnLbl(newValue),
    [],
  );

  const [TextAreaModalImgURL, setTextAreaModalImgURL] = useState('');

  const handleTextAreaModalImgURLChange = useCallback(
    (newValue) => setTextAreaModalImgURL(newValue),
    [],
  );

  const resetTextArea = () => {
    setCheckedShowTextAlignButtons(true)
    setTextAreaTitle('Enter Your Text')
    setTextAreaDescription('Click below to edit the text on your neon sign.')
    setTextAreaDefaultValue('Your Text')
    setTextAreaModalBtnLbl('')
    setTextAreaModalImgURL('')
  }

  /********************* Fonts **********************/
  const [AllFonts, setAllFonts] = useState([]);

  const [FontSectionTitle, setFontSectionTitle] = useState('');

  const handleFontSectionTitleChange = useCallback(
    (newValue) => setFontSectionTitle(newValue),
    [],
  );
  const [FontSectionDescription, setFontSectionDescription] = useState('');

  const handleFontSectionDescriptionChange = useCallback(
    (newValue) => setFontSectionDescription(newValue),
    [],
  );
  const [FontTitle, setFontTitle] = useState('');

  const handleFontTitleChange = useCallback(
    (newValue) => setFontTitle(newValue),
    [],
  );
  const [FontFile, setFontFileValue] = useState('');

  const handleFontFileChange = useCallback(
    (newValue) => setFontFileValue(newValue),
    [],
  );
  const [FontPrice, setFontPrice] = useState(0);

  const handleFontPriceChange = useCallback(
    (newValue) => setFontPrice(newValue),
    [],
  );
  const [FontPricePerLetter, setFontPricePerLetter] = useState(0);

  const handleFontPricePerLetterChange = useCallback(
    (newValue) => setFontPricePerLetter(newValue),
    [],
  );
  const [FontMinimumLetters, setFontMinimumLetters] = useState(8);

  const handleFontMinimumLettersChange = useCallback(
    (newValue) => setFontMinimumLetters(newValue),
    [],
  );

  const [FontsModalBtnLbl, setFontsModalBtnLbl] = useState('');

  const handleFontsModalBtnLblChange = useCallback(
    (newValue) => setFontsModalBtnLbl(newValue),
    [],
  );

  const [FontsModalImgURL, setFontsModalImgURL] = useState('');

  const handleFontsModalImgURLChange = useCallback(
    (newValue) => setFontsModalImgURL(newValue),
    [],
  );

  const resetFonts = () => {
    setAllFonts([])
    setFontSectionTitle('Choose Fonts')
    setFontSectionDescription('Pick from over 40 typefaces prices vary by the amount of LED neon required.')
    setFontTitle('')
    setFontFileValue('')
    setFontPrice(0)
    setFontPricePerLetter(0)
    setFontMinimumLetters(8)
    setFontsModalBtnLbl('')
    setFontsModalImgURL('')
  }
  /********************* Colors **********************/
  const [AllColors, setAllColors] = useState([]);

  const [ColorSectionTitle, setColorSectionTitle] = useState('');

  const handleColorSectionTitleChange = useCallback(
    (newValue) => setColorSectionTitle(newValue),
    [],
  );
  const [ColorSectionDescription, setColorSectionDescription] = useState('');

  const handleColorSectionDescriptionChange = useCallback(
    (newValue) => setColorSectionDescription(newValue),
    [],
  );
  const [ColorTitle, setColorTitle] = useState('');

  const handleColorTitleChange = useCallback(
    (newValue) => setColorTitle(newValue),
    [],
  );
  const [ColorCode, setColorCodeValue] = useState('');

  const handleColorCodeChange = useCallback(
    (newValue) => setColorCodeValue(newValue),
    [],
  );
  const [ColorPrice, setColorPrice] = useState(0);

  const handleColorPriceChange = useCallback(
    (newValue) => setColorPrice(newValue),
    [],
  );
  const [ColorPricePerLetter, setColorPricePerLetter] = useState(0);

  const handleColorPricePerLetterChange = useCallback(
    (newValue) => setColorPricePerLetter(newValue),
    [],
  );
  const [ColorMinimumLetters, setColorMinimumLetters] = useState(8);

  const handleColorMinimumLettersChange = useCallback(
    (newValue) => setColorMinimumLetters(newValue),
    [],
  );

  const [ColorsModalBtnLbl, setColorsModalBtnLbl] = useState('');

  const handleColorsModalBtnLblChange = useCallback(
    (newValue) => setColorsModalBtnLbl(newValue),
    [],
  );

  const [ColorsModalImgURL, setColorsModalImgURL] = useState('');

  const handleColorsModalImgURLChange = useCallback(
    (newValue) => setColorsModalImgURL(newValue),
    [],
  );

  const resetColors = () => {
    setAllColors([])
    setColorSectionTitle('Colors')
    setColorSectionDescription('')
    setColorTitle('')
    setColorCodeValue('')
    setColorPrice(0)
    setColorPricePerLetter(0)
    setColorMinimumLetters(8)
    setColorsModalBtnLbl('')
    setColorsModalImgURL('')
  }
  /********************* Options **********************/
  const [AllOptions, setAllOptions] = useState([]);

  const [OptionSectionTitle, setOptionSectionTitle] = useState('');

  const handleOptionSectionTitleChange = useCallback(
    (newValue) => setOptionSectionTitle(newValue),
    [],
  );
  const [OptionSectionDescription, setOptionSectionDescription] = useState('');

  const handleOptionSectionDescriptionChange = useCallback(
    (newValue) => setOptionSectionDescription(newValue),
    [],
  );
  const [OptionTitle, setOptionTitle] = useState('');

  const handleOptionTitleChange = useCallback(
    (newValue) => setOptionTitle(newValue),
    [],
  );
  const [OptionDescription, setOptionDescriptionValue] = useState('');

  const handleOptionDescriptionChange = useCallback(
    (newValue) => setOptionDescriptionValue(newValue),
    [],
  );
  const [OptionPrice, setOptionPrice] = useState(0);

  const handleOptionPriceChange = useCallback(
    (newValue) => setOptionPrice(newValue),
    [],
  );
  const [OptionPricePerLetter, setOptionPricePerLetter] = useState(0);

  const handleOptionPricePerLetterChange = useCallback(
    (newValue) => setOptionPricePerLetter(newValue),
    [],
  );
  const [OptionMinimumLetters, setOptionMinimumLetters] = useState(8);

  const handleOptionMinimumLettersChange = useCallback(
    (newValue) => setOptionMinimumLetters(newValue),
    [],
  );
  const [OptionFullWidth, setOptionFullWidth] = useState(false);

  const handleOptionFullWidthChange = useCallback(
    (newValue) => setOptionFullWidth(newValue),
    [],
  );
  
  const [OptionTextAlignCenter, setOptionTextAlignCenter] = useState(false);

  const handleOptionTextAlignCenterChange = useCallback(
    (newValue) => setOptionTextAlignCenter(newValue),
    [],
  );

  const [OptionsModalBtnLbl, setOptionsModalBtnLbl] = useState('');

  const handleOptionsModalBtnLblChange = useCallback(
    (newValue) => setOptionsModalBtnLbl(newValue),
    [],
  );

  const [OptionsModalImgURL, setOptionsModalImgURL] = useState('');

  const handleOptionsModalImgURLChange = useCallback(
    (newValue) => setOptionsModalImgURL(newValue),
    [],
  );

  const [OptionModalBtnLbl, setOptionModalBtnLbl] = useState('More Details');

  const handleOptionModalBtnLblChange = useCallback(
    (newValue) => setOptionModalBtnLbl(newValue),
    [],
  );

  const [OptionModalImgURL, setOptionModalImgURL] = useState('');

  const handleOptionModalImgURLChange = useCallback(
    (newValue) => setOptionModalImgURL(newValue),
    [],
  );

  
  const resetOptions = () => {
    setAllOptions([])
    setOptionSectionTitle('Choose Option')
    setOptionSectionDescription('')
    setOptionTitle('')
    setOptionDescriptionValue('')
    setOptionPrice(0)
    setOptionPricePerLetter(0)
    setOptionMinimumLetters(8)
    setOptionFullWidth(false)
    setOptionTextAlignCenter(false)
    setOptionsModalBtnLbl('')
    setOptionsModalImgURL('')
    setOptionModalBtnLbl('')
    setOptionModalImgURL('')
  }

  return (
    <Page>
      <TitleBar title="Adjust Your Editor">
        <button variant="primary" onClick={() => shopify.modal.show('type-modal')}>Add Section</button>
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
              <ResourceList
                resourceName={{singular: 'Editor Block', plural: 'Editor Blocks'}}
                items={items}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                selectable
                promotedBulkActions={promotedBulkActions}
                renderItem={(item) => {
                  const {id,type,Title} = item;
                  return (
                    <ResourceItem
                      id={id}
                      url={`/app/edit/${id}`}
                      accessibilityLabel={`View details for ${Title}`}
                      name={Title}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {type}
                      </Text>
                      {Title}
                    </ResourceItem>
                  );
                }}
              />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
      <Modal id="type-modal" variant="max">
        <TitleBar title="Choose Section Type"></TitleBar>
        <Box padding={400}>
          <Button variant="tertiary" fullWidth={true} onClick={() => {resetTextArea(); shopify.modal.show('textarea-modal')}}>TextArea</Button>
          <Button variant="tertiary" fullWidth={true} onClick={() => {resetFonts(); shopify.modal.show('font-modal')}}>Fonts Dropdown</Button>
          <Button variant="tertiary" fullWidth={true} onClick={() => {resetColors(); shopify.modal.show('colors-modal')}}>Colors</Button>
          <Button variant="tertiary" fullWidth={true} onClick={() => {resetOptions(); shopify.modal.show('options-modal')}}>Options</Button>
        </Box>
      </Modal>
      <Modal id="textarea-modal">
        <TitleBar title="TextArea Settings">
          <button variant="primary" onClick={()=> {
              sendToAction({Action: "ADD_TEXTAREA",TextAreaTitle,TextAreaDescription,TextAreaDefaultValue,checkedShowTextAlignButtons, TextAreaModalBtnLbl, TextAreaModalImgURL})
              shopify.modal.hide('textarea-modal')
              shopify.modal.hide('type-modal')
            }
          }>Save</button>
        </TitleBar>
        <Box padding={400}>
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
        </Box>
      </Modal>
      <Modal id="font-modal">
        <TitleBar title="Fonts Settings">
          <button variant="primary" onClick={()=> {
              sendToAction({Action: "ADD_FONT_SECTION",FontSectionTitle,FontSectionDescription, FontsModalBtnLbl, FontsModalImgURL,AllFonts:JSON.stringify(AllFonts)})
              shopify.modal.hide('font-modal')
              shopify.modal.hide('type-modal')
            }
          }>Save</button>
        </TitleBar>
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
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> setAllFonts(prev => [...prev, {FontTitle,FontFile,FontPrice,FontPricePerLetter,FontMinimumLetters}])}>Add Font</Button>
                
              </InlineStack>
            </FormLayout>
            <ResourceList
                items={AllFonts}
                renderItem={(item) => {
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
                          setAllFonts(prev => deleteByObject(prev,item))
                        }}>Delete</Button>
                      </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
        </BlockStack>
        </Box>
      </Modal>
      <Modal id="colors-modal">
        <TitleBar title="Colors Settings">
          <button variant="primary" onClick={()=> {
              sendToAction({Action: "ADD_COLOR_SECTION",ColorSectionTitle,ColorSectionDescription, ColorsModalBtnLbl, ColorsModalImgURL,AllColors:JSON.stringify(AllColors)})
              shopify.modal.hide('colors-modal')
              shopify.modal.hide('type-modal')
            }
          }>Save</button>
        </TitleBar>
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
              <InlineStack gap={200}>
                <Button variant="primary" onClick={()=> setAllColors(prev => [...prev, {ColorTitle,ColorCode,ColorPrice,ColorPricePerLetter,ColorMinimumLetters}])}>Add Color</Button>
              </InlineStack>
            </FormLayout>
            <ResourceList
                items={AllColors}
                renderItem={(item) => {
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
                          setAllColors(prev => deleteByObject(prev,item))
                        }}>Delete</Button>
                      </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
        </BlockStack>
        </Box>
      </Modal>
      <Modal id="options-modal">
        <TitleBar title="Options Settings">
          <button variant="primary" onClick={()=> {
              sendToAction({Action: "ADD_OPTION_SECTION",OptionSectionTitle,OptionSectionDescription,OptionFullWidth,OptionTextAlignCenter, OptionsModalBtnLbl, OptionsModalImgURL,AllOptions:JSON.stringify(AllOptions)})
              shopify.modal.hide('options-modal')
              shopify.modal.hide('type-modal')
            }
          }>Save</button>
        </TitleBar>
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
                renderItem={(item) => {
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
                        setAllOptions(prev => deleteByObject(prev,item))
                      }}>Delete</Button>
                    </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
          </Box>
        </BlockStack>
        </Box>
      </Modal>
    </Page>
  );
}