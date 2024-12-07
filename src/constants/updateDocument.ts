export const DIALOGS_VALUES = {
  docTypesCreate: {
    dialogTitleText: 'Изменение документа',
    dialogDescriptionText:
      'Для изменения документа необходимо заполнить поля ниже. Поля с * обязательны.',
    btnTriggerText: 'Изменить документ',
  },
};

export const EMPTY_DOC = {
  attributeValues: [
    {
      attributeId: 0,
      value: '',
    },
  ],
  name: '',
  base64Data: '',
};

export const fieldLabels: Record<string, { label: string; hidden: boolean }> = {
  attributeValues: { label: 'Атрибут документа', hidden: true },
  name: { label: 'Название документа', hidden: false },
  base64Data: { label: 'Файл', hidden: false },
};
