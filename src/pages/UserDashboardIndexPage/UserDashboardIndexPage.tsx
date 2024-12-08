import { documentsStore } from '@/stores';
import { useEffect } from 'react';
import { FileText, FileCheck, Hourglass, Check } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '@constants/routes';
import { userMenuItems } from '@constants/sideBar';

const UserDashboardIndexPage = observer(() => {
  useEffect(() => {
    void documentsStore.fetchDocuments(0, 100, 'owner');
    void documentsStore.fetchDocumentsForSign(0, 100, 'signer', 'after_signer');
    void documentsStore.fetchDocumentsForSign(
      0,
      100,
      'signer',
      'before_signer'
    );
    void documentsStore.fetchDocumentsForSign(0, 100, 'owner', 'before_signer');
  }, []);

  return (
    <section className="p-4 md:p-6 flex items-center justify-center w-full overflow-y-auto">
      <div className="max-h-full grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2 max-w-5xl w-full">
        <Link
          to={ROUTE_CONSTANTS.USER_DOCUMENTS}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <FileText className="text-4xl md:text-5xl mb-2 animate-pulse" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {documentsStore.paginationDocuments?.totalElements}
              </h2>
              <p className="text-md md:text-lg font-bold">Всего документов</p>
            </div>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.USER_SENT_FOR_SIGN}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <FileCheck className="text-4xl md:text-5xl mb-2 animate-pulse" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {documentsStore.documentsSentForSign.length}
              </h2>
              <p className="text-md md:text-lg font-bold">
                {userMenuItems[1].title}
              </p>
            </div>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.USER_AWAITING_SIGN}
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <Hourglass className="text-4xl md:text-5xl mb-2 animate-pulse" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {documentsStore.paginationDocumentsForSign?.totalElements}
              </h2>
              <p className="text-md md:text-lg font-bold">
                {userMenuItems[2].title}
              </p>
            </div>
          </article>
        </Link>

        <Link
          to={ROUTE_CONSTANTS.USER_AFTER_SIGN}
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white text-center rounded-xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
        >
          <article className="flex flex-col text-center items-center">
            <Check className="text-4xl md:text-5xl mb-2 animate-pulse" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {documentsStore.paginationDocumentsAfterSign?.totalElements}
              </h2>
              <p className="text-md md:text-lg">{userMenuItems[3].title}</p>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
});

export default UserDashboardIndexPage;
