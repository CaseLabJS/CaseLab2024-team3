import { Users, FileStack, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '@constants/routes';

const AdminIndexPage = () => {
  return (
    <section className="p-4 md:p-6 flex items-center justify-center w-full overflow-y-auto">
      <div className="max-h-full grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3 max-w-5xl w-full">
        <Link
          to={ROUTE_CONSTANTS.USERS}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center h-full">
            <Users className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <h2 className="2xl:text-3xl xl:text-2xl text-3xl basis-8/12 font-bold flex items-center justify-center">
              Пользователи
            </h2>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.DOC_TYPES_ADMIN}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center h-full">
            <FileStack className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <h2 className="2xl:text-3xl xl:text-2xl text-3xl basis-8/12 font-bold flex items-center justify-center">
              Типы документов
            </h2>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.DOC_ATTRIBUTES_ADMIN}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center h-full">
            <Calendar className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <h2 className="2xl:text-3xl xl:text-2xl text-3xl basis-8/12 font-bold flex items-center justify-center">
              Атрибуты документов
            </h2>
          </article>
        </Link>
      </div>
    </section>
  );
};

export default AdminIndexPage;
