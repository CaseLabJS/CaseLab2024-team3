import { ChangeAttribute, CreateAttribute } from 'src/types';

export interface AttributesStoreProps {
  attribute: ChangeAttribute | null;
  attributes: ChangeAttribute[];
  loading: boolean;
  error: string | null;
  fetchAttributeById: (id: number) => Promise<void>;
  fetchAttributes: (page?: number, size?: number) => Promise<void>;
  createAttribute: (attribute: CreateAttribute) => Promise<void>;
  updateAttribute: (id: number, attribute: CreateAttribute) => Promise<void>;
  deleteAttribute: (id: number) => Promise<void>;
}
