export const DIALOGS_VALUES = {
  docTypesCreate: {
    dialogTitleText: 'Создание документа',
    dialogDescriptionText:
      'Для создания документа необходимо заполнить поля ниже.',
    btnTriggerText: 'Создать документ',
  },
};

export const EMPTY_DOC = {
  attributeValues: [
    {
      attributeId: 0,
      value: '',
    },
  ],
  documentTypeId: 0,
  name: '',
  file:{
    fileName: '',
    base64Data: '',
  },
  
};

export const fieldLabels: Record<string, { label: string; hidden: boolean }> = {
  name: { label: 'Название документа', hidden: false },
  documentTypeId: { label: 'ID типа документа', hidden: true },
  file: { label: 'Файл', hidden: false },
  attributeValues: { label: 'Атрибут документа', hidden: true },
};
