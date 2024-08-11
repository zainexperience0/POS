import { CheckboxField } from "./FieldList/Checkbox";
import { DateInputField } from "./FieldList/DateInput";
import { EmailInputField } from "./FieldList/EmailInputField";
import { FileInputField } from "./FieldList/FileInputField";
import MarkdownInputField from "./FieldList/MarkdownInputField";
import MultiSelectField from "./FieldList/MultiSelectField";
import { NumberInputField } from "./FieldList/NumberInputField";
import { PhoneInputField } from "./FieldList/PhoneInputField";
import RadioInputField from "./FieldList/RadioIputField";
import { RedirectButtonField } from "./FieldList/RedirectButtonField";
import SelectInputField from "./FieldList/SelectInputField";
import { SwitchField } from "./FieldList/SwitchField";
import { TextAreaInput } from "./FieldList/TextAreaInput";
import { TextInputField } from "./FieldList/textInputs";
import { ToogleInputField } from "./FieldList/ToogleInputField";
import { UrlInputField } from "./FieldList/UrlInputField";
import { MultiSelectToogle } from "./FieldList/MultiSelectToogle";
import { CustomTagInput } from "./FieldList/TagInput";
import { PasswordInputField } from "./FieldList/PasswordInput";

export const RenderInput = ({ field, record, setRecord }: any) => {
  const inputComponents: any = {
    textInput: (
      <TextInputField field={field} record={record} setRecord={setRecord} />
    ),
    passwordInput: (
      <PasswordInputField field={field} record={record} setRecord={setRecord} />
    ),
    numberInput: (
      <NumberInputField field={field} record={record} setRecord={setRecord} />
    ),
    emailInput: (
      <EmailInputField field={field} record={record} setRecord={setRecord} />
    ),
    phoneInput: (
      <PhoneInputField field={field} record={record} setRecord={setRecord} />
    ),
    textareaInput: (
      <TextAreaInput field={field} record={record} setRecord={setRecord} />
    ),
    dateInput: (
      <DateInputField field={field} record={record} setRecord={setRecord} />
    ),
    switchInput: (
      <SwitchField field={field} record={record} setRecord={setRecord} />
    ),
    checkboxInput: (
      <CheckboxField field={field} record={record} setRecord={setRecord} />
    ),
    msSelectInput: (
      <MultiSelectField field={field} record={record} setRecord={setRecord} />
    ),
    selectInput: (
      <SelectInputField field={field} record={record} setRecord={setRecord} />
    ),
    radioInput: (
      <RadioInputField field={field} record={record} setRecord={setRecord} />
    ),
    toogleInput: (
      <ToogleInputField field={field} record={record} setRecord={setRecord} />
    ),
    mstoogleInput: (
      <MultiSelectToogle field={field} record={record} setRecord={setRecord} />
    ),
    tagInput: (
      <CustomTagInput field={field} record={record} setRecord={setRecord} />
    ),
    markdownInput: (
      <MarkdownInputField field={field} record={record} setRecord={setRecord} />
    ),
    urlInput: (
      <UrlInputField field={field} record={record} setRecord={setRecord} />
    ),
    fileInput: (
      <FileInputField field={field} record={record} setRecord={setRecord} />
    ),
    redirectButton: (
      <RedirectButtonField
        field={field}
        record={record}
        setRecord={setRecord}
      />
    ),
  };

  return (
    <div className="mb-4 flex flex-col">
      {inputComponents[field.type] || null}
    </div>
  );
};
