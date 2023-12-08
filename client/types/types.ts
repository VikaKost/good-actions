export type IUser = {
  _id?: string;
  email: string;
  username: string;
};

export type UserDetails = {
  id: string;
  email?: string;
  username: string;
};

export type ActionDetails = {
  _id: string;
  text: string;
  user: string;
};

export type Action = {
  id: string;
  text: string;
};

export type NavLink = {
  label: string;
  href: string;
};
export type Props = {
  navLinks: NavLink[];
  username: string;
};
