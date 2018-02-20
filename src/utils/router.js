import React from 'react';
import Navigo from 'navigo';
import { routes } from '../routes';

const BASE_URL = `${document.location.protocol}//${document.location.host}`;

export const router = new Navigo(BASE_URL);

export const setupRoutes = (cb) => {
  const ons = {};

  Object.keys(routes).forEach(route => {
    ons[route] = params => cb(route, params);
  });

  router.on(ons).resolve();
}

export const getRoute = (route, routeParams) => {
  const Component = routes[route] ? routes[route] : routes['*'];
  return <Component routeParams={routeParams} />;
};