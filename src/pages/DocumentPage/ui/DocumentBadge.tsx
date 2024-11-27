import { DocumentState } from '@/types/state';
import { Badge as BaseBadge } from '@components/UI';
import { DOCUMENT_STATE, VOTING_STATUS } from '@/constants/defaultConstants';
import { VotingResult } from 'src/types';
import { format, isValid, parseISO } from 'date-fns';

interface BadgeProps {
  state: DocumentState;
  votingResult?: VotingResult;
}

export const Badge: React.FC<BadgeProps> = ({ state, votingResult }) => {
  const documentState = DOCUMENT_STATE[state];
  const { title, className } = documentState ?? { title: '', className: '' };

  const votingStatus = votingResult && VOTING_STATUS[votingResult.status];
  const { votingTitle, votingClassName } = votingStatus ?? {
    votingTitle: '',
    votingClassName: '',
  };

  const [year, month, day, hours, minutes] = votingResult?.deadline ?? [
    0, 0, 0, 0, 0,
  ];
  const newDate =
    votingResult && new Date(year, month - 1, day, hours + 3, minutes); // у бэка месяца (1-12), в JS (0-11), поэтому отнимаем 1 для месяца

  return (
    <>
      <BaseBadge className={className} variant="outline">
        {title}
      </BaseBadge>
      {votingResult && (
        <>
          <BaseBadge variant="outline">
            {newDate &&
              isValid(parseISO(newDate.toISOString())) &&
              ` 🕛 ${format(parseISO(newDate.toISOString()), 'dd.MM.yyyy | H:mm')}`}
          </BaseBadge>
          <BaseBadge className={votingClassName} variant="outline">
            {votingTitle}
          </BaseBadge>
        </>
      )}
    </>
  );
};
