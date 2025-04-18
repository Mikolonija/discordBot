import Messages from '@/pages/Messages';
import Sprints from '@/pages/Sprints';
import Templates from '@/pages/Templates';
import NotFound from '@/pages/NotFound';
import { RouteId } from '@/utils/types/router';
import { IRouterType } from '@/utils/interface/router';

export const routers: IRouterType[] = [
  {
    id: RouteId.Messages,
    name: 'messages',
    component: Messages,
    path: '/',
  },
  {
    id: RouteId.Sprints,
    name: 'sprints',
    component: Sprints,
    path: '/sprints',
  },
  {
    id: RouteId.Templates,
    name: 'templates',
    component: Templates,
    path: '/templates',
  },
  {
    id: RouteId.NotFound,
    name: 'notFound',
    component: NotFound,
    path: '*',
  },
];
