import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconAgents,
    IconArticles,
    IconContacts,
    IconIdeas,
    IconLogout,
    IconOverview,
    IconSettings,
    IconSubscription,
    IconTickets
} from 'assets/icons';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;

    // async function logout() {
    //     push(SLUGS.login);
    // }

    const logout = async () => {
        try {

            toast.success("Logout exitoso", { autoClose: 2000 });
    
            localStorage.removeItem('usernameOrEmail');
            
            setTimeout(() => {
                push(SLUGS.login);
            }, 2000);
    
            const usernameOrEmail = localStorage.getItem('usernameOrEmail');
            axios.post('http://localhost:8081/logout', {
                usernameOrEmail,
            }).catch((error) => {
                console.error('Error en la solicitud de logout:', error);
            });
    
        } catch (error) {
            console.error('Error en la solicitud de logout:', error);
        }
    };

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.kanban}
                items={[SLUGS.kanbanTwo, SLUGS.kanbanThree]}
                title='Kanban'
                icon={IconOverview}
            >
                <MenuItem
                    id={SLUGS.kanban}
                    title='Sub Item 1'
                    level={2}
                    icon={IconAgents}
                    onClick={() => onClick(SLUGS.kanban)}
                />
                <MenuItem
                    id={SLUGS.kanbanTwo}
                    title='Sub Item 2'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.kanbanTwo)}
                />
                <MenuItem
                    id={SLUGS.kanbanThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconArticles}
                    onClick={() => onClick(SLUGS.kanbanThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.proyectos}
                title='Proyectos'
                icon={IconTickets}
                onClick={() => onClick(SLUGS.proyectos)}
            />
            <MenuItem
                id={SLUGS.ideas}
                items={[SLUGS.ideasTwo, SLUGS.ideasThree]}
                title='Ideas'
                icon={IconIdeas}
            >
                <MenuItem
                    id={SLUGS.ideas}
                    title='Sub Item 1'
                    level={2}
                    icon={IconAgents}
                    onClick={() => onClick(SLUGS.ideas)}
                />
                <MenuItem
                    id={SLUGS.ideasTwo}
                    title='Sub Item 2'
                    level={2}
                    icon={IconContacts}
                    onClick={() => onClick(SLUGS.ideasTwo)}
                />
                <MenuItem
                    id={SLUGS.ideasThree}
                    title='Sub Item 3'
                    level={2}
                    icon={IconArticles}
                    onClick={() => onClick(SLUGS.ideasThree)}
                />
            </MenuItem>
            <MenuItem
                id={SLUGS.contactos}
                title='Contactos'
                icon={IconContacts}
                onClick={() => onClick(SLUGS.contactos)}
            />
            <MenuItem
                id={SLUGS.clientes}
                title='Clientes'
                icon={IconAgents}
                onClick={() => onClick(SLUGS.clientes)}
            />
            <MenuItem
                id={SLUGS.notas}
                title='Notas'
                icon={IconArticles}
                onClick={() => onClick(SLUGS.notas)}
            />
            <MenuItem
                id={SLUGS.facturacion}
                title='Facturación'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.facturacion)}
            />
            <div className={classes.separator}></div>
            <MenuItem
                id={SLUGS.ajustes}
                title='Ajustes'
                icon={IconSettings}
                onClick={() => onClick(SLUGS.ajustes)}
            />

            <MenuItem id='logout' title='Cerrar Sesión' icon={IconLogout} onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;
