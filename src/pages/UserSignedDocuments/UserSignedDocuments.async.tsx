import { lazy } from 'react';

export const UserSignedDocumentsAsync = lazy(
  () => import('./UserSignedDocuments')
);
