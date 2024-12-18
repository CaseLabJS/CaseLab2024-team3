export const ROUTE_CONSTANTS = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DEFAULT: '/',

  APP: 'app',
  USER_DASHBOARD_INDEX: '',
  USER_DOCUMENTS: 'documents',
  USER_DOCUMENT: ':documentId',
  USER_AWAITING_SIGN_DOCUMENT: 'awaiting-sign/:documentId',
  USER_SENT_FOR_SIGN: 'sent-for-sign',
  USER_SENT_FOR_SIGN_DOCUMENT: 'sent-for-sign/:documentId',
  USER_AWAITING_SIGN: 'awaiting-sign',
  USER_AFTER_SIGN: 'after-sign',
  USER_AFTER_SIGN_DOCUMENT: 'after-sign/:documentId',

  ADMIN: 'admin',
  ADMIN_INDEX: '/admin',
  USERS: 'users-admin',
  DOC_TYPES_ADMIN: 'document-types-admin',
  DOC_ATTRIBUTES_ADMIN: 'document-attributes-admin',

  NOT_FOUND: '*',
};
