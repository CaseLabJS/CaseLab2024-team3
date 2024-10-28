import { UNEXPECTED_ERROR_MESSAGE } from "src/constants/errorMessage";

const PageError = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <p>{UNEXPECTED_ERROR_MESSAGE}</p>
      <button onClick={reloadPage}>обновить страницу</button>
    </div>
  );
};

export default PageError;
