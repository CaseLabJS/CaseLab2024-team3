// User
export type UserLogin = {
  login: string;
  password: string;
};

export type AuthUserResponse = {
  refreshToken: string;
  jwt: string;
};

export type UserRegister = UserLogin & {
  email: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  roles: string[];
};

export type ChangeUser = Omit<UserRegister, "password"> & { // GET, PUT
    id: string;
};

// Document type
export type CreateDocumentType = {
  name: string;
  description?: string;
  attributeIds?: string[];
};

export type ChangeDocumentType = CreateDocumentType & { // GET, PUT
  id: number;
};

// attribute-controller
export type CreateAttribute = {
  name: string;
  dataType: string;
  documentTypeIds?: number[];
  required?: boolean;
};

export type ChangeAttribute = CreateAttribute & { // GET, PUT
  id: number;
};

// document-attribute-value-controller
export type CreateAttributeValue = {
  attributeId: number;
  documentId: number;
  value?: string;
};

export type ChangeAttributeValue = CreateAttributeValue & { // GET, PUT
  id: number;
};

// Document
export type CreateDocument = {
  attributeId?: number;
  documentTypeId: number;
  userId: string;
  name: string;
  data: string;
};

export type ChangeDocument = { // GET, PUT
  id: number;
  documentTypeId?: number;
  userId?: string;
  createdAt?: string;
  name?: string;
  data?: string;
};
