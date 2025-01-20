import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import NotesComponent from 'components/notes/NotesComponent';

const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.kanbanTwo} render={() => <div>KanbanTwo</div>} />
                <Route exact path={SLUGS.kanbanThree} render={() => <div>KanbanThree</div>} />
                <Route exact path={SLUGS.kanban} render={() => <div>Kanban</div>} />
                <Route exact path={SLUGS.proyectos} render={() => <div>Proyectos</div>} />
                <Route exact path={SLUGS.ideasTwo} render={() => <div>IdeasTwo</div>} />
                <Route exact path={SLUGS.ideasThree} render={() => <div>IdeasThree</div>} />
                <Route exact path={SLUGS.ideas} render={() => <div>Ideas</div>} />
                <Route exact path={SLUGS.contactos} render={() => <div>Contactos</div>} />
                <Route exact path={SLUGS.clientes} render={() => <div>Clientes</div>} />
                <Route exact path={SLUGS.notas} component={NotesComponent} />
                <Route exact path={SLUGS.ajustes} render={() => <div>Ajustes</div>} />
                <Route exact path={SLUGS.facturacion} render={() => <div>Facturación</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
