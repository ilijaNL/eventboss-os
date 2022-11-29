import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Burger,
  clsx,
  Container,
  createStyles,
  Footer,
  Group,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconChevronDown,
  IconDashboard,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconBolt,
  IconSend,
  TablerIcon,
  IconBoxMultiple,
} from '@tabler/icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { routes } from '@/routes';
import { BRAND_NAME } from '@/config';
import { LanguageSwitch } from '@/common/components/languageswitch';
import { appRoutes, AppRoutes, getAppRoute } from './routes';
import { useAppContext } from './page';

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan(MobileBreakpoint)]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan(MobileBreakpoint)]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan(MobileBreakpoint)]: {
      display: 'none',
    },
  },

  footer: {
    height: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  links: {
    [theme.fn.smallerThan(MobileBreakpoint)]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterProps {
  links: { link: string; label: string }[];
}

function LogoWithLinkAndText() {
  return (
    <Link href={routes.home} passHref>
      <a
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textDecoration: 'none',
          height: '100%',
          color: 'inherit',
        }}
      >
        <ThemeIcon size={45} radius="md" color="blue">
          <IconBolt size={38} strokeWidth={1.2} />
        </ThemeIcon>
        <Title order={2} style={{ marginLeft: '10px', fontWeight: 700, letterSpacing: '-.05em' }}>
          {BRAND_NAME}
        </Title>
      </a>
    </Link>
  );
}

function SiteFooter({ links }: FooterProps) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} passHref>
      <Anchor component="a" color="dimmed" sx={{ lineHeight: 1 }} size="sm">
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <Container size="xl" className={classes.footer}>
      <Group
        position="apart"
        spacing="sm"
        noWrap
        // breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 'md' }]}
      >
        <ThemeIcon size={32} radius="md" color="blue">
          <IconBolt strokeWidth={1.2} />
        </ThemeIcon>
        <Group position="center" className={classes.links}>
          {items}
        </Group>

        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing="xs" position="right" noWrap>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              title="Switch dark mode"
              variant="default"
              radius="xl"
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.gray[7],
              })}
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
            <LanguageSwitch />
          </Group>
        </MediaQuery>
      </Group>
    </Container>
  );
}

const AuthAvatar: React.FC = () => {
  return (
    <Avatar color="primary" alt={BRAND_NAME} radius="xl" size={40}>
      EB
    </Avatar>
  );
};

const PageHeader: React.FC<{ onBurgerClick: () => void; menuOpen: boolean }> = ({ onBurgerClick, menuOpen }) => {
  const { classes } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <>
      <Container p={0} fluid sx={{ height: '100%' }}>
        <Group position="apart" sx={{ height: '100%' }}>
          <LogoWithLinkAndText />
          <Group className={classes.hiddenMobile}>
            <Menu
              position="bottom"
              transition="pop-top-right"
              radius="md"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  component="button"
                  title="user menu"
                  className={clsx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group spacing={2}>
                    <AuthAvatar />
                    <IconChevronDown size={18} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Link href={routes.home} passHref>
                  <Menu.Item icon={<IconDashboard size={20} />}>Dashboard</Menu.Item>
                </Link>
                <Menu.Label>Settings</Menu.Label>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Burger opened={menuOpen} onClick={onBurgerClick} className={classes.hiddenDesktop} />
        </Group>
      </Container>
    </>
  );
};

const useNavBarStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
  };
});

const appNavBarItems: ReadonlyArray<{ link: AppRoutes; label: string; icon: TablerIcon }> = [
  { link: appRoutes.dashboard, label: 'Dashboard', icon: IconDashboard },
  { link: appRoutes.events, label: 'Events', icon: IconBolt },
  { link: appRoutes.event_logs, label: 'Event Logs', icon: IconBoxMultiple },
  { link: appRoutes.actions, label: 'Actions', icon: IconSend },
  { link: appRoutes.action_logs, label: 'Action Logs', icon: IconBoxMultiple },
  { link: appRoutes.settings, label: 'Settings', icon: IconSettings },
] as const;

const MobileNavBar: React.FC<{}> = () => {
  const { classes, cx } = useNavBarStyles();
  const { asPath } = useRouter();
  const { app_id } = useAppContext();

  return (
    <>
      <Navbar.Section grow>
        {appNavBarItems.map((item) => (
          <Link href={getAppRoute(item.link, app_id)} passHref key={item.label}>
            <a className={cx(classes.link, { [classes.linkActive]: asPath === getAppRoute(item.link, app_id) })}>
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </Navbar.Section>
    </>
  );
};

const MobileBreakpoint = 'md';

const ResponsiveAppShell = (props: PropsWithChildren) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints[MobileBreakpoint]}px)`);
  // const isDesktop = useIsDesktop();

  // listen for route events and close mobile navbar when on page
  useEffect(() => {
    const close = () => closeDrawer();

    Router.events.on('routeChangeComplete', close);

    return () => Router.events.off('routeChangeComplete', close);
  }, [closeDrawer]);

  useEffect(() => {
    if (isDesktop && drawerOpened) {
      closeDrawer();
    }
  }, [isDesktop, drawerOpened, closeDrawer]);

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint={MobileBreakpoint}
      padding={0}
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint={MobileBreakpoint}
          width={{ md: 280 }}
          hidden={drawerOpened !== true}
          sx={{ height: 'calc(100vh - var(--mantine-header-height, 0px))' }}
        >
          <MobileNavBar />
        </Navbar>
      }
      styles={(_) => ({
        main: {
          paddingBottom: 0,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![8] : theme.colors.gray![0],
          // boxShadow: `inset 0 0 0 50vw ${theme.fn.rgba(
          //   theme.colorScheme === 'dark' ? theme.colors.dark![8] : theme.colors.gray![0],
          //   theme.colorScheme === 'dark' ? 0.45 : 0.95
          // )}`,
          minHeight: 'calc(100vh - var(--mantine-footer-height, 0px) + 0px)',
        },
      })}
      header={
        <Header height={70} p="xs">
          <PageHeader onBurgerClick={toggleDrawer} menuOpen={drawerOpened === true} />
        </Header>
      }
      footer={
        <Footer
          height={70}
          sx={(theme) => ({
            position: 'static',
            overflow: 'hidden',
            [theme.fn.largerThan(MobileBreakpoint)]: {
              paddingLeft: 'calc(var(--mantine-navbar-width, 0px) + 0px)',
            },
          })}
        >
          <SiteFooter links={[]} />
        </Footer>
      }
    >
      {props.children}
    </AppShell>
  );
};

export function createAppPageLayout(props: { children: JSX.Element }) {
  return <ResponsiveAppShell>{props.children}</ResponsiveAppShell>;
}
