import { DocumentState } from '@/types/state';
import { Badge as BaseBadge } from '@components/UI';
import { DOCUMENT_STATE } from '@/constants/defaultConstants';

interface BadgeProps {
  state: DocumentState;
}

export const Badge: React.FC<BadgeProps> = ({ state }) => {
  const documentState = DOCUMENT_STATE[state];
  const { title, className } = documentState ?? { title: '', className: '' };

  return (
    <BaseBadge className={className} variant="outline">
      {title}
    </BaseBadge>
  );
};
