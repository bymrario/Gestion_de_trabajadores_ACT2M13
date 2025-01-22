import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import IdeasNewForm from 'pages/ideas/IdeasNewForm';


const DashboardComponent = lazy(() => import('./dashboard'));
const Contacts = lazy(() => import('pages/contacts/Contacts'));
const Clientes = lazy(() => import('pages/clientes/Clientes'));
const Proyectos = lazy(() => import('pages/proyectos/proyectos'));
const Ideas = lazy(() => import('pages/ideas/Ideas'));
const Ajustes = lazy(() => import('pages/ajustes/Ajustes'));
const Facturacion = lazy(() => import('pages/facturacion/Facturacion'));


function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.kanbanTwo} render={() => <div>KanbanTwo</div>} />
                <Route exact path={SLUGS.kanbanThree} render={() => <div>KanbanThree</div>} />
                <Route exact path={SLUGS.kanban} render={() => <div>Kanban</div>} />
                <Route exact path={SLUGS.proyectos} component={Proyectos} />
                <Route exact path={SLUGS.ideas} component={Ideas} />
                <Route exact path={SLUGS.ideas} component={IdeasNewForm} />
                <Route exact path={SLUGS.contactos} component={Contacts} />
                <Route exact path={SLUGS.clientes} component={Clientes} />
                <Route exact path={SLUGS.notas} render={() => <div>Notas</div>} />
                <Route exact path={SLUGS.ajustes} component={Ajustes} />
                <Route exact path={SLUGS.facturacion} component={Facturacion} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>

    );
}

export default PrivateRoutes;
