import { PATHS } from '../../constants/routePaths';
import { HomePage, CoinDetailPage, NotFoundPage } from '../../pages';

const routes = {
  homePage: {
    path: PATHS.HOME_PAGE,
    component: HomePage,
  },
  MovieDetailPage: {
    path: PATHS.COIN_DETAIL_PAGE,
    component: CoinDetailPage,
  },
  notFound: {
    path: PATHS.NOT_FOUND,
    component: NotFoundPage,
  },
};

export default routes;
