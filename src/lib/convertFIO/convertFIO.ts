const getOneCharacter = (str: string) => str.substring(0, 1).toUpperCase();

export const convertFIO = ({
  lastName,
  firstName,
  patronymic,
}: {
  lastName: string;
  firstName?: string;
  patronymic?: string;
}): string => {
  return `${lastName} ${firstName?.length! > 0 ? `${getOneCharacter(firstName!)}.` : ''}${patronymic?.length! > 0 ? `${getOneCharacter(patronymic!)}.` : ''}`;
};
