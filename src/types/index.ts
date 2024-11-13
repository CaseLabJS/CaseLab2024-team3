export * from './assignComponent';
export * from './adminTypes';

// ____________________ Pagination start ____________________
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

// ____________________ Pagination end ____________________

//____________________ User start ____________________
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
  roles: { id: number; name: string }[];
};

export type ChangeUser = Omit<UserRegister, 'password'> & {
  // GET, PUT
  id: string;
};

export type GetUsersResponse = Pagination & {
  content: ChangeUser[];
};

// ____________________ User end ____________________

// ____________________ Document type start ____________________
export type CreateDocumentType = {
  name: string;
  description: string | null;
  attributeIds: number[] | null;
};

export type ChangeDocumentType = CreateDocumentType & {
  // GET, PUT
  id: number;
};

export type GetDocumentTypesResponse = PaginationDataResponse & {
  content: ChangeDocumentType[];
};

// ____________________ Document type end ____________________

// ____________________ Attribute start ____________________
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
  content: ChangeAttribute[];
};

// ____________________ Attribute end ____________________

// ____________________ Document attribute value start ____________________
export type CreateAttributeValue = {
  attributeId: number;
  documentId: number;
  value?: string;
};

export type ChangeAttributeValue = CreateAttributeValue & {
  // GET, PUT
  id: number;
};

//____________________ Document attribute value end ____________________

// ____________________ Document start ____________________
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

export type DocumentSign = {
  documentId: number;
  documentTypeId: number;
  userId: string;
  createdAt: string;
};

export type GetDocumentsForSignResponse = Pagination & {
  content: DocumentSign[];
};