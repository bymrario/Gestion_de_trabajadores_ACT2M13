import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { SidebarContext } from 'hooks/useSidebar';
import SLUGS from 'resources/slugs';
import { IconBell, IconSearch } from 'assets/icons';
import DropdownComponent from 'components/dropdown';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = createUseStyles((theme) => ({
    avatar: {
        height: 35,
        width: 35,
        minWidth: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        '@media (max-width: 768px)': {
            marginLeft: 14
        }
    },
    container: {
        height: 40
    },
    name: {
        ...theme.typography.itemTitle,
        textAlign: 'right',
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: `1px solid ${theme.color.lightGrayishBlue2}`,
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 14,
            marginRight: 0
        }
    },
    title: {
        ...theme.typography.title,
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
}));

function HeaderComponent() {
    const { push } = useHistory();
    const { currentItem } = useContext(SidebarContext);
    const theme = useTheme();
    const classes = useStyles({ theme });

    let title;
    switch (true) {
        case currentItem === SLUGS.dashboard:
            title = 'Dashboard';
            break;
        case [SLUGS.kanban, SLUGS.kanbanTwo, SLUGS.kanbanThree].includes(currentItem):
            title = 'Kanban';
            break;
        case currentItem === SLUGS.proyectos:
            title = 'Proyectos';
            break;
        case [SLUGS.ideas, SLUGS.ideasTwo, SLUGS.ideasThree].includes(currentItem):
            title = 'Ideas';
            break;
        case currentItem === SLUGS.contactos:
            title = 'Contactos';
            break;
        case currentItem === SLUGS.clientes:
            title = 'Clientes';
            break;
        case currentItem === SLUGS.notas:
            title = 'Notas';
            break;
        case currentItem === SLUGS.facturacion:
            title = 'Facturación';
            break;
        case currentItem === SLUGS.ajustes:
            title = 'Ajustes';
            break;
        default:
            title = '';
    }

    const handleLogout = async () => {
        try {
            const usernameOrEmail = localStorage.getItem('usernameOrEmail');
            const response = await axios.post('http://localhost:8081/logout', {
                usernameOrEmail,
            });

            if (response.data.includes('Logout exitoso')) {
                localStorage.removeItem('usernameOrEmail');
                toast.success("Logout exitoso", { autoClose: 2000 });

                // Redirige a la página de login
                setTimeout(() => {
                    push('/login');
                }, 2000);
            } else {
                console.error('Error en el logout:', response.data);
            }
        } catch (error) {
            console.error('Error en la solicitud de logout:', error);
        }
    };

    function onProfileClick() {
        push(SLUGS.perfil);
    }

    return (
        <Row className={classes.container} vertical='center' horizontal='space-between'>
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.iconStyles}>
                    <IconSearch />
                </div>
                <div className={classes.iconStyles}>
                    <DropdownComponent
                        label={<IconBell />}
                        options={[
                            {
                                label: 'Notificación #1',
                                onClick: () => console.log('Notificación #1')
                            },
                            {
                                label: 'Notificación #2',
                                onClick: () => console.log('Notificación #2')
                            },
                            {
                                label: 'Notificación #3',
                                onClick: () => console.log('Notificación #3')
                            },
                            {
                                label: 'Notificación #4',
                                onClick: () => console.log('Notificación #4')
                            }
                        ]}
                        position={{
                            top: 42,
                            right: -14
                        }}
                    />
                </div>
                <div className={classes.separator}></div>
                <DropdownComponent
                    label={
                        <>
                            <span className={classes.name}>Usuario 1</span>
                            <img
                                src='https://www.shutterstock.com/image-vector/young-smiling-man-avatar-3d-600nw-2124054758.jpg'
                                alt='avatar'
                                className={classes.avatar}
                            />
                        </>
                    }
                    options={[
                        {
                            label: 'Perfil',
                            onClick: onProfileClick
                        },
                        {
                            label: 'Cerrar Sesión',
                            onClick: handleLogout
                        }
                    ]}
                    position={{
                        top: 52,
                        right: -6
                    }}
                />
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
