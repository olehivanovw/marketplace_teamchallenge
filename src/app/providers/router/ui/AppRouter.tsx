import { FC, memo, Suspense, useCallback } from 'react';

import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, RouteConfig } from '@/app/providers/router/config/routeConfig';
import RequireAuth from '@/app/providers/router/ui/RequireAuth';

interface Props {}

const AppRouter: FC<Props> = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<div>Loading</div>}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(RouteConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
