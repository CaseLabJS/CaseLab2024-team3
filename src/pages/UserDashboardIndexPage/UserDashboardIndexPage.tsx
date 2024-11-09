import { documentsStore } from '@/stores';
import { useEffect } from 'react';
import { FileText, FileCheck, Hourglass } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '@constants/routes';

const UserDashboardIndexPage = observer(() => {
  useEffect(() => {
    documentsStore.fetchDocuments();
    documentsStore.fetchDocumentsForSign();
  }, []);

  return (
    <section className="p-4 md:p-6 flex items-center justify-center w-full overflow-y-auto">
      <div className="max-h-full grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3 max-w-5xl w-full">
        <Link
          to={ROUTE_CONSTANTS.USER_DOCUMENTS}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <FileText className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                {documentsStore.documents.length}
              </h2>
              <p className="text-md sm:text-lg mt-2">Всего документов</p>
            </div>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.USER_SENT_FOR_SIGN}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <FileCheck className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">TODO</h2>
              <p className="text-md sm:text-lg mt-2">Отправленные на подписание</p>
            </div>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.USER_AWAITING_SIGN}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <Hourglass className="text-4xl sm:text-5xl mb-4 animate-pulse" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                {documentsStore.documentsForSign.length}
              </h2>
              <p className="text-md sm:text-lg mt-2">Ожидают подписание</p>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
});

export default UserDashboardIndexPage;
