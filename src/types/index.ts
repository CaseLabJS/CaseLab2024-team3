export * from './assignComponent';

export type Pagination = {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

export type PaginationDataResponse = {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean;
  empty: boolean;
};

// User
export type UserLogin = {
  login: string;
  password: string;
};

export type AuthUserResponse = {
  userId: string;
  refreshToken: string;
  jwt: string;
};

export type UserRegister = UserLogin & {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  roles: [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'USER' }
  ];
};

export type ChangeUser = Omit<UserRegister, 'password'> & {
  // GET, PUT
  id: string;
};

export type GetUsersResponse = Pagination & {
  content: ChangeUser[];
};

// Document type
export type CreateDocumentType = {
  name: string;
  description?: string;
  attributeIds?: string[];
};

export type ChangeDocumentType = CreateDocumentType & {
  // GET, PUT
  id: number;
};

export type GetDocumentTypesResponse = PaginationDataResponse & {
  content: ChangeDocumentType[];
};

// attribute-controller
export type CreateAttribute = {
  name: string;
  dataType: string;
  documentTypeIds?: number[];
  required?: boolean;
};

export type ChangeAttribute = CreateAttribute & {
  // GET, PUT
  id: number;
};

export type GetAttributesResponse = PaginationDataResponse & {
  content: ChangeAttributeValue[];
};

// document-attribute-value-controller
export type CreateAttributeValue = {
  attributeId: number;
  documentId: number;
  value?: string;
};

export type ChangeAttributeValue = CreateAttributeValue & {
  // GET, PUT
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

export type ChangeDocument = {
  // GET, PUT
  id: number;
  documentTypeId?: number;
  userId?: string;
  createdAt?: string;
  name?: string;
  data?: string;
};

export type CreateDocumentResponse = {
  id: number;
  documentName: string;
  createdAt: string;
  updatedAt: string;
  contentUrl: string;
  documentId: number;
};

export type GetDocumentsResponse = Pagination & {
  content: CreateDocumentResponse[];
};
