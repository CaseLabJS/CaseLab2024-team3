import { DocumentState } from 'src/types/state';

export * from './assignComponent';
export * from './adminTypes';
export * from './state';

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

type Role = {
  id: number;
  name: string;
};

export type UserRegister = UserLogin & {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  roles: Role[];
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

export type ChangeDocument = {
  attributeValues: Attribute[];
  name: string;
  base64Data: string;
};

export type ChangeDocumentResponse = CreateDocumentResponse;

export type CreateDocument = ChangeDocument & {
  documentTypeId: number;
};

export type CreateDocumentResponse = {
  author?: string;
  documentName: string;
  createdAt: number | string;
  contentUrl: string;
  state: DocumentState;
  documentId: number;
  attributeValues: Attribute[];
  documentVersionId: number;
};

export type GetDocument = {
  id: number;
  author: string;
  createdAt: number | string;
  documentName: string;
  contentUrl: string;
  state: DocumentState;
};

export type GetDocumentsResponse = Pagination & {
  content: GetDocument[];
};

export interface SendDocumentForSignResponse {
  id: number;
  approvementProcessId: number | null;
  userId: string;
  createdAt: number | string;
  status: DocumentState;
  documentVersionId: number;
  signatureId: number | null;
}

export type Attribute = {
  attributeId: number;
  value: string;
};

export type Initiator = 'owner' | 'signer';

//____________________ Document end ____________________

//____________________ Voting start ____________________
export type Voting = {
  documentId: number;
  deadline: string | number;
  agreementPercent: number;
  usersIds: string[];
};
