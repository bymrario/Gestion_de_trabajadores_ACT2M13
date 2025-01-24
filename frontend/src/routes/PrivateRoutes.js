import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import NotesComponent from 'components/notes/NotesComponent';
import KanbanPage from 'pages/tareas/KanbanPage';
import ProfilePage from 'pages/user-profile/user-profile';
import Settings from 'pages/settings/settings';
import Clients from 'pages/clients/Clientes';
import Contacts from 'pages/contacts/Contacts';
import Facturacion from 'pages/facturacion/Facturacion';
import Ideas from 'pages/ideas/Ideas';
import IdeasNewForm from 'pages/ideas/IdeasNewForm';
import Proyects from 'pages/proyectos/Proyects';
import ListTasksComponent from 'pages/tareas/ListPage';
import TareasNewForm from 'pages/tareas/TareasNewForm';

const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.kanbanTwo} component={ListTasksComponent} />
                <Route exact path={SLUGS.kanbanThree} component={TareasNewForm} />
                <Route exact path={SLUGS.kanban} component={KanbanPage} />
                <Route exact path={SLUGS.proyectos} component={Proyects} />
                <Route exact path={SLUGS.ideasTwo} component={Ideas} />
                {/* <Route exact path={SLUGS.ideasThree} render={() => <div>IdeasThree</div>} /> */}
                <Route exact path={SLUGS.ideas} component={IdeasNewForm} />
                <Route exact path={SLUGS.contactos} component={Contacts} />
                <Route exact path={SLUGS.clientes} component={Clients} />
                <Route exact path={SLUGS.notas} component={NotesComponent} />
                <Route exact path={SLUGS.ajustes} component={Settings} />
                <Route exact path={SLUGS.perfil} component={ProfilePage} />
                <Route exact path={SLUGS.facturacion} component={Facturacion} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
